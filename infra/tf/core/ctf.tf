locals {
  # deploy ctf iam resources on production only.
  ctf_iam_count = terraform.workspace == "default" ? 1 : 0
  # k8s group name for ctf admins.
  ctf_admin_user  = "ctf:master"
  ctf_admin_group = "ctf:masters"
  # public domain name.
  ctf_root_domain_name = "openctf.io"
  ctf_domain_name      = terraform.workspace != "default" ? "${terraform.workspace}.${local.ctf_root_domain_name}" : local.ctf_root_domain_name
  # tags applied to ctf resources
  ctf_tags = merge(local.tags, { Project : "ctf" })
}

# hosted zone for ctf records
resource aws_route53_zone ctf {
  name = local.ctf_domain_name
}

# access root zone for ctf records
data aws_route53_zone ctf {
  name  = local.ctf_root_domain_name
  count = local.subdomain_count
}

# dns record from parent hosted zone to subdomain name servers
resource aws_route53_record ctf_subdomain {
  name    = aws_route53_zone.ctf.name
  type    = "NS"
  zone_id = data.aws_route53_zone.ctf[count.index].id
  records = aws_route53_zone.ctf.name_servers
  ttl     = 300
  count   = local.subdomain_count
}

# kubernetes namespace for ctf deployment
resource kubernetes_namespace ctf {
  metadata {
    name = "ctf"
  }
}

# kubernetes resource quota for ctf deployment
resource kubernetes_resource_quota ctf {
  metadata {
    name      = "default"
    namespace = kubernetes_namespace.ctf.id
  }

  spec {
    hard = {
      "limits.cpu"    = "8"
      "limits.memory" = "16Gi"
    }
  }
}

# kubernetes limit range for ctf deployment
resource kubernetes_limit_range ctf {
  metadata {
    name      = "default"
    namespace = kubernetes_namespace.ctf.id
  }

  spec {
    limit {
      default = {
        cpu    = "1"
        memory = "2Gi"
      }
      default_request = {
        cpu    = "500m"
        memory = "1Gi"
      }
      type = "Container"
    }
  }
}

# kubernetes role bindings for ctf admins
resource kubernetes_role_binding ctf_admins {
  metadata {
    name      = "admins"
    namespace = kubernetes_namespace.ctf.id
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
}

# IAM group for CTF team.
resource aws_iam_group ctf {
  name  = "CTF"
  count = local.ctf_iam_count
}

# IAM group for CTF team.
data aws_iam_group ctf {
  group_name = "CTF"
  count      = 1 - length(aws_iam_group.ctf)
}

# aws iam role for admins in ctf namespace.
resource aws_iam_role ctf_admin {
  name               = "CTFAdmin"
  assume_role_policy = data.aws_iam_policy_document.root_delegate.json
  count              = local.ctf_iam_count
}

# ref the above iam role.
data aws_iam_role ctf_admin {
  name  = "CTFAdmin"
  count = 1 - local.ctf_iam_count
}

# aws iam policy document granting ctf admin assume role
data aws_iam_policy_document ctf_admin_role {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    resources = [
      aws_iam_role.ctf_admin[count.index].arn
    ]
  }

  count = local.ctf_iam_count
}

# aws iam group policy for above policy document
resource aws_iam_group_policy ctf {
  group  = aws_iam_group.ctf[count.index].id
  policy = data.aws_iam_policy_document.ctf_admin_role[count.index].json
  count  = local.ctf_iam_count
}

# certificate issuer for openctf.io
resource helm_release ctf_cert_issuer {
  name       = "ctf-cert-issuer"
  namespace  = kubernetes_namespace.ctf.id
  repository = local.helm_repository.kiwigrid
  chart      = "any-resource"

  values = [yamlencode({
    anyResources = {
      CertIssuer = yamlencode({
        apiVersion = "cert-manager.io/v1"
        kind       = "Issuer"
        metadata = {
          name = "letsencrypt"
        }
        spec = {
          acme = {
            server = "https://acme-v02.api.letsencrypt.org/directory"
            email  = "alexsn@fb.com"
            privateKeySecretRef = {
              name = "letsencrypt"
            }
            solvers = [{
              dns01 = {
                route53 = {
                  region       = data.aws_region.current.name
                  hostedZoneID = aws_route53_zone.ctf.id
                }
              }
              selector = {
                dnsZones = [local.ctf_domain_name]
              }
            }]
          }
        }
      })
    }
  })]
}

# ctf database password
resource random_password ctf_db {
  length  = 50
  special = false
}

# postgres db for ctf
module ctf_db {
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
  password   = random_password.ctf_db.result
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

  tags = local.ctf_tags
}

# kubernetes secret for ctf database
resource kubernetes_secret ctf_db {
  metadata {
    name      = "ctf-database"
    namespace = kubernetes_namespace.ctf.id
  }

  data = {
    type     = "postgres"
    host     = module.ctf_db.this_db_instance_address
    user     = module.ctf_db.this_db_instance_username
    password = module.ctf_db.this_db_instance_password
    database = module.ctf_db.this_db_instance_name
  }
}

# datastore bucket for ctf
resource aws_s3_bucket ctf_datastore {
  bucket = format("ctf%s-datastore",
    local.environment != "production" ? "-${local.environment}" : "",
  )

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = local.ctf_tags
}


# block public access to ctf bucket
resource aws_s3_bucket_public_access_block ctf_datastore {
  bucket                  = aws_s3_bucket.ctf_datastore.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# IAM policy for ctf admins.
data aws_iam_policy_document ctf_admin {
  statement {
    actions = ["s3:*"]
    resources = [
      aws_s3_bucket.ctf_datastore.arn,
      "${aws_s3_bucket.ctf_datastore.arn}/*",
    ]
  }
}

# Create a policy from the above document.
resource aws_iam_policy ctf_admin {
  policy = data.aws_iam_policy_document.ctf_admin.json
}

# Attach datastore admin policy to ctf admin group
resource aws_iam_group_policy_attachment ctf_admin {
  group = try(
    aws_iam_group.ctf[0].name,
    data.aws_iam_group.ctf[0].group_name,
  )
  policy_arn = aws_iam_policy.ctf_admin.arn
}

# IAM policy for fileserver
data aws_iam_policy_document ctf_fileserver {
  statement {
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
    ]

    resources = [
      "${aws_s3_bucket.ctf_datastore.arn}/*",
    ]
  }
}

# IAM role for ctf fileserver.
module ctf_fileserver_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "CTFFileServerRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.ctf_fileserver.json
  service_account_name      = "fileserver"
  service_account_namespace = kubernetes_namespace.ctf.id
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.ctf_tags
}
