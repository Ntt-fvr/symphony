nameOverride: prometheus-operator
alertmanager:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
    hosts:
      - alerts.${host}
    paths:
      - /
  config:
    route:
      receiver: webhook
      routes:
        - match_re:
            alertname: ^(Watchdog|CPUThrottlingHigh)$
          receiver: 'null'
    inhibit_rules:
      - source_match:
          severity: 'critical'
        target_match:
          severity: 'warning'
        equal: ['alertname', 'environment', 'service']
    receivers:
      - name: 'null'
      - name: webhook
        webhook_configs:
          - url: https://graph.facebook.com/mandoline/prometheus?namespace=symphony&oncall=symphony_tlv
            http_config:
              bearer_token: ${access_token}
  alertmanagerSpec:
    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: efs
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 5Gi
grafana:
  serviceAccount:
    name: ${grafana_sa_name}
    annotations:
      eks.amazonaws.com/role-arn: ${grafana_rolearn}
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
    hosts:
      - grafana.${host}
    path: /
  dashboards:
    default:
      ${indent(6, chomp(yamlencode(grafana_dashboards)))}
  dashboardProviders:
    dashboardproviders.yaml:
      apiVersion: 1
      providers:
        - name: 'default'
          orgId: 1
          folder: ''
          type: file
          disableDeletion: true
          editable: false
          options:
            path: /var/lib/grafana/dashboards/default
  grafana.ini:
    users:
      viewers_can_edit: false
    auth:
      disable_login_form: false
      disable_signout_menu: false
    auth.anonymous:
      enabled: true
      org_role: Viewer
  persistence:
    enabled: true
    storageClassName: efs
  sidecar:
    dashboards:
      searchNamespace: ALL
  additionalDataSources:
    - name: CloudWatch
      type: cloudwatch
      jsonData:
        authType: credentials
        defaultRegion: ${region}
prometheus:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
    hosts:
      - prom.${host}
    paths:
      - /
  prometheusSpec:
    retention: 90d
    externalLabels:
      environment: ${env}
    prometheusExternalLabelNameClear: true
    ruleSelectorNilUsesHelmValues: false
    serviceMonitorSelectorNilUsesHelmValues: false
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: efs
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 50Gi
    additionalAlertRelabelConfigs:
      - source_labels: [severity]
        target_label: severity
        regex: critical
        replacement: major
prometheusOperator:
  cleanupCustomResource: true
kubeControllerManager:
  enabled: false
kubeScheduler:
  enabled: false
kubeProxy:
  enabled: false
