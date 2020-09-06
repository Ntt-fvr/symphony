# iam role for cluster autoscaler
module cluster_autoscaler_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "ClusterAutoScalerRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.cluster_autoscaler.json
  service_account_name      = "cluster-autoscaler"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# policy required by cluster autoscaler
data aws_iam_policy_document cluster_autoscaler {
  statement {
    sid    = "ClusterAutoScalerAll"
    effect = "Allow"

    actions = [
      "autoscaling:DescribeAutoScalingGroups",
      "autoscaling:DescribeAutoScalingInstances",
      "autoscaling:DescribeLaunchConfigurations",
      "autoscaling:DescribeTags",
      "ec2:DescribeLaunchTemplateVersions",
    ]

    resources = ["*"]
  }

  statement {
    sid    = "ClusterAutoScalerOwn"
    effect = "Allow"

    actions = [
      "autoscaling:SetDesiredCapacity",
      "autoscaling:TerminateInstanceInAutoScalingGroup",
      "autoscaling:UpdateAutoScalingGroup",
    ]

    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "autoscaling:ResourceTag/kubernetes.io/cluster/${module.eks.cluster_id}"
      values   = ["owned"]
    }

    condition {
      test     = "StringEquals"
      variable = "autoscaling:ResourceTag/k8s.io/cluster-autoscaler/enabled"
      values   = ["true"]
    }
  }
}

# autoscaler scales worker nodes within autoscaling groups
resource helm_release cluster_autoscaler {
  chart      = "cluster-autoscaler-chart"
  repository = local.helm_repository.autoscaler
  name       = "cluster-autoscaler-chart"
  version    = "1.0.3"
  namespace  = module.cluster_autoscaler_role.service_account_namespace

  values = [yamlencode({
    autoDiscovery = {
      clusterName = module.eks.cluster_id
    }
    awsRegion = data.aws_region.current.name
    rbac = {
      serviceAccount = {
        name = module.cluster_autoscaler_role.service_account_name
        annotations = {
          "eks.amazonaws.com/role-arn" = module.cluster_autoscaler_role.role_arn
        }
      }
    }
    serviceMonitor = {
      enabled = true
    }
  })]
}

# metrics is a cluster-wide aggregator of resource usage data
resource helm_release metrics_server {
  chart      = "metrics-server"
  repository = local.helm_repository.bitnami
  name       = "metrics-server"
  version    = "4.3.1"
  namespace  = "kube-system"

  values = [yamlencode({
    extraArgs = {
      "kubelet-preferred-address-types" = "InternalIP"
    }
  })]
}

# monitors extra attributes on nodes
resource helm_release node_problem_detector {
  chart      = "node-problem-detector"
  repository = local.helm_repository.stable
  name       = "node-problem-detector"
  namespace  = "kube-system"
  version    = "1.7.6"

  set {
    name  = "metrics.serviceMonitor.enabled"
    value = "true"
  }
}

# iam role for aws node
module aws_node_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "AWSNodeRole"
  role_path                 = local.eks_sa_role_path
  role_policy_arns          = ["arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"]
  service_account_name      = "aws-node"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# networking plugin for pod networking using ENI
resource helm_release aws_vpc_cni {
  chart      = "aws-vpc-cni"
  repository = local.helm_repository.eks
  name       = "aws-vpc-cni"
  namespace  = "kube-system"
  version    = "1.0.9"

  values = [yamlencode({
    serviceAccount = {
      name = module.aws_node_role.service_account_name
      annotations = {
        "eks.amazonaws.com/role-arn" = module.aws_node_role.role_arn
      }
    }
  })]
}
