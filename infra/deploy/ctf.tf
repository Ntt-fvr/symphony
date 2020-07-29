locals {
  # deploy ctf resources on staging only.
  ctf_count  = terraform.workspace == "staging" ? 1 : 0
  ctf_create = local.ctf_count > 0
  # k8s group name for ctf admins.
  ctf_admin_user  = "ctf:master"
  ctf_admin_group = "ctf:masters"
  # public domain name.
  ctf_domain_name = "openctf.io"
}

# hosted zone for ctf records
resource "aws_route53_zone" "ctf" {
  name  = local.ctf_domain_name
  count = terraform.workspace == "default" ? 1 : 0
}

# hosted zone for ctf records
data "aws_route53_zone" "ctf" {
  name = local.ctf_domain_name
}

# kubernetes namespace for ctf deployment
resource "kubernetes_namespace" "ctf" {
  metadata {
    name = "ctf"
  }

  count = local.ctf_count
}

# kubernetes role bindings for ctf admins
resource "kubernetes_role_binding" "ctf_admins" {
  metadata {
    name      = "admins"
    namespace = kubernetes_namespace.ctf[count.index].id
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "admin"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "Group"
    name      = local.ctf_admin_group
    api_group = "rbac.authorization.k8s.io"
  }

  count = local.ctf_count
}

# aws iam role for admins in ctf namespace.
resource "aws_iam_role" "ctf_admin" {
  name               = "CTFAdmin"
  assume_role_policy = data.aws_iam_policy_document.root_delegate.json
  count              = local.ctf_count
}

# IAM group for CTF team.
resource "aws_iam_group" "ctf" {
  name  = "CTF"
  count = local.ctf_count
}

# aws iam policy document granting ctf admin assume role
data "aws_iam_policy_document" "ctf_admin_role" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    resources = [
      aws_iam_role.ctf_admin[count.index].arn
    ]
  }

  count = local.ctf_count
}

# aws iam group policy for above policy document
resource "aws_iam_group_policy" "ctf" {
  group  = aws_iam_group.ctf[count.index].id
  policy = data.aws_iam_policy_document.ctf_admin_role[count.index].json
  count  = local.ctf_count
}

# certificate issuer for openctf.io
resource "helm_release" "ctf_cert_issuer" {
  name       = "ctf-cert-issuer"
  namespace  = kubernetes_namespace.ctf[count.index].id
  repository = local.helm_repository.kiwigrid
  chart      = "any-resource"

  values = [<<VALUES
  anyResources:
    CertIssuer: |-
      apiVersion: cert-manager.io/v1alpha2
      kind: Issuer
      metadata:
        name: letsencrypt
      spec:
        acme:
          server: https://acme-v02.api.letsencrypt.org/directory
          email: alexsn@fb.com
          privateKeySecretRef:
            name: letsencrypt
          solvers:
            - dns01:
                route53:
                  region: ${data.aws_region.current.name}
                  hostedZoneID: ${data.aws_route53_zone.ctf.id}
              selector:
                dnsZones:
                  - ${local.ctf_domain_name}
  VALUES
  ]

  count = local.ctf_count
}

# ctf database password
resource "random_password" "ctf_db" {
  length  = 50
  special = false
  count   = local.ctf_count
}

# postgres db for ctf
module "ctf_db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  family                     = "postgres12"
  engine                     = "postgres"
  engine_version             = "12.3"
  major_engine_version       = "12"
  auto_minor_version_upgrade = true
  instance_class             = "db.m5.large"

  identifier = "ctf"
  name       = "ctf"
  username   = "root"
  password   = try(random_password.ctf_db[0].result, "")
  port       = local.postgres_port

  monitoring_role_arn = data.aws_iam_role.rds_enhanced_monitoring.arn
  monitoring_interval = 60

  vpc_security_group_ids = [aws_security_group.eks_rds["postgres"].id]
  subnet_ids             = module.vpc.database_subnets
  db_subnet_group_name   = module.vpc.database_subnet_group

  maintenance_window      = "Sun:00:00-Sun:03:00"
  backup_window           = "03:00-06:00"
  backup_retention_period = 35
  deletion_protection     = true
  skip_final_snapshot     = false
  allocated_storage       = 64

  create_db_instance        = local.ctf_create
  create_db_parameter_group = local.ctf_create
  create_db_option_group    = local.ctf_create

  tags = local.tags
}

# kubernetes secret for ctf database
resource "kubernetes_secret" "ctf_db" {
  metadata {
    name      = "ctf-database"
    namespace = kubernetes_namespace.ctf[count.index].id
  }

  data = {
    type     = "postgres"
    host     = module.ctf_db.this_db_instance_address
    user     = module.ctf_db.this_db_instance_username
    password = module.ctf_db.this_db_instance_password
    database = module.ctf_db.this_db_instance_name
  }

  count = local.ctf_count
}
