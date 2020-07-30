locals {
  # partially generate eks cluster name
  eks_cluster_name = "${var.project}-${terraform.workspace}"

  # iam role path for service accounts
  eks_sa_role_path = "/service_accounts/${local.environment}/"
}

# eks workers ssh key
resource tls_private_key eks_workers {
  algorithm = "RSA"
}

# keypair from ssh key
resource aws_key_pair eks_workers {
  key_name_prefix = "${local.eks_cluster_name}-"
  public_key      = tls_private_key.eks_workers.public_key_openssh
}

# security group allowing ssh traffic from bastion
resource aws_security_group eks_worker_ssh {
  name_prefix = "eks-ssh-"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion.id]
  }
}

module eks {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 12.0"
  cluster_name    = local.eks_cluster_name
  cluster_version = "1.17"
  enable_irsa     = true

  subnets = module.vpc.private_subnets

  vpc_id             = module.vpc.vpc_id
  config_output_path = local.output_path

  cluster_enabled_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler",
  ]

  workers_group_defaults               = { key_name = aws_key_pair.eks_workers.key_name }
  worker_additional_security_group_ids = [aws_security_group.eks_worker_ssh.id]
  attach_worker_cni_policy             = false

  worker_groups = [
    {
      instance_type        = "t3.xlarge"
      asg_desired_capacity = 5
      asg_min_size         = 5
      asg_max_size         = 9
      autoscaling_enabled  = true
      tags = [
        {
          key                 = "k8s.io/cluster-autoscaler/enabled"
          propagate_at_launch = "false"
          value               = "true"
        },
        {
          key                 = "k8s.io/cluster-autoscaler/${local.eks_cluster_name}"
          propagate_at_launch = "false"
          value               = "true"
        },
        {
          key                 = "k8s.io/cluster-autoscaler/node-template/resources/ephemeral-storage"
          propagate_at_launch = "false"
          value               = "100Gi"
        }
      ]
    },
  ]

  map_roles = concat(
    [
      {
        rolearn  = aws_iam_role.eks_admin.arn
        username = "admin"
        groups   = ["system:masters"]
      },
      {
        rolearn  = local.eks_developer_role.arn
        username = ""
        groups   = [local.eks_developer_group]
      },
      {
        rolearn  = local.orc8r_admin_role.arn
        username = ""
        groups   = [local.orc8r_admin_group]
      },
    ],
    try([{
      rolearn  = aws_iam_role.ctf_admin[0].arn
      username = local.ctf_admin_user
      groups   = [local.ctf_admin_group]
    }], []),
  )

  kubeconfig_name                      = "symphony-${local.environment}"
  kubeconfig_aws_authenticator_command = "aws"
  kubeconfig_aws_authenticator_command_args = concat(
    [
      "eks", "get-token",
      "--cluster-name", local.eks_cluster_name,
      "--region", data.aws_region.current.name,
    ],
    var.k8s_assume_role
    ? ["--role-arn", aws_iam_role.eks_admin.arn]
    : [],
  )
  write_kubeconfig = false

  tags = local.tags
}

# generates eks access token
data aws_eks_cluster_auth eks {
  name     = module.eks.cluster_id
  provider = aws.eks_admin
}

# policy delegating assume role check to account root
data aws_iam_policy_document root_delegate {
  statement {
    principals {
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
      type        = "AWS"
    }

    actions = [
      "sts:AssumeRole",
    ]
  }
}

# create iam role for eks admin
resource aws_iam_role eks_admin {
  name = format(
    "Eks%sAdmin",
    terraform.workspace != "default" ? title(terraform.workspace) : "",
  )
  assume_role_policy = data.aws_iam_policy_document.root_delegate.json
  description        = "EKS cluster admin role for ${module.eks.cluster_id}"
}

# policy allowing full access to eks resources
data aws_iam_policy_document eks_full_access {
  statement {
    actions = [
      "eks:*",
    ]

    resources = [
      module.eks.cluster_arn,
    ]
  }
}

# attach full eks access policy to admin role
resource aws_iam_role_policy eks_admin {
  role   = aws_iam_role.eks_admin.id
  policy = data.aws_iam_policy_document.eks_full_access.json
}

# document allowing assume eks admin role
data aws_iam_policy_document eks_admin {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    resources = [
      aws_iam_role.eks_admin.arn,
    ]
  }
}

# policy allowing assume eks admin role
resource aws_iam_policy eks_admin {
  policy = data.aws_iam_policy_document.eks_admin.json
}

# role assume policy for eks workers
data aws_iam_policy_document eks_worker_assumable {
  statement {
    principals {
      identifiers = ["ec2.amazonaws.com"]
      type        = "Service"
    }
    actions = ["sts:AssumeRole"]
  }

  statement {
    principals {
      identifiers = [module.eks.worker_iam_role_arn]
      type        = "AWS"
    }
    actions = ["sts:AssumeRole"]
  }
}

# kubernetes cluster role binding for viewers
resource kubernetes_cluster_role_binding viewers {
  metadata {
    name = "viewers"
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "view"
    api_group = "rbac.authorization.k8s.io"
  }

  dynamic "subject" {
    for_each = toset([
      local.eks_developer_group,
      local.orc8r_admin_group,
    ])

    content {
      kind      = "Group"
      name      = subject.key
      api_group = "rbac.authorization.k8s.io"
    }
  }
}
