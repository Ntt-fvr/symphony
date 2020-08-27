locals {
  helm_repository = {
    symphony = {
      url      = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["helm_repository"]
      username = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["username"]
      password = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["password"]
    }
    codecentric = "https://codecentric.github.io/helm-charts"
  }
}
