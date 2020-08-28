terraform {
  required_version = ">= 0.13"

  backend s3 {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    workspace_key_prefix = "symphony"
    key                  = "symphony/terraform.tfstate"
    dynamodb_table       = "symphony.tflock"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 1.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 1.0"
    }
  }
}

locals {
  env = {
    staging = {
      region  = "eu-west-1"
      cluster = "phb-staging"
    }
    production = {
      region  = "us-east-1"
      cluster = "phb-default"
    }
  }
}

data terraform_remote_state current {
  backend   = "s3"
  workspace = terraform.workspace

  config = {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    workspace_key_prefix = "symphony"
    key                  = "symphony/terraform.tfstate"
    dynamodb_table       = "symphony.tflock"
  }

  defaults = {
    storybook_tag = "latest"
    keycloak_db = {
      vendor   = "mysql"
      host     = "localhost"
      port     = 3306
      user     = "root"
      password = "root"
    }
  }
}

locals {
  core_workspace = terraform.workspace != "production" ? terraform.workspace : "default"
}

data terraform_remote_state core {
  backend   = "s3"
  workspace = local.core_workspace

  config = {
    bucket               = "symphony.deployment"
    region               = "us-east-1"
    key                  = "terraform/terraform.tfstate"
    workspace_key_prefix = "terraform"
    dynamodb_table       = "symphony.terraform.lock"
  }
}

data aws_eks_cluster cluster {
  name = local.env[terraform.workspace].cluster
}

data aws_eks_cluster_auth cluster {
  name = data.aws_eks_cluster.cluster.name
}

locals {
  domain_name = format(
    "%sthesymphony.cloud",
    terraform.workspace != "production" ? "${terraform.workspace}." : "",
  )
  intern_domain_name = "intern.${local.domain_name}"

  tags = {
    Project   = "symphony"
    PartOf    = "symphony"
    Workspace = terraform.workspace
  }
}

data aws_iam_role rds_monitoring {
  name = "rds-monitoring-role"
}
