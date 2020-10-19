resource helm_release log_forwarder {
  name       = "log-forwarder"
  namespace  = kubernetes_namespace.symphony.id
  repository = local.helm_repository.bitnami
  chart      = "fluentd"
  version    = "2.4.0"

  values = [yamlencode({
    nameOverride = "log-forwarder"
    aggregator = {
      configFile = "log-forwarder.conf"
      configMap  = kubernetes_config_map.log_forwarder.metadata.0.name
    }
    forwarder = {
      enabled = false
    }
    metrics = {
      enabled = true
      serviceMonitor = {
        enabled = true
      }
    }
  })]
}

resource kubernetes_config_map log_forwarder {
  metadata {
    name      = "log-forwarder"
    namespace = kubernetes_namespace.symphony.id
  }

  data = {
    "log-forwarder.conf" = file("${path.module}/files/log-forwarder.conf")
  }
}
