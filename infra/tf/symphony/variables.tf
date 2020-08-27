variable "storybook_tag" {
  type        = string
  description = "Storybook application image tag"
  default     = null
}

variable "keycloak_db" {
  type = object({
    vendor   = string
    host     = string
    port     = number
    user     = string
    password = string
  })
  description = "Keycloak database"
  default     = null
}
