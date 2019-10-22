locals {
  vpc_public_subnets = [
    "10.0.0.0/24",
    "10.0.1.0/24",
    "10.0.2.0/24",
  ]

  vpc_private_subnets = [
    "10.0.100.0/24",
    "10.0.101.0/24",
    "10.0.102.0/24",
  ]

  vpc_database_subnets = [
    "10.0.200.0/24",
    "10.0.201.0/24",
    "10.0.202.0/24",
  ]
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 2.0"

  name = "${var.project}-${terraform.workspace}"
  cidr = "10.0.0.0/16"

  azs = slice(
    data.aws_availability_zones.current.names,
    0,
    length(local.vpc_public_subnets),
  )

  public_subnets   = local.vpc_public_subnets
  private_subnets  = local.vpc_private_subnets
  database_subnets = local.vpc_database_subnets

  create_database_subnet_route_table = true
  enable_dns_hostnames               = true
  enable_nat_gateway                 = true
  single_nat_gateway                 = true

  tags = merge(
    local.tags,
    {
      "kubernetes.io/cluster/${local.eks_cluster_name}" = "shared"
    },
  )

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.eks_cluster_name}" = "shared"
    "kubernetes.io/role/elb"                          = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.eks_cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"                 = 1
  }
}
