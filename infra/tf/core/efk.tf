resource "aws_security_group" "elastic_sg" {
  name_prefix = "elastic-cluster"
  description = "Security group for Elasticsearch instance"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = "80"
    to_port         = "80"
    protocol        = "tcp"
    description     = "Allow ingress for HTTP traffic"
    security_groups = [module.eks.worker_security_group_id]
  }

  ingress {
    from_port       = "443"
    to_port         = "443"
    protocol        = "tcp"
    description     = "Allow ingress for HTTPS traffic"
    security_groups = [module.eks.worker_security_group_id]
  }
}

# elastic search linked role
resource "aws_iam_service_linked_role" "es" {
  aws_service_name = "es.amazonaws.com"
  count            = terraform.workspace == "default" ? 1 : 0
}

# elastic search domain
resource "aws_elasticsearch_domain" "es" {
  domain_name           = "tf-symphony-${terraform.workspace}"
  elasticsearch_version = "7.7"

  cluster_config {
    instance_type            = "m4.2xlarge.elasticsearch"
    instance_count           = 3
    dedicated_master_enabled = true
    dedicated_master_count   = 3
    dedicated_master_type    = "m4.large.elasticsearch"
    zone_awareness_enabled   = true

    zone_awareness_config {
      availability_zone_count = 3
    }
  }

  advanced_options = {
    "rest.action.multi.allow_explicit_index" = "true"
  }

  vpc_options {
    subnet_ids         = module.vpc.private_subnets
    security_group_ids = [aws_security_group.elastic_sg.id]
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 1536
    volume_type = "gp2"
  }

  snapshot_options {
    automated_snapshot_start_hour = 0
  }

  tags = local.tags

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [aws_iam_service_linked_role.es]
}

# policy allowing elastic managment access
data "aws_iam_policy_document" "es_management_access" {
  statement {
    actions = [
      "es:*",
    ]

    resources = [
      "${aws_elasticsearch_domain.es.arn}/*",
    ]

    principals {
      identifiers = ["*"]
      type        = "AWS"
    }
  }
}

# bind elastic managment access policy to domain
resource "aws_elasticsearch_domain_policy" "es_management_access" {
  domain_name     = aws_elasticsearch_domain.es.domain_name
  access_policies = data.aws_iam_policy_document.es_management_access.json
}

# k8s namespace for logging resources
resource "kubernetes_namespace" "kube_logging" {
  metadata {
    name = "kube-logging"
  }
}

# helm chart for cleanning old indices.
resource "helm_release" "elasticsearch_curator" {
  name       = "elasticsearch-curator"
  repository = local.helm_repository.stable
  chart      = "elasticsearch-curator"
  namespace  = kubernetes_namespace.kube_logging.id
  version    = "2.2.1"

  values = [yamlencode({
    configMaps = {
      config_yml = yamlencode({
        client = {
          hosts = [aws_elasticsearch_domain.es.endpoint]
          port  = 80
        }
      })
    }
  })]
}

# external service for elastic
resource "kubernetes_service" "elastic" {
  metadata {
    name      = "elastic"
    namespace = kubernetes_namespace.kube_logging.id
  }

  spec {
    type          = "ExternalName"
    external_name = aws_elasticsearch_domain.es.endpoint
  }
}

# provide intern kibana access
resource "kubernetes_ingress" "kibana" {
  metadata {
    name      = "kibana"
    namespace = kubernetes_namespace.kube_logging.id

    annotations = {
      "kubernetes.io/ingress.class" = "nginx"
    }
  }

  spec {
    rule {
      host = format("logs.%s", local.domains.symphony.intern_name)
      http {
        path {
          path = "/_plugin/kibana"
          backend {
            service_name = "elastic"
            service_port = "80"
          }
        }
      }
    }
  }
}

# redirect root to kibana plugin
resource "kubernetes_ingress" "kibana_redirect" {
  metadata {
    name      = "kibana-redirect"
    namespace = kubernetes_namespace.kube_logging.id

    annotations = {
      "kubernetes.io/ingress.class" = "nginx"
      "nginx.ingress.kubernetes.io/permanent-redirect" = format(
        "https://logs.%s/_plugin/kibana", local.domains.symphony.intern_name,
      )
    }
  }

  spec {
    rule {
      host = format("logs.%s", local.domains.symphony.intern_name)
      http {
        path {
          path = "/"
          backend {
            service_name = "elastic"
            service_port = "80"
          }
        }
      }
    }
  }
}

# fluentd charts for sending logs from the cluster to elastic.
resource "helm_release" "fluentd_elasticsearch" {
  chart      = "fluentd-elasticsearch"
  repository = local.helm_repository.kokuwa
  name       = "fluentd-elasticsearch"
  namespace  = kubernetes_namespace.kube_logging.id
  version    = "10.1.0"

  values = [yamlencode({
    elasticsearch = {
      hosts  = ["${aws_elasticsearch_domain.es.endpoint}:443"]
      scheme = "https"
      logstash = {
        prefix = "$${ns = record&.dig('kubernetes', 'namespace_name'); ns ? ns + '.namespace' : tag == 'inventory' ? 'symphony.http' : 'logstash'}"
      }
      log400Reason = true
      outputType   = "elasticsearch_dynamic"
    }
    serviceMonitor = {
      enabled = true
    }
    prometheusRule = {
      enabled = true
    }
    configMaps = {
      useDefaults = {
        forwardInputConf = false
        systemInputConf  = false
      }
    }
    extraConfigMaps = {
      for f in fileset(path.module, "fluentd/*") : basename(f) => file(f)
    }
  })]
}
