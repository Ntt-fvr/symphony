terraform {
  backend "s3" {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    workspace_key_prefix = "orc8r"
    key                  = "orc8r/terraform.tfstate"
    dynamodb_table       = "orc8r.terraform.lock"
    role_arn             = "arn:aws:iam::495344428215:role/Orc8rAdmin"
  }

  required_version = ">= 0.12"
}

locals {
  admin_role_arn      = "arn:aws:iam::495344428215:role/Orc8rAdmin"
  controller_role_arn = "arn:aws:iam::495344428215:role/Orc8rControllerRole20200204204815003000000001"
  domain_name         = "magma.etagecom.io"

  env = {
    staging = {
      region        = "eu-west-1"
      cluster       = "phb-staging"
      es_domain     = "tf-symphony-staging"
      chart_version = "1.4.31"

      use_nginx_proxy = true
    }
    production = {
      region        = "us-east-1"
      cluster       = "phb-default"
      es_domain     = "tf-symphony-default"
      chart_version = "1.4.31"

      use_nginx_proxy = false
    }
  }

  tags = {
    workspace = terraform.workspace
  }

  kubernetes_namespace = "orc8r"
}

data "terraform_remote_state" "current" {
  backend   = "s3"
  workspace = terraform.workspace

  config = {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    workspace_key_prefix = "orc8r"
    key                  = "orc8r/terraform.tfstate"
    dynamodb_table       = "orc8r.terraform.lock"
    role_arn             = "arn:aws:iam::495344428215:role/Orc8rAdmin"
  }

  defaults = {
    orc8r_tag = "latest"
  }
}

data "aws_s3_bucket" "deployment" {
  bucket   = "symphony.deployment"
  provider = aws.us-east-1
}

data "aws_eks_cluster" "symphony" {
  name = local.env[terraform.workspace].cluster
}

data "aws_eks_cluster_auth" "symphony" {
  name = local.env[terraform.workspace].cluster
}

data "aws_region" "current" {}
