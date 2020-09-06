module springboard {
  source    = "./modules/team"
  team_name = "springboard"
}

resource random_password springboard_db {
  length  = 50
  special = false
}

module springboard_db {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  family                     = "postgres12"
  engine                     = "postgres"
  engine_version             = "12.3"
  major_engine_version       = "12"
  auto_minor_version_upgrade = true
  instance_class             = "db.t3.small"

  identifier = "springboard"
  name       = "springboard"
  username   = "root"
  password   = random_password.springboard_db.result
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

  tags = local.tags
}

resource kubernetes_secret springboard_db {
  metadata {
    name      = "springboard-db"
    namespace = module.springboard.kubernetes_namespace
  }

  data = {
    type     = "postgres"
    host     = module.springboard_db.this_db_instance_address
    user     = module.springboard_db.this_db_instance_username
    password = module.springboard_db.this_db_instance_password
    database = module.springboard_db.this_db_instance_name
  }
}