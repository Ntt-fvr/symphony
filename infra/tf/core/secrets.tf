data aws_secretsmanager_secret artifactory {
  name     = "symphony/artifactory"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version artifactory {
  secret_id = data.aws_secretsmanager_secret.artifactory.id
  provider  = aws.us-east-1
}

data aws_secretsmanager_secret mapbox {
  name     = "phb/mapbox"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version mapbox {
  secret_id = data.aws_secretsmanager_secret.mapbox.id
  provider  = aws.us-east-1
}

data aws_secretsmanager_secret alertmanager {
  name     = "symphony/alertmanager"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version alertmanager {
  secret_id = data.aws_secretsmanager_secret.alertmanager.id
  provider  = aws.us-east-1
}

data sops_file circleci {
  source_file = "${path.module}/secrets/circleci.yaml"
}

data sops_file cidrs {
  source_file = "${path.module}/secrets/cidrs.yaml"
}

locals {
  cidrs = {
    facebook = [for k, v in data.sops_file.cidrs.data : v if split(".", k)[0] == "facebook"]
    cellcom  = [for k, v in data.sops_file.cidrs.data : v if split(".", k)[0] == "cellcom"]
  }
}
