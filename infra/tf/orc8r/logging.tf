locals {
  fluentd_replica_count = terraform.workspace == "production" ? 4 : 2
}

resource "helm_release" "fluentd" {
  name       = "fluentd"
  namespace  = local.kubernetes_namespace
  repository = local.stable_helm_repo
  chart      = "fluentd"
  version    = "2.4.0"
  keyring    = ""

  values = [<<EOT
  replicaCount: ${local.fluentd_replica_count}
  output:
    host: ${data.aws_elasticsearch_domain.es.endpoint}
    port: 443
    scheme: https
  rbac:
    create: false
  service:
    annotations:
      service.beta.kubernetes.io/aws-load-balancer-type: nlb
      service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
      service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
      external-dns.alpha.kubernetes.io/hostname: ${local.fluentd_hostname}
    type: LoadBalancer
    ports:
      - name: "forward"
        protocol: TCP
        containerPort: 24224
  configMaps:
    forward-input.conf: |-
      <source>
        @type forward
        port 24224
        bind 0.0.0.0
        <transport tls>
          ca_path /certs/certifier.pem
          cert_path /certs/fluentd.pem
          private_key_path /certs/fluentd.key
          client_cert_auth true
        </transport>
      </source>
    output.conf: |-
      <match eventd>
        @id eventd_elasticsearch
        @type elasticsearch
        @log_level info
        include_tag_key true
        host "#{ENV['OUTPUT_HOST']}"
        port "#{ENV['OUTPUT_PORT']}"
        scheme "#{ENV['OUTPUT_SCHEME']}"
        ssl_version "#{ENV['OUTPUT_SSL_VERSION']}"
        logstash_format true
        logstash_prefix "eventd"
        reconnect_on_error true
        reload_on_failure true
        reload_connections false
        log_es_400_reason true
        <buffer>
          @type file
          path /var/log/fluentd-buffers/eventd.kubernetes.system.buffer
          flush_mode interval
          retry_type exponential_backoff
          flush_thread_count 2
          flush_interval 5s
          retry_forever
          retry_max_interval 30
          chunk_limit_size "#{ENV['OUTPUT_BUFFER_CHUNK_LIMIT']}"
          queue_limit_length "#{ENV['OUTPUT_BUFFER_QUEUE_LIMIT']}"
          overflow_action block
        </buffer>
      </match>
      <match **>
        @id elasticsearch
        @type elasticsearch
        @log_level info
        include_tag_key true
        host "#{ENV['OUTPUT_HOST']}"
        port "#{ENV['OUTPUT_PORT']}"
        scheme "#{ENV['OUTPUT_SCHEME']}"
        ssl_version "#{ENV['OUTPUT_SSL_VERSION']}"
        logstash_format true
        logstash_prefix "magma"
        reconnect_on_error true
        reload_on_failure true
        reload_connections false
        log_es_400_reason true
        <buffer>
          @type file
          path /var/log/fluentd-buffers/kubernetes.system.buffer
          flush_mode interval
          retry_type exponential_backoff
          flush_thread_count 2
          flush_interval 5s
          retry_forever
          retry_max_interval 30
          chunk_limit_size "#{ENV['OUTPUT_BUFFER_CHUNK_LIMIT']}"
          queue_limit_length "#{ENV['OUTPUT_BUFFER_QUEUE_LIMIT']}"
          overflow_action block
        </buffer>
      </match>
  extraVolumes:
    - name: certs
      secret:
        defaultMode: 420
        secretName: ${kubernetes_secret.fluentd_certs.metadata.0.name}
  extraVolumeMounts:
    - name: certs
      mountPath: /certs
      readOnly: true
  EOT
  ]
}

locals {
  fluentd_hostname = format("fluentd%s.%s", terraform.workspace != "production" ? format("-%s", terraform.workspace) : "", local.domain_name)
}

data "aws_elasticsearch_domain" "es" {
  domain_name = local.env[terraform.workspace].es_domain
}

data "aws_s3_bucket_objects" "fluentd_certs" {
  bucket   = data.aws_s3_bucket.deployment.bucket
  prefix   = "fluentd/certs/"
  provider = aws.us-east-1
}

data "aws_s3_bucket_object" "fluentd_certs" {
  for_each = toset(data.aws_s3_bucket_objects.fluentd_certs.keys)
  bucket   = data.aws_s3_bucket_objects.fluentd_certs.bucket
  key      = each.key
  provider = aws.us-east-1
}

resource "kubernetes_secret" "fluentd_certs" {
  metadata {
    name      = "fluentd-certs"
    namespace = local.kubernetes_namespace
  }

  data = { for e in data.aws_s3_bucket_object.fluentd_certs : basename(e.key) => e.body }
}
