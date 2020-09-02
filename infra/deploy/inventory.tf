# inventory service data store
resource aws_s3_bucket inventory_store {
  bucket_prefix = "${var.project}-${terraform.workspace}-"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "DELETE"]
    allowed_origins = ["https://*.${local.domains.symphony.name}"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true

    tags = {
      "autoclean" = "true"
    }

    expiration {
      days = 7
    }
  }

  lifecycle_rule {
    enabled = true

    noncurrent_version_expiration {
      days = 180
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Project   = "symphony"
    PartOf    = "symphony"
    Workspace = local.environment
  }
}

# limit public access to inventory data store
resource aws_s3_bucket_public_access_block inventory_store {
  bucket                  = aws_s3_bucket.inventory_store.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

