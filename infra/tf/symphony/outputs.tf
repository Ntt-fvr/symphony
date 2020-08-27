output storybook_tag {
  description = "Storybook tag currently deployed"
  value       = local.storybook_tag
}

output keycloak_db {
  description = "Keycloak database currently used"
  value       = local.keycloak_db
  sensitive   = true
}
