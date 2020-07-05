# An open-source, cloud-native messaging system
resource "helm_release" "nats" {
  name             = "nats"
  namespace        = "messaging"
  create_namespace = true
  repository       = local.helm_repository.bitnami
  chart            = "nats"
  version          = "4.4.1"
  keyring          = ""

  values = [<<VALUES
  replicaCount: 3
  auth:
    enabled: false
  VALUES
  ]
}

# pod disruption budget for nats pods
resource "kubernetes_pod_disruption_budget" "nats" {
  metadata {
    name      = helm_release.nats.name
    namespace = helm_release.nats.namespace
  }

  spec {
    max_unavailable = 1
    selector {
      match_labels = {
        app     = helm_release.nats.name
        release = helm_release.nats.name
      }
    }
  }
}

# exports nats stats to prometheus
resource "helm_release" "prometheus_nats_exporter" {
  name       = "prometheus-nats-exporter"
  namespace  = helm_release.nats.namespace
  repository = local.helm_repository.stable
  chart      = "prometheus-nats-exporter"
  version    = "2.5.0"
  keyring    = ""

  values = [<<VALUES
  config:
    nats:
      service: ${helm_release.nats.name}-monitoring
      namespace: ${helm_release.nats.namespace}
  serviceMonitor:
    enabled: true
  VALUES
  ]

  depends_on = [helm_release.prometheus_operator]
}
