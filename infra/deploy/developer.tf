# kubernetes role binding for developers
resource kubernetes_role_binding developers {
  metadata {
    name      = "developers"
    namespace = "default"
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "edit"
    api_group = "rbac.authorization.k8s.io"
  }

  subject {
    kind      = "Group"
    name      = local.eks_developer_group
    api_group = "rbac.authorization.k8s.io"
  }
}

# aws iam role for eks developers
resource aws_iam_role eks_developer {
  name               = "EKSDeveloper"
  assume_role_policy = data.aws_iam_policy_document.root_delegate.json
  description        = "EKS cluster developer role"
  count              = terraform.workspace == "default" ? 1 : 0
}

# data ref to eks developer role
data aws_iam_role eks_developer {
  name  = "EKSDeveloper"
  count = 1 - length(aws_iam_role.eks_developer)
}

locals {
  eks_developer_role  = try(aws_iam_role.eks_developer[0], data.aws_iam_role.eks_developer[0])
  eks_developer_group = "symphony:developers"
}

# aws iam policy document granting eks developer assume role
data aws_iam_policy_document eks_developer {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    resources = [
      aws_iam_role.eks_developer[count.index].arn
    ]
  }
  count = length(aws_iam_role.eks_developer)
}

# aws iam policy for above policy document
resource aws_iam_policy eks_developer {
  name   = "EKSDeveloperRole"
  policy = data.aws_iam_policy_document.eks_developer[count.index].json
  count  = terraform.workspace == "default" ? 1 : 0
}
