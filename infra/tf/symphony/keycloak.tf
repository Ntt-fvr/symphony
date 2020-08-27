locals {
  keycloak_db = var.keycloak_db != null ? var.keycloak_db : data.terraform_remote_state.current.outputs.keycloak_db
}

resource random_password keycloak_admin {
  length  = 16
  special = false
}

resource helm_release keycloak {
  name       = "keycloak"
  namespace  = kubernetes_namespace.symphony.id
  chart      = "keycloak"
  repository = local.helm_repository.codecentric
  version    = "9.0.1"

  values = [yamlencode({
    replicas            = 2
    podDisruptionBudget = { minAvailable = 1 }
    ingress = {
      # TODO: enable once default/keycloak ingress gets removed.
      enabled = false
      annotations = {
        "kubernetes.io/ingress.class"                     = "nginx"
        "nginx.ingress.kubernetes.io/affinity"            = "cookie"
        "nginx.ingress.kubernetes.io/session-cookie-name" = "AUTH_SESSION_ID"
      }
      rules = [{
        host  = "auth.${local.domain_name}"
        paths = ["/"]
      }]
      tls = []
    }
    startupScripts = {
      "keycloak-bcrypt.sh" = file("${path.module}/files/keycloak-bcrypt.sh")
    }
    extraEnv = yamlencode([
      { name = "KEYCLOAK_USER", value = "admin" },
      { name = "KEYCLOAK_STATISTICS", value = "all" },
      { name = "JDBC_PARAMS", value = "useSSL=false" },
      { name = "PROXY_ADDRESS_FORWARDING", value = "true" },
      { name = "DB_VENDOR", value = local.keycloak_db.vendor },
      { name = "DB_ADDR", value = local.keycloak_db.host },
      { name = "DB_PORT", value = tostring(local.keycloak_db.port) },
      { name = "DB_USER", value = local.keycloak_db.user },
    ])
    extraEnvFrom = yamlencode([
      { secretRef = { name = "keycloak-http" } },
      { secretRef = { name = "keycloak-db" } },
    ])
    serviceMonitor = { enabled = true }
    postgresql     = { enabled = false }
    test           = { enabled = false }
    }),
  ]

  set_sensitive {
    name  = "secrets.http.stringData.KEYCLOAK_PASSWORD"
    value = random_password.keycloak_admin.result
  }

  set_sensitive {
    name  = "secrets.db.stringData.DB_PASSWORD"
    value = local.keycloak_db.password
  }
}
