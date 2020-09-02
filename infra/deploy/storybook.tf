# reuse existing storybook tag when none was provided
locals {
  storybook_tag = var.storybook_tag == "" ? data.terraform_remote_state.current.outputs.storybook_tag : var.storybook_tag
}

# storybook application
resource helm_release storybook {
  name                = "storybook"
  namespace           = "default"
  repository          = local.helm_repository.symphony.url
  repository_username = local.helm_repository.symphony.username
  repository_password = local.helm_repository.symphony.password
  chart               = "storybook"
  version             = "1.1.0"
  keyring             = ""
  max_history         = 10

  values = [<<VALUES
  image:
    repository: ${jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["docker_registry"]}/storybook
    tag: ${local.storybook_tag}
  imagePullSecrets:
    - name: ${kubernetes_secret.artifactory.metadata[0].name}
  ingress:
    enabled: false
    annotations:
      kubernetes.io/ingress.class: nginx
    hosts:
      - host: storybook.${local.domains.symphony.intern_name}
        paths:
          - /
  VALUES
  ]

  lifecycle {
    prevent_destroy = true
  }
}
