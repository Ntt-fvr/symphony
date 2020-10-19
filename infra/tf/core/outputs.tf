output grafana_admin_password {
  description = "Grafana administrator password"
  value       = random_password.grafana_admin_password.result
  sensitive   = true
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

output eks {
  description = "EKS cluster details"
  value = {
    oidc_provider_arn = module.eks.oidc_provider_arn
    sa_role_path      = local.eks_sa_role_path
    nats_server_url = format("nats://%s-client.%s.svc.cluster.local",
      helm_release.nats.name, helm_release.nats.namespace,
    )
  }
  sensitive = true
}
