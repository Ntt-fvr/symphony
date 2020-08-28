output kubeconfig {
  description = "kubectl config file contents for this EKS cluster."
  value = templatefile("${path.module}/templates/kubeconfig.tpl", {
    cluster_name      = "symphony-${local.environment}"
    cluster_namespace = "default"
    eks_cluster_name  = local.eks_cluster_name
    cluster_endpoint  = module.eks.cluster_endpoint
    cluster_auth_data = module.eks.cluster_certificate_authority_data
    assume_role_arn   = local.eks_developer_role.arn
    region            = data.aws_region.current.name
  })
  sensitive = true
}

output grafana_admin_password {
  description = "Grafana administrator password"
  value       = random_string.grafana_admin_password.result
  sensitive   = true
}

output inventory_tag {
  description = "Inventory tag currently deployed"
  value       = local.inventory_tag
}

output storybook_tag {
  description = "Storybook tag currently deployed"
  value       = local.storybook_tag
}

output database {
  description = "Database subnets and security groups"
  value = {
    subnets      = module.vpc.database_subnets
    subnet_group = module.vpc.database_subnet_group
    security_group_ids = {
      for k, v in aws_security_group.eks_rds : k => v.id
    }
  }
  sensitive = true
}
