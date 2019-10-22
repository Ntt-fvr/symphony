provider "aws" {
  region  = local.env[terraform.workspace].region
  version = "~> 2.0"

  assume_role {
    role_arn = local.admin_role_arn
  }
}

provider "aws" {
  region  = "us-east-1"
  version = "~> 2.0"
  alias   = "us-east-1"

  assume_role {
    role_arn = local.admin_role_arn
  }
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.symphony.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.symphony.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.symphony.token
  load_config_file       = false
  version                = "~> 1.0"
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.symphony.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.symphony.certificate_authority.0.data)
    token                  = data.aws_eks_cluster_auth.symphony.token
    load_config_file       = false
  }

  version = "~> 1.0"
}
