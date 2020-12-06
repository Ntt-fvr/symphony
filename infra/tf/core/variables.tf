variable "project" {
  description = "The project name for resource naming and tagging"
  type        = string
  default     = "phb"
}

variable "region" {
  description = "The region where AWS operations will take place"
  type        = map(string)

  default = {
    default = "us-east-1"
    staging = "eu-west-1"
  }
}

variable "k8s_assume_role" {
  description = "kubectl assumes EKS admin role"
  type        = bool
  default     = true
}
