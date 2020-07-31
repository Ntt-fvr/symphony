data "aws_s3_bucket_objects" "orc8r_certs" {
  bucket   = data.aws_s3_bucket.deployment.bucket
  prefix   = "orc8r/secrets/certs/"
  provider = aws.us-east-1
}

data "aws_s3_bucket_object" "orc8r_certs" {
  for_each = toset(data.aws_s3_bucket_objects.orc8r_certs.keys)
  bucket   = data.aws_s3_bucket_objects.orc8r_certs.bucket
  key      = each.key
  provider = aws.us-east-1
}

data "aws_s3_bucket_objects" "orc8r_configs" {
  bucket   = data.aws_s3_bucket.deployment.bucket
  prefix   = format("orc8r/secrets/configs/%s/", terraform.workspace)
  provider = aws.us-east-1
}

data "aws_s3_bucket_object" "orc8r_configs" {
  for_each = toset(data.aws_s3_bucket_objects.orc8r_configs.keys)
  bucket   = data.aws_s3_bucket_objects.orc8r_configs.bucket
  key      = each.key
  provider = aws.us-east-1
}

data "aws_s3_bucket_objects" "ocr8r_envdir" {
  bucket   = data.aws_s3_bucket.deployment.bucket
  prefix   = format("orc8r/secrets/environments/%s/", terraform.workspace)
  provider = aws.us-east-1
}

data "aws_s3_bucket_object" "orc8r_envdir" {
  for_each = toset(data.aws_s3_bucket_objects.ocr8r_envdir.keys)
  bucket   = data.aws_s3_bucket_objects.ocr8r_envdir.bucket
  key      = each.key
  provider = aws.us-east-1
}

resource "kubernetes_secret" "orc8r" {
  for_each = {
    certs   = data.aws_s3_bucket_object.orc8r_certs
    configs = data.aws_s3_bucket_object.orc8r_configs
    envdir  = data.aws_s3_bucket_object.orc8r_envdir
  }

  metadata {
    name      = format("orc8r-%s", each.key)
    namespace = local.kubernetes_namespace
  }

  data = { for e in each.value : basename(e.key) => e.body }
}

data "aws_secretsmanager_secret" "orc8r_db" {
  name = "symphony/orc8rdb"
}

data "aws_secretsmanager_secret_version" "orc8r_db" {
  secret_id = data.aws_secretsmanager_secret.orc8r_db.id
}

data "aws_secretsmanager_secret" "mapbox" {
  name     = "phb/mapbox"
  provider = aws.us-east-1
}

data "aws_secretsmanager_secret_version" "mapbox" {
  secret_id = data.aws_secretsmanager_secret.mapbox.id
  provider  = aws.us-east-1
}

