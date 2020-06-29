# jaeger is an end-to-end distributed tracing system
resource "helm_release" "jaeger_operator" {
  chart      = "jaeger-operator"
  repository = local.helm_repository.jaegertracing
  name       = "jaeger-operator"
  namespace  = "observability"
  version    = "2.15.1"
  keyring    = ""

  values = [<<EOT
  jaeger:
    create: true
    spec:
      strategy: production
      ingress:
        annotations:
          kubernetes.io/ingress.class: nginx
        hosts:
          - traces.${local.domains.symphony.intern_name}
      storage:
        type: elasticsearch
        dependencies:
          enabled: false
        options:
          es:
            server-urls: https://${aws_elasticsearch_domain.es.endpoint}:443
  rbac:
    clusterRole: true
  EOT
  ]
}
