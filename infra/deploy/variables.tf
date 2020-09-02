variable project {
  description = "The project name for resource naming and tagging"
  type        = string
  default     = "phb"
}

variable region {
  description = "The region where AWS operations will take place"
  type        = map(string)

  default = {
    default = "us-east-1"
    staging = "eu-west-1"
  }
}

variable k8s_assume_role {
  description = "kubectl assumes EKS admin role"
  type        = bool
  default     = true
}

variable deployer_name {
  description = "The service deployer AWS IAM user name"
  type        = string
  default     = "circleci-bot"
}

variable inventory_tag {
  description = "Inventory application image tag"
  type        = string
  default     = ""
}
