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

data sops_file secrets {
  source_file = "${path.module}/secrets.yaml"
}

locals {
  cidrs = {
    for cidr in toset(["facebook", "cellcom"]) : cidr => [
      for k, v in data.sops_file.secrets.data :
      v if length(regexall("^cidrs\\.${cidr}\\.", k)) > 0
    ]
  }
}
