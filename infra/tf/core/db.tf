locals {
  # mysql standard port
  mysql_port = 3306

  # postgres standard port
  postgres_port = 5432
}

# grant RDS access to EKS worker nodes
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
