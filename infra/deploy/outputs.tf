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
    fluentd_http_service = format("%s-http.%s.svc.cluster.local:9880",
      helm_release.fluentd_elasticsearch.name,
      helm_release.fluentd_elasticsearch.namespace,
    )
    nats_server_url = format("nats://%s-client.%s.svc.cluster.local",
      helm_release.nats.name, helm_release.nats.namespace,
    )
  }
  sensitive = true
}
