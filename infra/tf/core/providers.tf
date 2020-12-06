provider "aws" {
  region = var.region[terraform.workspace]
}

provider "aws" {
  region = var.region[terraform.workspace]
  alias  = "eks_admin"

  assume_role {
    role_arn = aws_iam_role.eks_admin.arn
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.eks.token
  load_config_file       = false
}

provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.eks.token
    load_config_file       = false
  }
}

