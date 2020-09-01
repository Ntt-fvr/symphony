locals {
  symphony_name      = "symphony"
  store_exports_path = "exports/"
}

module store_role {
  source                    = "./../modules/irsa"
  role_name_prefix          = "SymphonyStoreRole"
  role_path                 = data.terraform_remote_state.core.outputs.eks.sa_role_path
  role_policy               = data.aws_iam_policy_document.store.json
  service_account_name      = "${local.symphony_name}-store"
  service_account_namespace = kubernetes_namespace.symphony.id
  oidc_provider_arn         = data.terraform_remote_state.core.outputs.eks.oidc_provider_arn
  tags                      = local.tags
}

data aws_iam_policy_document store {
  statement {
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
    ]

    resources = [
      "${aws_s3_bucket.store.arn}/*",
    ]
  }
}

module async_role {
  source                    = "./../modules/irsa"
  role_name_prefix          = "SymphonyAsyncRole"
  role_path                 = data.terraform_remote_state.core.outputs.eks.sa_role_path
  role_policy               = data.aws_iam_policy_document.async.json
  service_account_name      = "${local.symphony_name}-async"
  service_account_namespace = kubernetes_namespace.symphony.id
  oidc_provider_arn         = data.terraform_remote_state.core.outputs.eks.oidc_provider_arn
  tags                      = local.tags
}

data aws_iam_policy_document async {
  statement {
    actions = [
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.store.arn}/${local.store_exports_path}/*",
    ]
  }
}

