imagePullSecrets:
  - name: ${image_pull_secret}

secrets:
  create: false
secret:
  certs: ${certs_secret}
  configs:
    orc8r: ${configs_secret}
    cwf: ${configs_secret}
  envdir: ${envdir_secret}

nginx:
  create: ${create_nginx}

  podDisruptionBudget:
    enabled: true
  image:
    repository: ${docker_registry}/nginx
    tag: "${docker_tag}"
  replicas: ${nginx_replicas}
  service:
    enabled: true
    legacyEnabled: true
    extraAnnotations:
      proxy:
        external-dns.alpha.kubernetes.io/hostname: ${api_hostname}
      bootstrapLagacy:
        external-dns.alpha.kubernetes.io/hostname: bootstrapper-${controller_hostname}
      clientcertLegacy:
        external-dns.alpha.kubernetes.io/hostname: ${controller_hostname}
    name: orc8r-bootstrap-nginx
    type: LoadBalancer
  spec:
    hostname: ${controller_hostname}

controller:
  podDisruptionBudget:
    enabled: true
  image:
    repository: ${docker_registry}/controller
    tag: "${docker_tag}"
  replicas: ${controller_replicas}
  spec:
    database:
      db: ${controller_db_name}
      host: ${controller_db_host}
      port: ${controller_db_port}
      user: ${controller_db_user}
  migration:
    new_handlers: 1
    new_mconfigs: 1
  podAnnotations:
    iam.amazonaws.com/role: ${controller_iam_role_arn}

metrics:
  imagePullSecrets:
    - name: ${image_pull_secret}
  metrics:
    volumes:
      prometheusData:
        volumeSpec:
          persistentVolumeClaim:
            claimName: ${metrics_pvc_promdata}
      prometheusConfig:
        volumeSpec:
          persistentVolumeClaim:
            claimName: ${metrics_pvc_promcfg}
  prometheus:
    create: true
    includeOrc8rAlerts: true
  alertmanager:
    create: true
  prometheusConfigurer:
    create: true
    image:
      repository: ${docker_registry}/prometheus-configurer
      tag: "${docker_tag}"
  alertmanagerConfigurer:
    create: true
    image:
      repository: ${docker_registry}/alertmanager-configurer
      tag: "${docker_tag}"
  prometheusCache:
    create: true
    image:
      repository: docker.io/facebookincubator/prometheus-edge-hub
      tag: 1.0.0
    limit: 500000
  grafana:
    create: false
  userGrafana:
    create: ${create_usergrafana}
    image:
      repository: docker.io/grafana/grafana
      tag: 6.6.2
    volumes:
      datasources:
        persistentVolumeClaim:
          claimName: ${grafana_pvc_grafanaDatasources}
      dashboardproviders:
        persistentVolumeClaim:
          claimName: ${grafana_pvc_grafanaProviders}
      dashboards:
        persistentVolumeClaim:
          claimName: ${grafana_pvc_grafanaDashboards}
      grafanaData:
        persistentVolumeClaim:
          claimName: ${grafana_pvc_grafanaData}

nms:
  enabled: false
logging:
  enabled: false
