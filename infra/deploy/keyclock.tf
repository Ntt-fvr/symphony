# generate random password for keycloak database
resource "random_string" "keycloak_dbpass" {
  length  = 16
  special = false
}

# keycloak database
module "keycloak_db" {
  identifier = "keycloak"
  source     = "terraform-aws-modules/rds/aws"
  version    = "~> 2.0"

  family                     = "mysql5.7"
  major_engine_version       = "5.7"
  engine                     = "mysql"
  engine_version             = "5.7"
  auto_minor_version_upgrade = true
  instance_class             = "db.t2.small"
  allocated_storage          = 16

  name     = "keycloak"
  username = "admin"
  password = random_string.keycloak_dbpass.result
  port     = local.mysql_port

  maintenance_window      = "Mon:00:00-Mon:03:00"
  backup_window           = "03:00-06:00"
  backup_retention_period = 7
  deletion_protection     = true
  skip_final_snapshot     = false

  monitoring_role_arn = data.aws_iam_role.rds_enhanced_monitoring.arn
  monitoring_interval = 60

  vpc_security_group_ids = [aws_security_group.eks_mysql.id]
  subnet_ids             = module.vpc.database_subnets
  db_subnet_group_name   = module.vpc.database_subnet_group

  tags = local.tags
}

# keycloak is a identity and access manager
resource "helm_release" "keycloak" {
  name       = "keycloak"
  repository = local.helm_repository.codecentric
  chart      = "keycloak"
  version    = "8.2.2"
  keyring    = ""

  values = [<<EOT
  keycloak:
    replicas: 2
    ingress:
      enabled: true
      annotations:
        kubernetes.io/ingress.class: nginx
        ingress.kubernetes.io/affinity: cookie
      hosts:
        - auth.${local.domains.symphony.name}
    podDisruptionBudget:
      minAvailable: 1
    persistence:
      dbVendor: mysql
      dbName: ${module.keycloak_db.this_db_instance_name}
      dbHost: ${module.keycloak_db.this_db_instance_address}
      dbPort: ${module.keycloak_db.this_db_instance_port}
      dbUser: ${module.keycloak_db.this_db_instance_username}
    extraEnv: |
      - name: JDBC_PARAMS
        value: "useSSL=false"
      - name: PROXY_ADDRESS_FORWARDING
        value: "true"
  test:
    enabled: false
  EOT
  ]

  set_sensitive {
    name  = "keycloak.persistence.dbPassword"
    value = module.keycloak_db.this_db_instance_password
  }
}
