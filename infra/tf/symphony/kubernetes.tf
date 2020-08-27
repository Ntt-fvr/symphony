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

data aws_secretsmanager_secret artifactory {
  name     = "symphony/artifactory"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version artifactory {
  secret_id = data.aws_secretsmanager_secret.artifactory.id
  provider  = aws.us-east-1
}

locals {
  docker_registry = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["docker_registry"]
}

resource kubernetes_secret artifactory {
  metadata {
    name      = "artifactory"
    namespace = kubernetes_namespace.symphony.id
  }

  data = {
    ".dockercfg" = jsonencode({
      (local.docker_registry) = {
        username = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["username"]
        password = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["password"]
        email    = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["email"]
      },
    })
  }

  type = "kubernetes.io/dockercfg"
}
