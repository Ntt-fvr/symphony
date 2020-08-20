output kubernetes_namespace {
  value = kubernetes_namespace.this_namespace.id
}

output role_arn {
  value = try(
    module.this_team_iam[0].role_arn,
    data.aws_iam_role.this_team_role[0].arn,
  )
}

output subject_name {
  value = kubernetes_role_binding.this_role_binding.subject[0].name
}