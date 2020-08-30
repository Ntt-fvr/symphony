resource kubernetes_namespace symphony {
  metadata {
    name = "symphony"
  }
}

resource kubernetes_resource_quota default {
  metadata {
    name      = "default"
    namespace = kubernetes_namespace.symphony.id
  }

  spec {
    hard = {
      "limits.cpu"    = "8"
      "limits.memory" = "16Gi"
    }
  }
}

resource kubernetes_limit_range default {
  metadata {
    name      = "default"
    namespace = kubernetes_namespace.symphony.id
  }

  spec {
    limit {
      default = {
        cpu    = "2"
        memory = "4Gi"
      }
      default_request = {
        cpu    = "1"
        memory = "2Gi"
      }
      type = "Container"
    }
  }
}

resource kubernetes_secret artifactory {
  metadata {
    name      = "artifactory"
    namespace = kubernetes_namespace.symphony.id
  }

  data = {
    ".dockercfg" = jsonencode({
      (module.artifactory_secret.data.docker_registry) = {
        username = module.artifactory_secret.data.username
        password = module.artifactory_secret.data.password
        email    = module.artifactory_secret.data.email
      },
    })
  }

  type = "kubernetes.io/dockercfg"
}
