resource kubernetes_namespace this_namespace {
  metadata {
    name = var.team_name
  }
}

resource kubernetes_resource_quota this_resource_quota {
  metadata {
    name      = "default"
    namespace = kubernetes_namespace.this_namespace.id
  }

  spec {
    hard = {
      "limits.cpu"    = "8"
      "limits.memory" = "16Gi"
    }
  }
}

resource kubernetes_limit_range this_limit_range {
  metadata {
    name      = "default"
    namespace = kubernetes_namespace.this_namespace.id
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

resource kubernetes_role_binding this_role_binding {
  metadata {
    name      = "${kubernetes_namespace.this_namespace.id}:master"
    namespace = kubernetes_namespace.this_namespace.id
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "admin"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "Group"
    name      = "${kubernetes_namespace.this_namespace.id}:masters"
    api_group = "rbac.authorization.k8s.io"
  }
}

locals {
  group_name = title(var.team_name)
  role_name  = "${local.group_name}Admin"
}

module this_team_iam {
  source     = "./team_iam"
  group_name = local.group_name
  role_name  = local.role_name
  count      = terraform.workspace == "default" ? 1 : 0
}

data aws_iam_role this_team_role {
  name  = local.role_name
  count = 1 - length(module.this_team_iam)
}
