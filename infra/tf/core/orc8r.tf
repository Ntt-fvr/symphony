locals {
  magma_tags = merge(local.tags, { Project = "magma" })
}

# orc8r database password
resource "random_password" "orc8r_db" {
  length  = 50
  special = false
}

resource "random_password" "magmalte_db" {
  length  = 20
  special = false
}

# postgres db for orc8r
module "orc8r_db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  family                     = "postgres9.6"
  major_engine_version       = "9.6"
  engine                     = "postgres"
  engine_version             = "9.6.18"
  auto_minor_version_upgrade = true
  instance_class             = terraform.workspace == "default" ? "db.m4.xlarge" : "db.t2.small"

  identifier = "orc8r"
  name       = "magma"
  username   = "magma"
  password   = random_password.orc8r_db.result
  port       = local.postgres_port

  snapshot_identifier = format(
    "arn:aws:rds:%s:%s:snapshot:%s",
    data.aws_region.current.name,
    terraform.workspace == "default" ? data.aws_caller_identity.current.account_id : "756709423411",
    terraform.workspace == "default" ? "symphonyprod" : "pre-migration-snap",
  )

  maintenance_window        = "Sun:00:00-Sun:03:00"
  backup_window             = "03:00-06:00"
  backup_retention_period   = 35
  deletion_protection       = true
  skip_final_snapshot       = false
  final_snapshot_identifier = "orc8r-snapshot-final"
  allocated_storage         = 1024

  monitoring_role_arn = data.aws_iam_role.rds_enhanced_monitoring.arn
  monitoring_interval = 60

  vpc_security_group_ids = [aws_security_group.eks_rds["postgres"].id]
  subnet_ids             = module.vpc.database_subnets
  db_subnet_group_name   = module.vpc.database_subnet_group

  tags = local.magma_tags
}

# maria db for magmalte NMS
module "magmalte_db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  family                     = "mysql5.7"
  major_engine_version       = "5.7"
  engine                     = "mysql"
  engine_version             = "5.7"
  auto_minor_version_upgrade = true
  instance_class             = "db.t3.medium"
  allocated_storage          = 16

  identifier = "magmalte"
  name       = "magma"
  username   = "magma"
  password   = random_password.magmalte_db.result
  port       = local.mysql_port

  maintenance_window        = "Sun:00:00-Sun:03:00"
  backup_window             = "03:00-06:00"
  backup_retention_period   = 30
  deletion_protection       = true
  skip_final_snapshot       = false
  final_snapshot_identifier = "magmalte-snapshot-final"

  monitoring_role_arn = data.aws_iam_role.rds_enhanced_monitoring.arn
  monitoring_interval = 60

  vpc_security_group_ids = [aws_security_group.eks_rds["mysql"].id]
  subnet_ids             = module.vpc.database_subnets
  db_subnet_group_name   = module.vpc.database_subnet_group

  tags = local.magma_tags
}

# orc8r_db secret for orc8r deployment
resource "aws_secretsmanager_secret" "orc8r_db" {
  name        = "symphony/orc8rdb"
  description = "Orchestrator database credentials"
}

# store orc8r_db credentials for orc8r deployment
resource "aws_secretsmanager_secret_version" "orc8r_db" {
  secret_id = aws_secretsmanager_secret.orc8r_db.id
  secret_string = jsonencode({
    dbuser = module.orc8r_db.this_db_instance_username
    dbpass = module.orc8r_db.this_db_instance_password
    dbhost = module.orc8r_db.this_db_instance_address
    dbport = module.orc8r_db.this_db_instance_port
    dbname = module.orc8r_db.this_db_instance_name

    nms_dbuser = module.magmalte_db.this_db_instance_username
    nms_dbpass = module.magmalte_db.this_db_instance_password
    nms_dbhost = module.magmalte_db.this_db_instance_address
    nms_dbport = module.magmalte_db.this_db_instance_port
    nms_dbname = module.magmalte_db.this_db_instance_name
  })
}

# kubernetes namespace for orc8r deployment
resource "kubernetes_namespace" "orc8r" {
  metadata {
    name = "orc8r"
  }
}

# kubernetes role bindings for orc8r admins
resource "kubernetes_role_binding" "orc8r_admin" {
  metadata {
    name      = "admins"
    namespace = kubernetes_namespace.orc8r.id
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "cluster-admin"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "Group"
    name      = local.orc8r_admin_group
    api_group = "rbac.authorization.k8s.io"
  }
}

# orc8r terraform state lock table
data "aws_dynamodb_table" "orc8r_lock" {
  name     = "orc8r.terraform.lock"
  provider = aws.us-east-1
}

# aws iam role for orc8r admin
resource "aws_iam_role" "orc8r_admin" {
  name               = "Orc8rAdmin"
  assume_role_policy = data.aws_iam_policy_document.root_delegate.json
  description        = "orc8r admin role"
  count              = terraform.workspace == "default" ? 1 : 0
}

# aws iam policy document for orc8r admin
data "aws_iam_policy_document" "orc8r_admin" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
    ]

    resources = [
      data.aws_secretsmanager_secret.mapbox.arn,
      data.aws_secretsmanager_secret.artifactory.arn,
      format(
        "arn:aws:secretsmanager:*:%s:secret:%s*",
        data.aws_caller_identity.current.account_id,
        aws_secretsmanager_secret.orc8r_db.name,
      ),
    ]
  }

  statement {
    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${data.aws_s3_bucket.deployment.arn}/orc8r/*"
    ]
  }

  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
    ]

    resources = [
      data.aws_dynamodb_table.orc8r_lock.arn,
    ]
  }
}

# attach above document to orc8r admin
resource "aws_iam_role_policy" "orc8r_admin" {
  policy = data.aws_iam_policy_document.orc8r_admin.json
  role   = aws_iam_role.orc8r_admin[count.index].name
  count  = terraform.workspace == "default" ? 1 : 0
}

# attach orc8r admin read only policy
resource "aws_iam_role_policy_attachment" "orc8r_admin_read_only" {
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
  role       = aws_iam_role.orc8r_admin[count.index].name
  count      = terraform.workspace == "default" ? 1 : 0
}

# data ref to orc8r admin role
data "aws_iam_role" "orc8r_admin" {
  name  = "Orc8rAdmin"
  count = 1 - length(aws_iam_role.orc8r_admin)
}

locals {
  orc8r_admin_role  = try(aws_iam_role.orc8r_admin[0], data.aws_iam_role.orc8r_admin[0])
  orc8r_admin_group = "orc8r:admins"
}

# aws iam policy document granting orc8r admin assume role
data "aws_iam_policy_document" "orc8r_admin_role" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    resources = [
      aws_iam_role.orc8r_admin[count.index].arn
    ]
  }
  count = terraform.workspace == "default" ? 1 : 0
}

# aws iam policy for above policy document
resource "aws_iam_policy" "orc8r_admin_role" {
  name   = "Orc8rAdminRole"
  policy = data.aws_iam_policy_document.orc8r_admin_role[count.index].json
  count  = terraform.workspace == "default" ? 1 : 0
}

# aws iam policy document for orc8r controller pods
data "aws_iam_policy_document" "orc8r_controller_role_policy" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::soma.images",
      "arn:aws:s3:::soma.images/*",
    ]
  }
}

# aws iam role for orc8r controller pods to allow assuming the policy
# associated with the above document
resource "aws_iam_role" "orc8r_controller_role" {
  name_prefix        = "Orc8rControllerRole"
  assume_role_policy = data.aws_iam_policy_document.eks_worker_assumable.json
}

# role policy for orc8r controller policy document
resource "aws_iam_role_policy" "orc8r_controller_role_policy" {
  policy = data.aws_iam_policy_document.orc8r_controller_role_policy.json
  role   = aws_iam_role.orc8r_controller_role.id
}

# aws IAM policy document to allow CI worker to upload magma .deb artifacts
data "aws_iam_policy_document" "orc8r_magma_deploy_role" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
      "s3:PutObject",
      "s3:PutObjectAcl",
    ]

    resources = [
      "arn:aws:s3:::magma-images",
      "arn:aws:s3:::magma-images/*",
    ]
  }

  count = terraform.workspace == "default" ? 1 : 0
}

# aws IAM policy for the above document
resource "aws_iam_policy" "orc8r_magma_deploy_role" {
  name   = "Orc8rMagmaDeployRole"
  policy = data.aws_iam_policy_document.orc8r_magma_deploy_role[count.index].json

  count = terraform.workspace == "default" ? 1 : 0
}
