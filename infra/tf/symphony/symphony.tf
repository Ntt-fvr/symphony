locals {
  symphony_name   = "symphony"
  symphony_tag    = var.symphony_tag != null ? var.symphony_tag : data.terraform_remote_state.current.outputs.symphony_tag
  graph_event_url = "nats://graph.event"
  nats_server_envar = {
    name  = "NATS_SERVER_URL"
    value = data.terraform_remote_state.core.outputs.eks.nats_server_url
  }
}

module store_role {
  source                    = "./../modules/irsa"
  role_name_prefix          = "SymphonyStoreRole"
  role_path                 = data.terraform_remote_state.core.outputs.eks.sa_role_path
  role_policy               = data.aws_iam_policy_document.store.json
  service_account_name      = "${local.symphony_name}-store"
  service_account_namespace = kubernetes_namespace.symphony.id
  oidc_provider_arn         = data.terraform_remote_state.core.outputs.eks.oidc_provider_arn
  tags                      = local.tags
}

data aws_iam_policy_document store {
  statement {
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
    ]

    resources = [
      "${aws_s3_bucket.store.arn}/*",
    ]
  }
}

module async_role {
  source                    = "./../modules/irsa"
  role_name_prefix          = "SymphonyAsyncRole"
  role_path                 = data.terraform_remote_state.core.outputs.eks.sa_role_path
  role_policy               = data.aws_iam_policy_document.async.json
  service_account_name      = "${local.symphony_name}-async"
  service_account_namespace = kubernetes_namespace.symphony.id
  oidc_provider_arn         = data.terraform_remote_state.core.outputs.eks.oidc_provider_arn
  tags                      = local.tags
}

data aws_iam_policy_document async {
  statement {
    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.store.arn}/${local.store_exports_path}/*",
    ]
  }
}

resource helm_release symphony {
  name                = local.symphony_name
  namespace           = kubernetes_namespace.symphony.id
  chart               = "symphony"
  repository          = local.helm_repository.symphony.url
  repository_username = local.helm_repository.symphony.username
  repository_password = local.helm_repository.symphony.password
  version             = "1.0.0"
  max_history         = 100

  values = concat([
    yamlencode({
      for s in toset(["front", "graph", "async", "store", "jobrunner", "docs"]) :
      s => {
        image = {
          repository = "${module.artifactory_secret.data.docker_registry}/${s}"
          tag        = local.symphony_tag
        }
      }
    }),
    yamlencode({
      for s in [
        { name = "front", replicas = 2 },
        { name = "graph", replicas = 3 },
        { name = "async", replicas = 1 },
        { name = "store", replicas = 1 },
      ] :
      s.name => merge(
        {
          replicas = s.replicas
          podDisruptionBudget = {
            enabled = true
          }
          deploymentAnnotations = {
            "sidecar.jaegertracing.io/inject" = "true"
          }
        },
        s.replicas == 1 ? {
          updateStrategy = {
            type = "RollingUpdate"
            rollingUpdate = {
              maxSurge       = 1
              maxUnavailable = 0
            }
          }
        } : {},
      )
    }),
    yamlencode({
      imagePullSecrets = [{
        name = kubernetes_secret.artifactory.metadata.0.name
      }]
      ingress = {
        # TODO: enable once default/inventory ingress gets removed.
        enabled = false
        annotations = {
          "kubernetes.io/ingress.class"                 = "nginx"
          "nginx.ingress.kubernetes.io/proxy-body-size" = "10m"
        }
        hosts = ["*.${local.domain_name}"]
        paths = ["/"]
      }
      serviceMonitor = {
        enabled = true
        alerting = {
          rules = yamldecode(
            templatefile("${path.module}/templates/symphony-alerts.tpl", {
              name      = local.symphony_name
              namespace = kubernetes_namespace.symphony.id
            }),
          )
        }
      }
      tracing = {
        enabled = true
        jaeger = {
          agentEndpoint       = "localhost:6831"
          agentThriftEndpoint = "localhost:6832"
        }
      }
      graphDB = {
        mysql = {
          host  = module.graph_db.this_db_instance_address
          port  = module.graph_db.this_db_instance_port
          user  = module.graph_db.this_db_instance_username
          param = "charset=utf8&parseTime=true&interpolateParams=true"
        }
      }
      front = {
        spec = {
          proxy = {
            logger = data.terraform_remote_state.core.outputs.eks.fluentd_http_service
          }
          mysql = {
            host = module.front_db.this_db_instance_address
            port = module.front_db.this_db_instance_port
            user = module.front_db.this_db_instance_username
            db   = "auth"
          }
        }
      }
      graph = {
        spec = {
          log = {
            level = "debug"
          }
          tenancy = {
            tenantMaxDBConn = 10
          }
          event = {
            url = local.graph_event_url
          }
          extraEnvVars = [
            local.nats_server_envar
          ]
        }
      }
      async = {
        serviceAccount = {
          name = module.async_role.service_account_name
          annotations = {
            "eks.amazonaws.com/role-arn" = module.async_role.role_arn
          }
        }
        spec = {
          log = {
            level = "debug"
          }
          tenancy = {
            tenantMaxDBConn = 5
          }
          event = {
            pub_url = local.graph_event_url
            sub_url = "${local.graph_event_url}?queue=async"
          }
          export = {
            bucket_url    = local.store_bucket_url
            bucket_prefix = local.store_exports_path
          }
          extraEnvVars = [
            local.nats_server_envar
          ]
        }
      }
      store = {
        serviceAccount = {
          name = module.store_role.service_account_name
          annotations = {
            "eks.amazonaws.com/role-arn" = module.store_role.role_arn
          }
        }
        spec = {
          log = {
            level = "debug"
          }
          bucket = {
            url = local.store_bucket_url
          }
        }
      }
      docs = {
        resources = {
          limits = {
            cpu    = "50m"
            memory = "64Mi"
          }
        }
      }
      jobrunner = {
        resources = {
          limits = {
            cpu    = "200m"
            memory = "256Mi"
          }
        }
      }
    })],
    var.with_orc8r ? [
      yamlencode({
        front = {
          spec = {
            grafana = {
              address = "orc8r-user-grafana.orc8r.svc.cluster.local:3000"
            }
          }
        }
        integrations = {
          orc8r = {
            enabled = true
            host    = "orc8r-nginx-proxy.orc8r.svc.cluster.local"
          }
        }
      })
  ] : [])

  set_sensitive {
    name  = "front.spec.session_token"
    value = module.front_secret.data.session_token
  }
  set_sensitive {
    name  = "front.spec.mapbox.access_token"
    value = module.front_secret.data.mapbox_access_token
  }
  set_sensitive {
    name  = "front.spec.mysql.pass"
    value = module.front_db.this_db_instance_password
  }
  set_sensitive {
    name  = "graphDB.mysql.pass"
    value = module.graph_db.this_db_instance_password
  }
  set_sensitive {
    name  = "integrations.orc8r.tls.cert"
    value = module.orc8r_secret.data.cert
  }
  set_sensitive {
    name  = "integrations.orc8r.tls.key"
    value = module.orc8r_secret.data.pkey
  }

  lifecycle {
    prevent_destroy = true
  }
}
