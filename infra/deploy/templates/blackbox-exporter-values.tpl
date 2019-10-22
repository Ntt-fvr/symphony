secretConfig: true
config:
  modules:
    http_2xx:
      prober: http
      timeout: 5s
      http:
        valid_http_versions: ["HTTP/1.1", "HTTP/2"]
        no_follow_redirects: false
        preferred_ip_protocol: ip4
    http_circleci:
      prober: http
      timeout: 10s
      http:
        fail_if_body_not_matches_regexp:
          - '"items":\[{[^}]*"status":"success"'
        headers:
          Circle-Token: ${circleci_token}
          Accept: application/json
        no_follow_redirects: false
        fail_if_not_ssl: true
        preferred_ip_protocol: ip4
serviceMonitor:
  enabled: true
  targets:
    - name: symphony-deploy
      url: https://circleci.com/api/v2/insights/gh/facebookincubator/symphony/workflows/deploy?branch=master
      module: http_circleci
prometheusRule:
  enabled: true
  rules:
    - alert: SymphonyDeployFailed
      expr: probe_success{target="symphony-deploy"} == 0
      for: 40m
      labels:
        severity: error
      annotations:
        description: Symphony deployment failed to complete.
        summary: Symphony deployment failed.
