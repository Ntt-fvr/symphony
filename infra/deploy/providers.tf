provider aws {
  region  = var.region[terraform.workspace]
  version = "~> 2.0"
}

provider aws {
  region  = var.region[terraform.workspace]
  version = "~> 2.0"
  alias   = "eks_admin"

  assume_role {
    role_arn = aws_iam_role.eks_admin.arn
  }
}

provider aws {
  region  = "us-east-1"
  version = "~> 2.0"
  alias   = "us-east-1"
}

provider random {
  version = "~> 2.0"
}

provider local {
  version = "~> 1.0"
}

provider null {
  version = "~> 2.0"
}

provider template {
  version = "~> 2.0"
}

provider http {
  version = "~> 1.1"
}

provider tls {
  version = "~> 2.0"
}

provider kubernetes {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.eks.token
  load_config_file       = false
  version                = "~> 1.0"
}

provider helm {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.eks.token
    load_config_file       = false
  }

  version = "~> 1.0"
}

