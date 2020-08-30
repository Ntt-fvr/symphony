variable "storybook_tag" {
  type        = string
  description = "Storybook application image tag"
  default     = null
}

variable artifactory {
  description = "Artifactory urls and credentials"
  type = object({
    docker_registry = string
    helm_repository = string
    username        = string
    password        = string
    email           = string
  })
  default = null
}
