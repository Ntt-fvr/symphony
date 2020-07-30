# create iam user for deployer
resource aws_iam_user deployer {
  name  = var.deployer_name
  count = terraform.workspace == "default" ? 1 : 0
}

# service deployer iam policy
data aws_iam_policy_document deployer {
  # provide secret read access to allow injection
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
    ]

    resources = [
      data.aws_secretsmanager_secret.artifactory.arn,
      data.aws_secretsmanager_secret.mapbox.arn,
      data.aws_secretsmanager_secret.apps.arn,
      data.aws_secretsmanager_secret.alertmanager.arn,
      data.aws_secretsmanager_secret.circleci.arn,
      data.aws_secretsmanager_secret.cidrs.arn,
    ]
  }

  # provide list on deployment bucket
  statement {
    actions = [
      "s3:ListBucket",
    ]

    resources = [
      data.aws_s3_bucket.deployment.arn,
    ]
  }

  # provide read to any object
  statement {
    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${data.aws_s3_bucket.deployment.arn}/*",
    ]
  }

  # provide write to tfstate
  statement {
    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${data.aws_s3_bucket.deployment.arn}/terraform/*"
    ]
  }

  # provide state lock access
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
    ]

    resources = [
      data.aws_dynamodb_table.lock.arn,
    ]
  }
}

# attach deployer user policy
resource aws_iam_user_policy deployer {
  policy = data.aws_iam_policy_document.deployer.json
  user   = aws_iam_user.deployer[count.index].name
  count  = terraform.workspace == "default" ? 1 : 0
}

# attach deployer read only policy
resource aws_iam_user_policy_attachment deployer_read_only {
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
  user       = aws_iam_user.deployer[count.index].name
  count      = terraform.workspace == "default" ? 1 : 0
}

# reference deployer user
data aws_iam_user deployer {
  user_name = var.deployer_name
}

# attach deployer eks admin policy
resource aws_iam_user_policy_attachment deployer_eks_admin {
  policy_arn = aws_iam_policy.eks_admin.arn
  user       = data.aws_iam_user.deployer.user_name
  count      = contains(["default", "staging"], terraform.workspace) ? 1 : 0
}
