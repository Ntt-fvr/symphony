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
  elasticsearch_version = "7.4"

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

# helm chart for cleanning old indices.
resource "helm_release" "elasticsearch_curator" {
  name       = "elasticsearch-curator"
  repository = local.helm_repository.stable
  chart      = "elasticsearch-curator"
  namespace  = "monitoring"
  version    = "2.1.5"
  keyring    = ""

  values = [<<EOT
  configMaps:
    config_yml: |-
      ---
      client:
        hosts:
          - ${aws_elasticsearch_domain.es.endpoint}
        port: 80
  EOT
  ]
}

# external service for elastic
resource "kubernetes_service" "elastic" {
  metadata {
    name      = "elastic"
    namespace = "monitoring"
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
    namespace = "monitoring"

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
    namespace = "monitoring"

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
  repository = local.helm_repository.kiwigrid
  name       = "fluentd-elasticsearch"
  namespace  = "monitoring"
  version    = "9.4.2"
  keyring    = ""

  values = [<<EOT
  elasticsearch:
    hosts:
      - ${aws_elasticsearch_domain.es.endpoint}:443
    scheme: https
  service:
    ports:
      - name: http
        type: ClusterIP
        port: 9880
  livenessProbe:
    kind:
      httpGet:
        path: /fluentd.pod.healthcheck?json=%7B%22log%22%3A+%22health+check%22%7D
        port: 9880
      exec: null
    initialDelaySeconds: 5
    periodSeconds: 30
  serviceMonitor:
    enabled: true
  prometheusRule:
    enabled: true
  configMaps:
    useDefaults:
      forwardInputConf: false
  extraConfigMaps:
    http.input.conf: |-
      <source>
        @id http
        @type http
        body_size_limit 2m
        add_http_headers true
      </source>
    inventory.filter.conf: |-
      <filter inventory>
        @id filter_prometheus
        @type prometheus
        <metric>
          name inventory_client_events_total
          type counter
          desc The total number of incoming client events
          <labels>
            event $${event}
            tenant $${tenant}
            user $${email}
          </labels>
        </metric>
      </filter>
    orc8r.filter.conf: |-
      <filter kubernetes.**orc8r-proxy**>
        @id filter_orc8r_proxy
        @type parser
        key_name message
        reserve_data true
        remove_key_name_field true
        <parse>
          @type multi_format
          <pattern>
            format regexp
            expression /^(?<time>.*)@\|@(?<remote_addr>.*)@\|@(?<http_host>.*)@\|@(?<server_port>.*)@\|@(?<request>.*)@\|@(?<status>.*)@\|@(?<body_bytes_sent>.*)@\|@(?<request_time>.*)@\|@(?<alpn>.*)@\|@(?<tls_client_serial>.*)@\|@(?<tls_client_subject_name>.*)@\|@(?<tls_session_reused>.*)@\|@(?<tls_sni>.*)@\|@(?<tls_protocol>.*)@\|@(?<tls_cipher>.*)@\|@(?<backend_host>.*)@\|@(?<backend_port>.*)$/
            time_format %iso8601
          </pattern>
          <pattern>
            format none
          </pattern>
        </parse>
      </filter>

      <filter kubernetes.**orc8r-nginx**>
        @id filter_orc8r_nginx
        @type parser
        key_name message
        reserve_data true
        remove_key_name_field true
        <parse>
          @type multi_format
          <pattern>
            format json
          </pattern>
          <pattern>
            format none
          </pattern>
        </parse>
      </filter>
  EOT
  ]
}
