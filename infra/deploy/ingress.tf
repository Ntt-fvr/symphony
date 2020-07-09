# iam role for alb ingress controller
module "alb_ingress_controller_role" {
  source                    = "./modules/irsa"
  role_name_prefix          = "ALBIngressControllerRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.alb_ingress_controller.json
  service_account_name      = "aws-alb-ingress-controller"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# policy required by alb ingress controller
data "aws_iam_policy_document" "alb_ingress_controller" {
  statement {
    actions = [
      "acm:DescribeCertificate",
      "acm:ListCertificates",
      "acm:GetCertificate",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "ec2:AuthorizeSecurityGroupIngress",
      "ec2:CreateSecurityGroup",
      "ec2:CreateTags",
      "ec2:DeleteTags",
      "ec2:DeleteSecurityGroup",
      "ec2:DescribeAccountAttributes",
      "ec2:DescribeAddresses",
      "ec2:DescribeInstances",
      "ec2:DescribeInstanceStatus",
      "ec2:DescribeInternetGateways",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeSubnets",
      "ec2:DescribeTags",
      "ec2:DescribeVpcs",
      "ec2:ModifyInstanceAttribute",
      "ec2:ModifyNetworkInterfaceAttribute",
      "ec2:RevokeSecurityGroupIngress",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "elasticloadbalancing:AddListenerCertificates",
      "elasticloadbalancing:AddTags",
      "elasticloadbalancing:CreateListener",
      "elasticloadbalancing:CreateLoadBalancer",
      "elasticloadbalancing:CreateRule",
      "elasticloadbalancing:CreateTargetGroup",
      "elasticloadbalancing:DeleteListener",
      "elasticloadbalancing:DeleteLoadBalancer",
      "elasticloadbalancing:DeleteRule",
      "elasticloadbalancing:DeleteTargetGroup",
      "elasticloadbalancing:DeregisterTargets",
      "elasticloadbalancing:DescribeListenerCertificates",
      "elasticloadbalancing:DescribeListeners",
      "elasticloadbalancing:DescribeLoadBalancers",
      "elasticloadbalancing:DescribeLoadBalancerAttributes",
      "elasticloadbalancing:DescribeRules",
      "elasticloadbalancing:DescribeSSLPolicies",
      "elasticloadbalancing:DescribeTags",
      "elasticloadbalancing:DescribeTargetGroups",
      "elasticloadbalancing:DescribeTargetGroupAttributes",
      "elasticloadbalancing:DescribeTargetHealth",
      "elasticloadbalancing:ModifyListener",
      "elasticloadbalancing:ModifyLoadBalancerAttributes",
      "elasticloadbalancing:ModifyRule",
      "elasticloadbalancing:ModifyTargetGroup",
      "elasticloadbalancing:ModifyTargetGroupAttributes",
      "elasticloadbalancing:RegisterTargets",
      "elasticloadbalancing:RemoveListenerCertificates",
      "elasticloadbalancing:RemoveTags",
      "elasticloadbalancing:SetIpAddressType",
      "elasticloadbalancing:SetSecurityGroups",
      "elasticloadbalancing:SetSubnets",
      "elasticloadbalancing:SetWebACL",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "iam:CreateServiceLinkedRole",
      "iam:GetServerCertificate",
      "iam:ListServerCertificates",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "cognito-idp:DescribeUserPoolClient",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "waf-regional:GetWebACLForResource",
      "waf-regional:GetWebACL",
      "waf-regional:AssociateWebACL",
      "waf-regional:DisassociateWebACL",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "tag:GetResources",
      "tag:TagResources",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "waf:GetWebACL",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "wafv2:GetWebACL",
      "wafv2:GetWebACLForResource",
      "wafv2:AssociateWebACL",
      "wafv2:DisassociateWebACL",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "shield:DescribeProtection",
      "shield:GetSubscriptionState",
      "shield:DeleteProtection",
      "shield:CreateProtection",
      "shield:DescribeSubscription",
      "shield:ListProtections",
    ]

    resources = ["*"]
  }
}

# alb ingress controller exposes ingress resources
resource "helm_release" "alb_ingress_controller" {
  chart      = "aws-alb-ingress-controller"
  name       = module.alb_ingress_controller_role.service_account_name
  repository = local.helm_repository.incubator
  version    = "1.0.0"
  namespace  = module.alb_ingress_controller_role.service_account_namespace
  keyring    = ""

  values = [<<VALUES
  clusterName: ${module.eks.cluster_id}
  awsRegion: ${data.aws_region.current.id}
  awsVpcID: ${module.vpc.vpc_id}
  image:
    tag: v1.1.8
  rbac:
    serviceAccount:
      name: ${module.alb_ingress_controller_role.service_account_name}
      annotations:
        eks.amazonaws.com/role-arn: ${module.alb_ingress_controller_role.role_arn}
  VALUES
  ]
}

# nginx ingress manages ingress resources
resource "helm_release" "nginx_ingress" {
  chart      = "nginx-ingress"
  repository = local.helm_repository.stable
  name       = "nginx-ingress"
  namespace  = "kube-system"
  version    = "1.40.2"
  keyring    = ""

  values = [<<VALUES
  controller:
    replicaCount: 3
    minAvailable: 2
    service:
      type: ClusterIP
      enableHttps: false
    config:
      proxy-buffer-size: "32k"
      use-forwarded-headers: "true"
      log-format-escape-json: "true"
      log-format-upstream: '{"time": "$time_iso8601", "remote_addr": "$remote_addr", "request_id": "$req_id", "user": "$remote_user", "bytes_sent": $bytes_sent, "request_time": $request_time, "status": $status, "host": "$host", "proto": "$server_protocol", "path": "$uri", "request_length": $request_length, "duration": $request_time, "method": "$request_method", "referrer": "$http_referer", "user_agent": "$http_user_agent", "proxy_upstream_name": "$proxy_upstream_name", "upstream_addr": "$upstream_addr", "upstream_response_length": "$upstream_response_length", "upstream_response_time": "$upstream_response_time", "upstream_status": "$upstream_status"}'
      server-snippet: |
        if ($host ~* ^(.*)${local.domains.purpleheadband.name}$) {
          return 301 https://$1${local.domains.symphony.name}$request_uri;
        }
    affinity:
      podAntiAffinity:
        preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              topologyKey: kubernetes.io/hostname
              labelSelector:
                matchLabels:
                  app: ingress-nginx
                  component: controller
    metrics:
      enabled: true
      serviceMonitor:
        enabled: true
        honorLabels: true
  VALUES
  ]
}

# alb for ingress gateways
resource "kubernetes_ingress" "gateway" {
  for_each = {
    public = {
      waf_acl_id = aws_wafregional_web_acl.wafacl.id
      hostnames = flatten([
        for _, domain in local.domains : [
          domain.name,
          format("*.%s", domain.name),
          format("auth.%s", domain.name),
        ]
      ])
    }

    intern = {
      waf_acl_id = aws_wafregional_web_acl.internacl.id
      hostnames = flatten([
        for _, domain in local.domains : [
          domain.intern_name,
          format("*.%s", domain.intern_name),
        ]
      ])
    }
  }

  metadata {
    name      = format("%s-gateway", each.key)
    namespace = helm_release.nginx_ingress.namespace

    annotations = {
      "kubernetes.io/ingress.class"                    = "alb"
      "alb.ingress.kubernetes.io/scheme"               = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"          = "ip"
      "alb.ingress.kubernetes.io/healthcheck-path"     = "/healthz"
      "alb.ingress.kubernetes.io/certificate-arn"      = aws_acm_certificate.cert.arn
      "alb.ingress.kubernetes.io/ssl-policy"           = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
      "alb.ingress.kubernetes.io/waf-acl-id"           = each.value.waf_acl_id
      "alb.ingress.kubernetes.io/listen-ports"         = jsonencode([{ HTTP = 80 }, { HTTPS = 443 }])
      "alb.ingress.kubernetes.io/actions.ssl-redirect" = jsonencode({ Type = "redirect", RedirectConfig = { Protocol = "HTTPS", Port = "443", StatusCode = "HTTP_301" } })
      "external-dns.alpha.kubernetes.io/hostname"      = join(",", each.value.hostnames)
    }
  }

  spec {
    rule {
      http {
        path {
          path = "/*"

          backend {
            service_name = "ssl-redirect"
            service_port = "use-annotation"
          }
        }

        path {
          path = "/*"

          backend {
            service_name = format("%s-controller", helm_release.nginx_ingress.name)
            service_port = "80"
          }
        }
      }
    }
  }
}

# iam role for external dns
module "external_dns_role" {
  source                    = "./modules/irsa"
  role_name_prefix          = "ExternalDNSRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.external_dns.json
  service_account_name      = "external-dns"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# policy required by external dns
data "aws_iam_policy_document" "external_dns" {
  statement {
    actions = [
      "route53:ChangeResourceRecordSets",
    ]

    resources = [
      "arn:aws:route53:::hostedzone/${aws_route53_zone.symphony.id}",
      "arn:aws:route53:::hostedzone/${aws_route53_zone.purpleheadband.id}",
      "arn:aws:route53:::hostedzone/${local.magma_hosted_zone.id}",
    ]
  }

  statement {
    actions = [
      "route53:ListHostedZones",
      "route53:ListResourceRecordSets",
    ]

    resources = ["*"]
  }
}

# external dns maps route53 to ingress resources
resource "helm_release" "external_dns" {
  name       = "external-dns"
  repository = local.helm_repository.bitnami
  chart      = "external-dns"
  version    = "3.2.3"
  namespace  = "kube-system"
  keyring    = ""

  values = [<<VALUES
  annotationFilter: kubernetes.io/ingress.class notin (nginx)
  serviceAccount:
    name: ${module.external_dns_role.service_account_name}
    annotations:
      eks.amazonaws.com/role-arn: ${module.external_dns_role.role_arn}
  zoneIdFilters:
    - ${aws_route53_zone.symphony.id}
    - ${aws_route53_zone.purpleheadband.id}
    - ${local.magma_hosted_zone.id}
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
  VALUES
  ]
}
