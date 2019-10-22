# Openvpn server for baremetal CI workloads, only deployed in staging
resource "helm_release" "ovpn" {
  count = terraform.workspace == "production" ? 0 : 1

  chart      = "openvpn"
  name       = "openvpn"
  namespace  = local.kubernetes_namespace
  repository = local.stable_helm_repo

  # TCP ovpn because ELB does not support UDP
  values = [<<EOT
  openvpn:
    OVPN_K8S_POD_NETWORK: null
    OVPN_K8S_POD_SUBNET: null
    OVPN_PROTO: tcp
    redirectGateway: false
    serverConf: |-
      client-to-client
      duplicate-cn
    ccd:
      enabled: true
      config:
        ci_node_1: "ifconfig-push 10.240.0.5 10.240.0.6"
        ci_node_2: "ifconfig-push 10.240.0.9 10.240.100.10"
        ci_node_3: "ifconfig-push 10.240.0.13 10.240.100.14"
        ci_node_4: "ifconfig-push 10.240.0.17 10.240.100.18"
        ci_node_5: "ifconfig-push 10.240.0.21 10.240.100.22"
        ci_node_6: "ifconfig-push 10.240.0.25 10.240.100.26"
        ci_node_7: "ifconfig-push 10.240.0.29 10.240.100.30"
        ci_node_8: "ifconfig-push 10.240.0.33 10.240.100.34"
        ci_node_9: "ifconfig-push 10.240.0.37 10.240.100.38"
        ci_node_10: "ifconfig-push 10.240.0.41 10.240.100.42"
        ci_node_11: "ifconfig-push 10.240.0.45 10.240.100.46"
        ci_node_12: "ifconfig-push 10.240.0.49 10.240.100.50"
        ci_node_13: "ifconfig-push 10.240.0.53 10.240.100.54"
        ci_node_14: "ifconfig-push 10.240.0.57 10.240.100.58"
        ci_node_15: "ifconfig-push 10.240.0.61 10.240.100.62"
        ci_node_16: "ifconfig-push 10.240.0.65 10.240.100.66"
  service:
    annotations:
      external-dns.alpha.kubernetes.io/hostname: vpn-staging.${local.domain_name}
  persistence:
    existingClaim: ${kubernetes_persistent_volume_claim.storage["openvpn"].metadata.0.name}
  EOT
  ]

  # Cert creation can take some time
  timeout = 900
}
