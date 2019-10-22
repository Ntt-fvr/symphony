locals {
  artifactory_dockercfg = {
    jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["docker_registry"] = {
      username = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["username"]
      password = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["password"]
      email    = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["email"]
    }
  }
}

# save docker login creds as k8s secret
resource "kubernetes_secret" "artifactory" {
  metadata {
    name = "artifactory"
  }

  data = { ".dockercfg" = jsonencode(local.artifactory_dockercfg) }
  type = "kubernetes.io/dockercfg"
}
