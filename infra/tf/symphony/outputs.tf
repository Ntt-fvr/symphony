output storybook_tag {
  description = "Storybook tag currently deployed"
  value       = local.storybook_tag
}

output keycloak_admin {
  description = "Keycloak login credentials"
  value = {
    user     = local.keycloak_user
    password = random_password.keycloak_admin.result
  }
  sensitive = true
}
