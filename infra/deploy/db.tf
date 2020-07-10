locals {
  # mysql standard port
  mysql_port = 3306

  # postgres standard port
  postgres_port = 5432

  # rds database user
  db_user = "admin"

  # rds provisioned databases
  auth_db_name  = "auth"
  graph_db_name = "graph"
}

# grant RDS to EKS nodes
resource "aws_security_group" "eks_rds" {
  for_each = {
    mysql = {
      name = "MySQL"
      port = local.mysql_port
    }

    postgres = {
      name = "Postgres"
      port = local.postgres_port
    }
  }

  name_prefix = "eks-${each.key}"
  description = "EKS node access to ${each.value.name}"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = each.value.port
    to_port         = each.value.port
    protocol        = "tcp"
    security_groups = [module.eks.worker_security_group_id]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# role allowing enhanced monitoring
data "aws_iam_role" "rds_enhanced_monitoring" {
  name = "rds-monitoring-role"
}

# generate random database password
resource "random_string" "rds_password" {
  length  = 16
  special = false
}

# generate random database identifier
resource "random_pet" "rds_identifier" {}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  identifier = random_pet.rds_identifier.id

  family                     = "mysql5.7"
  major_engine_version       = "5.7"
  engine                     = "mysql"
  engine_version             = "5.7"
  auto_minor_version_upgrade = true
  instance_class             = "db.t2.small"
  allocated_storage          = 16

  username = local.db_user
  password = random_string.rds_password.result
  port     = local.mysql_port

  maintenance_window      = "Mon:00:00-Mon:03:00"
  backup_window           = "03:00-06:00"
  backup_retention_period = 7
  deletion_protection     = true
  skip_final_snapshot     = false

  monitoring_role_arn = data.aws_iam_role.rds_enhanced_monitoring.arn
  monitoring_interval = 60

  vpc_security_group_ids = [aws_security_group.eks_rds["mysql"].id]
  subnet_ids             = module.vpc.database_subnets
  db_subnet_group_name   = module.vpc.database_subnet_group

  tags = local.tags
}

# generate random graph database identifier
resource "random_pet" "graph_db_identifier" {}

# rds database for inventory graph
module "graph_db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  family                      = "mysql8.0"
  major_engine_version        = "8.0"
  engine                      = "mysql"
  engine_version              = "8.0.16"
  allow_major_version_upgrade = true
  auto_minor_version_upgrade  = true
  instance_class              = "db.r5.4xlarge"
  multi_az                    = true
  allocated_storage           = 100

  identifier = random_pet.graph_db_identifier.id
  username   = local.db_user
  password   = random_string.rds_password.result
  port       = local.mysql_port

  snapshot_identifier          = "graph-snapshot-base"
  maintenance_window           = "Mon:00:00-Mon:03:00"
  backup_window                = "03:00-06:00"
  backup_retention_period      = 35
  deletion_protection          = true
  skip_final_snapshot          = false
  final_snapshot_identifier    = "graph-snapshot-final"
  performance_insights_enabled = true

  monitoring_role_arn = data.aws_iam_role.rds_enhanced_monitoring.arn
  monitoring_interval = 60

  vpc_security_group_ids = [aws_security_group.eks_rds["mysql"].id]
  db_subnet_group_name   = module.vpc.database_subnet_group

  parameters = [
    {
      name  = "max_connect_errors"
      value = 10000
    },
    {
      name  = "max_execution_time",
      value = 10000
    },
    {
      name  = "innodb_file_per_table",
      value = 0
    },
  ]

  tags = local.tags
}

# generate random provisioner name
resource "random_pet" "rds_provisioner" {}

# provision required databases
resource "null_resource" "rds_provisioner" {
  provisioner "local-exec" {
    interpreter = ["/bin/bash", "-c"]

    environment = {
      KUBECONFIG = module.eks.kubeconfig_filename
      user       = module.db.this_db_instance_username
      password   = module.db.this_db_instance_password
      host       = module.db.this_db_instance_address
    }

    command = "kubectl run ${random_pet.rds_provisioner.id} --generator=run-pod/v1 --attach --rm --quiet --wait --image=alpine -- /bin/sh -c \"apk add -q mysql-client && mysql --user=$user --password=$password --host=$host --execute='create database if not exists ${local.auth_db_name};'\""
  }
}
