terraform {
  # store state in s3 to allow mutli user deployments
  # note that bucket lifecycle is _not_ managed
  backend "s3" {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    workspace_key_prefix = "terraform"
    key                  = "terraform/terraform.tfstate"
    dynamodb_table       = "symphony.terraform.lock"
  }

  required_version = ">= 0.12"
}

locals {
  # current environment name
  environment = terraform.workspace != "default" ? terraform.workspace : "production"

  # default resource tags
  tags = {
    Environment = var.project
    Workspace   = terraform.workspace
  }

  # output path for file placement
  output_path = "${path.module}/.terraform/output/"
}

data terraform_remote_state current {
  backend   = "s3"
  workspace = terraform.workspace

  # must be identical to backend config
  config = {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    key                  = "terraform/terraform.tfstate"
    workspace_key_prefix = "terraform"
    dynamodb_table       = "symphony.terraform.lock"
  }

  # first time deployment defaults
  defaults = {
    inventory_tag = "latest"
    storybook_tag = "latest"
  }
}

# expose deployment bucket
data aws_s3_bucket deployment {
  bucket   = "symphony.deployment"
  provider = aws.us-east-1
}

# expose state lock table
data aws_dynamodb_table lock {
  name     = "symphony.terraform.lock"
  provider = aws.us-east-1
}

# expose available azs in current region
data aws_availability_zones current {}

# expose current user data
data aws_caller_identity current {}

# expose current region data
data aws_region current {}
