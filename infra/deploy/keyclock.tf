# generate random password for keycloak database
resource random_string keycloak_dbpass {
  length  = 16
  special = false
}

# keycloak database
module keycloak_db {
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

  vpc_security_group_ids = [aws_security_group.eks_rds["mysql"].id]
  subnet_ids             = module.vpc.database_subnets
  db_subnet_group_name   = module.vpc.database_subnet_group

  tags = local.tags
}

# generate random password for keycloak admin
resource random_password keycloak_admin {
  length  = 16
  special = false
}

# keycloak is a identity and access manager
resource helm_release keycloak {
  name       = "keycloak"
  repository = local.helm_repository.codecentric
  chart      = "keycloak"
  version    = "9.0.1"

  values = [<<EOT
  replicas: 2
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
      nginx.ingress.kubernetes.io/affinity: cookie
      nginx.ingress.kubernetes.io/session-cookie-name: AUTH_SESSION_ID
    rules:
      - host: auth.${local.domains.symphony.name}
        paths:
          - /
    tls: []
  podDisruptionBudget:
    minAvailable: 1
  startupScripts:
    keycloak-bcrypt.sh: |
      ${indent(6, chomp(file("${path.module}/files/keycloak-bcrypt.sh")))}
  extraEnv: |
    - name: KEYCLOAK_USER
      value: "admin"
    - name: KEYCLOAK_STATISTICS
      value: "all"
    - name: JDBC_PARAMS
      value: "useSSL=false"
    - name: PROXY_ADDRESS_FORWARDING
      value: "true"
    - name: DB_VENDOR
      value: "mysql"
    - name: DB_ADDR
      value: "${module.keycloak_db.this_db_instance_address}"
    - name: DB_PORT
      value: "${module.keycloak_db.this_db_instance_port}"
    - name: DB_USER
      value: "${module.keycloak_db.this_db_instance_username}"
  extraEnvFrom: |
    - secretRef:
        name: keycloak-http
    - secretRef:
        name: keycloak-db
  serviceMonitor:
    enabled: true
  postgresql:
    enabled: false
  test:
    enabled: false
  EOT
  ]

  set_sensitive {
    name  = "secrets.http.stringData.KEYCLOAK_PASSWORD"
    value = random_password.keycloak_admin.result
  }

  set_sensitive {
    name  = "secrets.db.stringData.DB_PASSWORD"
    value = module.keycloak_db.this_db_instance_password
  }
}
