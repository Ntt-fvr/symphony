locals {
  storybook_tag = var.storybook_tag != null ? var.storybook_tag : data.terraform_remote_state.current.outputs.storybook_tag
}

resource helm_release storybook {
  name                = "storybook"
  namespace           = kubernetes_namespace.symphony.id
  chart               = "storybook"
  repository          = local.helm_repository.symphony.url
  repository_username = local.helm_repository.symphony.username
  repository_password = local.helm_repository.symphony.password
  version             = "1.1.0"
  max_history         = 10

  values = [yamlencode({
    image = {
      repository = "${module.artifactory_secret.data.docker_registry}/storybook"
      tag        = local.storybook_tag
    }
    imagePullSecrets = [{
      name = kubernetes_secret.artifactory.metadata.0.name
    }]
    ingress = {
      enabled = true
      annotations = {
        "kubernetes.io/ingress.class" = "nginx"
      }
      hosts = [{
        host  = "storybook.${local.intern_domain_name}"
        paths = ["/"]
      }]
    }
    resources = {
      limits = {
        cpu    = "10m"
        memory = "64Mi"
      }
    }
  })]

  lifecycle {
    prevent_destroy = true
  }
}
