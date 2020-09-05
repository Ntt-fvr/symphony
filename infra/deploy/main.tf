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

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 1.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 2.0"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 2.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 1.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 1.0"
    }
    sops = {
      source  = "carlpett/sops"
      version = "~> 0.5"
    }
  }

  required_version = ">= 0.13"
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
