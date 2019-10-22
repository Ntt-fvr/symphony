data "aws_secretsmanager_secret" "artifactory" {
  name     = "symphony/artifactory"
  provider = aws.us-east-1
}

data "aws_secretsmanager_secret_version" "artifactory" {
  secret_id = data.aws_secretsmanager_secret.artifactory.id
  provider  = aws.us-east-1
}

locals {
  dockercfg = {
    jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["docker_registry"] = {
      username = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["username"]
      password = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["password"]
      email    = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["email"]
    }
  }
}

resource "kubernetes_secret" "artifactory" {
  metadata {
    name      = "artifactory"
    namespace = local.kubernetes_namespace
  }

  data = { ".dockercfg" = jsonencode(local.dockercfg) }
  type = "kubernetes.io/dockercfg"
}
