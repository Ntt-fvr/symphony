# prometheus is a monitoring system and time series database
resource helm_release prometheus_operator {
  name       = "prometheus-operator"
  namespace  = "monitoring"
  repository = local.helm_repository.prometheus-community
  chart      = "kube-prometheus-stack"
  version    = "9.4.5"

  values = [templatefile("${path.module}/templates/prometheus-operator-values.tpl", {
    region             = data.aws_region.current.id
    host               = local.domains.symphony.intern_name
    env                = local.environment
    access_token       = data.sops_file.secrets.data["alertmanager.mandoline.access_token"]
    grafana_sa_name    = module.grafana_role.service_account_name
    grafana_rolearn    = module.grafana_role.role_arn
    grafana_dashboards = local.grafana_dashboards
  })]

  set_sensitive {
    name  = "grafana.adminPassword"
    value = random_string.grafana_admin_password.result
  }

  depends_on = [helm_release.efs_provisioner]
}

# publicly available grafana dashboards
# https://grafana.com/grafana/dashboards/<gnetId>
locals {
  aws_dashboards = {
    for d in [
      { name = "s3", id = 575, rev = 6 },
      { name = "ec2", id = 617, rev = 4 },
      { name = "elb", id = 644, rev = 4 },
      { name = "alb", id = 650, rev = 8 },
      { name = "efs", id = 653, rev = 4 },
      { name = "rds", id = 707, rev = 4 },
    ] :
    format("aws-%s", d.name) => {
      gnetId     = d.id,
      revision   = d.rev,
      datasource = "CloudWatch"
    }
  }

  misc_dashboards = {
    for d in [
      { name = "go-processes", id = 6671, rev = 2 },
      { name = "nginx-ingress", id = 9789, rev = 5 },
      { name = "nats-server", id = 2279, rev = 1 },
      { name = "cadence-frontend", id = 10373, rev = 1 },
    ] :
    d.name => {
      gnetId     = d.id,
      revision   = d.rev,
      datasource = "Prometheus"
    }
  }

  grafana_dashboards = merge(
    local.aws_dashboards,
    local.misc_dashboards,
  )
}

# random password generator for grafana
resource random_string grafana_admin_password {
  length  = 10
  special = false
}

# iam role for grafana
module grafana_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "GrafanaRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.grafana.json
  service_account_name      = "prometheus-operator-grafana"
  service_account_namespace = "monitoring"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# policy required by grafana cloudwatch datasource
data aws_iam_policy_document grafana {
  statement {
    sid = "AllowReadingMetricsFromCloudWatch"

    actions = [
      "cloudwatch:DescribeAlarmsForMetric",
      "cloudwatch:ListMetrics",
      "cloudwatch:GetMetricStatistics",
      "cloudwatch:GetMetricData",
    ]

    resources = ["*"]
  }

  statement {
    sid = "AllowReadingTagsInstancesRegionsFromEC2"

    actions = [
      "ec2:DescribeTags",
      "ec2:DescribeInstances",
      "ec2:DescribeRegions",
    ]

    resources = ["*"]
  }

  statement {
    sid = "AllowReadingResourcesForTags"

    actions = [
      "tag:GetResources",
    ]

    resources = ["*"]
  }
}

# The blackbox exporter allows blackbox probing of endpoints
# over HTTP, HTTPS, DNS, TCP and ICMP.
resource helm_release blackbox_exporter {
  name       = "prometheus-blackbox-exporter"
  repository = local.helm_repository.prometheus-community
  chart      = "prometheus-blackbox-exporter"
  version    = "4.6.0"
  namespace  = "monitoring"

  values = [templatefile("${path.module}/templates/blackbox-exporter-values.tpl", {
    circleci_token = data.sops_file.secrets.data["circleci.token"]
  })]

  depends_on = [helm_release.prometheus_operator]
}
