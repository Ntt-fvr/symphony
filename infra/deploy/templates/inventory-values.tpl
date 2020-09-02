imagePullSecrets:
  - name: ${image_pull_secret}
ingress:
  enabled: false
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: 10m
  hosts:
    - "${host}"
  paths:
    - /
serviceMonitor:
  enabled: true
  alerting:
    rules: ${indent(6, alerting_rules)}
tracing:
  enabled: true
  jaeger:
    agentEndpoint: localhost:6831
    agentThriftEndpoint: localhost:6832
graphDB:
  mysql:
    host: ${graph_db_host}
    port: ${graph_db_port}
    user: ${graph_db_user}
    param: charset=utf8&parseTime=true&interpolateParams=true
front:
  deploymentAnnotations:
    sidecar.jaegertracing.io/inject: "true"
  podDisruptionBudget:
    enabled: true
  replicas: ${replicas}
  image:
    repository: ${docker_registry}/front
    tag: ${docker_tag}
  spec:
    proxy:
      logger: ${front_logger_host}
    mapbox:
      access_token: ${front_mapbox_token}
    mysql:
      db: ${front_db_name}
      host: ${front_db_host}
      port: ${front_db_port}
      user: ${front_db_user}
    grafana:
      address: ${grafana_address}
graph:
  deploymentAnnotations:
    sidecar.jaegertracing.io/inject: "true"
  podDisruptionBudget:
    enabled: true
  replicas: ${graph_replicas}
  image:
    repository: ${docker_registry}/graph
    tag: ${docker_tag}
  spec:
    log:
      level: debug
    tenancy:
      tenantMaxDBConn: 10
    event:
      url: nats://graph.event
    extraEnvVars:
      - name: NATS_SERVER_URL
        value: ${nats_server_url}
async:
  podDisruptionBudget:
    enabled: true
  serviceAccount:
    name: ${async_sa_name}
    annotations:
      eks.amazonaws.com/role-arn: ${async_rolearn}
  deploymentAnnotations:
    sidecar.jaegertracing.io/inject: "true"
  replicas: ${async_replicas}
  image:
    repository: ${docker_registry}/async
    tag: ${docker_tag}
  spec:
    log:
      level: debug
    tenancy:
      tenantMaxDBConn: 5
    event:
      pub_url: nats://graph.event
      sub_url: nats://graph.event?queue=async
    export:
      bucket_url: ${store_bucket_url}
      bucket_prefix: ${export_bucket_prefix}
    extraEnvVars:
      - name: NATS_SERVER_URL
        value: ${nats_server_url}
store:
  podDisruptionBudget:
    enabled: true
  serviceAccount:
    name: ${store_sa_name}
    annotations:
      eks.amazonaws.com/role-arn: ${store_rolearn}
  deploymentAnnotations:
    sidecar.jaegertracing.io/inject: "true"
  replicas: ${replicas}
  image:
    repository: ${docker_registry}/store
    tag: ${docker_tag}
  spec:
    log:
      level: debug
    bucket:
      url: ${store_bucket_url}
docs:
  image:
    repository: ${docker_registry}/docs
    tag: ${docker_tag}
integrations:
  orc8r:
    enabled: true
    host: ${orc8r_host}
jobrunner:
  image:
    repository: ${docker_registry}/jobrunner
    tag: ${docker_tag}
