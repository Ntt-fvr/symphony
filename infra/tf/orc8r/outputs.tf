output "orc8r_tag" {
  value = local.orc8r_tag
}

output "kubeconfig" {
  value = templatefile("${path.module}/templates/kubeconfig.tpl", {
    cluster_name      = format("symphony-%s", terraform.workspace)
    cluster_namespace = local.kubernetes_namespace
    eks_cluster_name  = data.aws_eks_cluster.symphony.name
    cluster_endpoint  = data.aws_eks_cluster.symphony.endpoint
    cluster_auth_data = data.aws_eks_cluster.symphony.certificate_authority.0.data
    assume_role_arn   = local.admin_role_arn
    region            = data.aws_region.current.name
  })
  sensitive = true
}
