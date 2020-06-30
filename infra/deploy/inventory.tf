locals {
  # helm release name
  inventory_name = "inventory"
  # helm release namespace
  inventory_namespace = "default"
  # reuse existing inventory tag when none was provided
  inventory_tag = var.inventory_tag == "" ? data.terraform_remote_state.current.outputs.inventory_tag : var.inventory_tag
}

# inventory service data store
resource "aws_s3_bucket" "inventory_store" {
  bucket_prefix = "${var.project}-${terraform.workspace}-"
  region        = data.aws_region.current.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "DELETE"]
    allowed_origins = [for domain in local.domains : format("https://*.%s", domain.name)]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true

    noncurrent_version_expiration {
      days = 180
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = local.tags
}

# limit public access to inventory data store
resource "aws_s3_bucket_public_access_block" "inventory_store" {
  bucket                  = aws_s3_bucket.inventory_store.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# iam role for inventory store
module "inventory_store_role" {
  source                    = "./modules/irsa"
  role_name_prefix          = "InventoryStoreRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.inventory_store.json
  service_account_name      = "${local.inventory_name}-store"
  service_account_namespace = local.inventory_namespace
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# policy required by inventory store service
data "aws_iam_policy_document" "inventory_store" {
  statement {
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
    ]

    resources = [
      "${aws_s3_bucket.inventory_store.arn}/*",
    ]
  }
}

# inventory application
resource "helm_release" "inventory" {
  name                = local.inventory_name
  namespace           = local.inventory_namespace
  repository          = local.helm_repository.symphony.url
  repository_username = local.helm_repository.symphony.username
  repository_password = local.helm_repository.symphony.password
  chart               = "inventory"
  version             = "1.5.0"
  keyring             = ""
  max_history         = 100

  values = [templatefile("${path.module}/templates/inventory-values.tpl", {
    image_pull_secret = kubernetes_secret.artifactory.metadata[0].name
    replicas          = 2
    docker_registry   = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["docker_registry"]
    docker_tag        = local.inventory_tag
    alerting_rules = templatefile("${path.module}/templates/inventory-alerts.tpl", {
      name      = local.inventory_name
      namespace = local.inventory_namespace
    })
    front_logger_host = format("%s-http.%s.svc.cluster.local:9880",
      helm_release.fluentd_elasticsearch.name,
      helm_release.fluentd_elasticsearch.namespace,
    )
    front_mapbox_token = jsondecode(data.aws_secretsmanager_secret_version.mapbox.secret_string)["access_token"]
    front_db_name      = local.auth_db_name
    front_db_host      = module.db.this_db_instance_address
    front_db_port      = module.db.this_db_instance_port
    front_db_user      = module.db.this_db_instance_username
    graph_db_host      = module.graph_db.this_db_instance_address
    graph_db_port      = module.graph_db.this_db_instance_port
    graph_db_user      = module.graph_db.this_db_instance_username
    graph_replicas     = 3
    async_replicas     = 3
    store_bucket_url   = format("s3://%s?region=%s", aws_s3_bucket.inventory_store.id, aws_s3_bucket.inventory_store.region)
    store_sa_name      = module.inventory_store_role.service_account_name
    store_rolearn      = module.inventory_store_role.role_arn
    orc8r_host         = "orc8r-nginx-proxy.${kubernetes_namespace.orc8r.id}"
    grafana_address    = "orc8r-user-grafana.${kubernetes_namespace.orc8r.id}:3000"
    nats_server_url    = format("nats://%s-client.%s", helm_release.nats.name, helm_release.nats.namespace)
  })]

  set_sensitive {
    name  = "front.spec.mysql.pass"
    value = module.db.this_db_instance_password
  }

  set_sensitive {
    name  = "graphDB.mysql.pass"
    value = module.graph_db.this_db_instance_password
  }

  set_sensitive {
    name  = "front.spec.session_token"
    value = jsondecode(data.aws_secretsmanager_secret_version.apps.secret_string)["session_token"]
  }

  set_sensitive {
    name  = "integrations.orc8r.tls.cert"
    value = jsondecode(data.aws_secretsmanager_secret_version.apps.secret_string)["api_cert"]
  }

  set_sensitive {
    name  = "integrations.orc8r.tls.key"
    value = jsondecode(data.aws_secretsmanager_secret_version.apps.secret_string)["api_private_key"]
  }

  lifecycle {
    prevent_destroy = true
  }
}

# cron job periodically cleaning test tenant data
resource "kubernetes_cron_job" "tenant_cleaner" {
  for_each = terraform.workspace == "staging" ? {
    testimio = {
      schedule = "25,55 * * * *"
    }
    fb-test = {
      schedule = "0 0 * * *"
    }
  } : {}

  metadata {
    name      = format("%s-%s-cleaner", local.inventory_name, each.key)
    namespace = helm_release.inventory.namespace
  }

  spec {
    concurrency_policy = "Forbid"
    schedule           = each.value.schedule

    job_template {
      metadata {}
      spec {
        template {
          metadata {}
          spec {
            container {
              name  = format("%s-%s-cleaner", local.inventory_name, each.key)
              image = "networld/grpcurl"
              command = [
                "/bin/sh",
                "-c",
                format(
                  "/grpcurl -plaintext -d '%q' %s-graph:443 graph.TenantService.Truncate",
                  each.key, local.inventory_name,
                ),
              ]
            }
          }
        }
      }
    }
  }
}
