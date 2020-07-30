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

data aws_secretsmanager_secret apps {
  name     = "phb/apps"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version apps {
  secret_id = data.aws_secretsmanager_secret.apps.id
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

data aws_secretsmanager_secret circleci {
  name     = "symphony/circleci"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version circleci {
  secret_id = data.aws_secretsmanager_secret.circleci.id
  provider  = aws.us-east-1
}

data aws_secretsmanager_secret cidrs {
  name     = "symphony/cidrs"
  provider = aws.us-east-1
}

data aws_secretsmanager_secret_version cidrs {
  secret_id = data.aws_secretsmanager_secret.cidrs.id
  provider  = aws.us-east-1
}
