locals {
  orc8r_tag = var.orc8r_tag == "" ? data.terraform_remote_state.current.outputs.orc8r_tag : var.orc8r_tag
  orc8r_db  = jsondecode(data.aws_secretsmanager_secret_version.orc8r_db.secret_string)

  artifactory_helm_url      = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["helm_repository"]
  artifactory_helm_username = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["username"]
  artifactory_helm_password = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["password"]
}

resource "helm_release" "orc8r" {
  name                = "orc8r"
  namespace           = local.kubernetes_namespace
  repository          = local.artifactory_helm_url
  repository_username = local.artifactory_helm_username
  repository_password = local.artifactory_helm_password
  chart               = "orc8r"
  version             = local.env[terraform.workspace].chart_version
  keyring             = ""
  max_history         = 100
  timeout             = 600

  values = [templatefile("${path.module}/templates/orc8r-config.tpl", {
    image_pull_secret = kubernetes_secret.artifactory.metadata[0].name
    docker_registry   = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["docker_registry"]
    docker_tag        = local.orc8r_tag

    certs_secret   = kubernetes_secret.orc8r["certs"].metadata.0.name
    configs_secret = kubernetes_secret.orc8r["configs"].metadata.0.name
    envdir_secret  = kubernetes_secret.orc8r["envdir"].metadata.0.name

    controller_replicas = 2
    proxy_replicas      = 0

    controller_hostname = format(
      "controller%s.%s",
      terraform.workspace != "production" ? format("-%s", terraform.workspace) : "",
      local.domain_name,
    )
    api_hostname = format(
      "api%s.%s",
      terraform.workspace != "production" ? format("-%s", terraform.workspace) : "",
      local.domain_name,
    )
    graph_proxy_hostname = format(
      "graph-proxy%s.%s",
      terraform.workspace != "production" ? format("-%s", terraform.workspace) : "",
      local.domain_name,
    )

    controller_db_name = local.orc8r_db["dbname"]
    controller_db_host = local.orc8r_db["dbhost"]
    controller_db_port = local.orc8r_db["dbport"]
    controller_db_user = local.orc8r_db["dbuser"]

    metrics_pvc_promcfg  = kubernetes_persistent_volume_claim.storage["promcfg"].metadata.0.name
    metrics_pvc_promdata = kubernetes_persistent_volume_claim.storage["promdata"].metadata.0.name

    controller_iam_role_arn = local.controller_role_arn

    create_usergrafana             = "true"
    grafana_pvc_grafanaData        = kubernetes_persistent_volume_claim.storage["grafanadata"].metadata.0.name
    grafana_pvc_grafanaDatasources = kubernetes_persistent_volume_claim.storage["grafanadatasources"].metadata.0.name
    grafana_pvc_grafanaProviders   = kubernetes_persistent_volume_claim.storage["grafanaproviders"].metadata.0.name
    grafana_pvc_grafanaDashboards  = kubernetes_persistent_volume_claim.storage["grafanadashboards"].metadata.0.name

    create_nginx   = local.env[terraform.workspace].use_nginx_proxy
    nginx_replicas = 2
  })]

  set_sensitive {
    name  = "controller.spec.database.pass"
    value = local.orc8r_db["dbpass"]
  }

  lifecycle {
    prevent_destroy = true
  }
}
