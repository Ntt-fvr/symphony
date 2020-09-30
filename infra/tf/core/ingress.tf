# iam role for alb ingress controller
module alb_ingress_controller_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "ALBIngressControllerRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.alb_ingress_controller.json
  service_account_name      = "aws-alb-ingress-controller"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# policy required by alb ingress controller
data aws_iam_policy_document alb_ingress_controller {
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
resource helm_release alb_ingress_controller {
  chart      = "aws-alb-ingress-controller"
  name       = module.alb_ingress_controller_role.service_account_name
  repository = local.helm_repository.incubator
  version    = "1.0.2"
  namespace  = module.alb_ingress_controller_role.service_account_namespace

  values = [yamlencode({
    clusterName = module.eks.cluster_id
    awsRegion   = data.aws_region.current.id
    awsVpcID    = module.vpc.vpc_id
    rbac = {
      serviceAccount = {
        name = module.alb_ingress_controller_role.service_account_name
        annotations = {
          "eks.amazonaws.com/role-arn" = module.alb_ingress_controller_role.role_arn
        }
      }
    }
  })]
}

# security groups allowing http/https access to intern.
resource "aws_security_group" "intern_sg" {
  name_prefix = "${local.eks_cluster_name}-intern-"
  vpc_id      = module.vpc.vpc_id

  dynamic "ingress" {
    for_each = [80, 443]

    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = local.cidrs.facebook
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# nginx ingress manages ingress resources
resource helm_release nginx_ingress {
  chart      = "nginx-ingress"
  repository = local.helm_repository.stable
  name       = "nginx-ingress"
  namespace  = "kube-system"
  version    = "1.41.3"

  values = [<<VALUES
  controller:
    replicaCount: 3
    minAvailable: 2
    service:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
        service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '60'
        service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: 'true'
        service.beta.kubernetes.io/aws-load-balancer-type: nlb
        external-dns.alpha.kubernetes.io/hostname: '${local.ctf_domain_name},*.${local.ctf_domain_name}'
      externalTrafficPolicy: Local
      internal:
        enabled: true
        annotations:
          service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
          service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '60'
          service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: 'true'
          service.beta.kubernetes.io/aws-load-balancer-extra-security-groups: ${aws_security_group.intern_sg.id}
    config:
      proxy-buffer-size: "32k"
      use-forwarded-headers: "true"
      log-format-escape-json: "true"
      log-format-upstream: '{"time": "$time_iso8601", "remote_addr": "$remote_addr", "request_id": "$req_id", "user": "$remote_user", "bytes_sent": $bytes_sent, "request_time": $request_time, "status": $status, "host": "$host", "proto": "$server_protocol", "path": "$uri", "request_length": $request_length, "duration": $request_time, "method": "$request_method", "referrer": "$http_referer", "user_agent": "$http_user_agent", "proxy_upstream_name": "$proxy_upstream_name", "upstream_addr": "$upstream_addr", "upstream_response_length": "$upstream_response_length", "upstream_response_time": "$upstream_response_time", "upstream_status": "$upstream_status"}'
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
resource kubernetes_ingress gateway {
  for_each = {
    public = {
      waf_acl_id = aws_wafregional_web_acl.wafacl.id
      hostnames = flatten([
        for _, domain in local.domains : [
          domain.name,
          format("*.%s", domain.name),
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
      "kubernetes.io/ingress.class"                        = "alb"
      "alb.ingress.kubernetes.io/scheme"                   = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"              = "ip"
      "alb.ingress.kubernetes.io/healthcheck-path"         = "/healthz"
      "alb.ingress.kubernetes.io/load-balancer-attributes" = "deletion_protection.enabled=true,access_logs.s3.enabled=true,access_logs.s3.bucket=${aws_s3_bucket.access_logs.id},access_logs.s3.prefix=${each.key}"
      "alb.ingress.kubernetes.io/certificate-arn"          = aws_acm_certificate.symphony.arn
      "alb.ingress.kubernetes.io/ssl-policy"               = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
      "alb.ingress.kubernetes.io/waf-acl-id"               = each.value.waf_acl_id
      "alb.ingress.kubernetes.io/listen-ports"             = jsonencode([{ HTTP = 80 }, { HTTPS = 443 }])
      "alb.ingress.kubernetes.io/actions.ssl-redirect"     = jsonencode({ Type = "redirect", RedirectConfig = { Protocol = "HTTPS", Port = "443", StatusCode = "HTTP_301" } })
      "external-dns.alpha.kubernetes.io/hostname"          = join(",", each.value.hostnames)
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
            service_name = "${helm_release.nginx_ingress.name}-controller"
            service_port = "80"
          }
        }
      }
    }
  }
}

# s3 bucket storing load balancers access logs
resource aws_s3_bucket access_logs {
  bucket = "symphony.${local.environment}.access-logs"

  lifecycle_rule {
    enabled = true

    expiration {
      days = 30
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Project   = "core"
    PartOf    = "symphony"
    Workspace = terraform.workspace
  }
}

# block public access to access logs bucket
resource aws_s3_bucket_public_access_block access_logs {
  bucket                  = aws_s3_bucket.access_logs.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


locals {
  // access logs resource path where logs are placed.
  access_logs_put_object_resources = formatlist(
    "arn:aws:s3:::%s/*/AWSLogs/%s/*",
    aws_s3_bucket.access_logs.id,
    data.aws_caller_identity.current.account_id,
  )
}

# define access logs bucket policy
# ref: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html#attach-bucket-policy
data aws_iam_policy_document access_logs {
  statement {
    principals {
      identifiers = [data.aws_elb_service_account.main.arn]
      type        = "AWS"
    }
    actions   = ["s3:PutObject"]
    resources = local.access_logs_put_object_resources
  }

  statement {
    principals {
      identifiers = ["delivery.logs.amazonaws.com"]
      type        = "Service"
    }
    actions   = ["s3:PutObject"]
    resources = local.access_logs_put_object_resources
    condition {
      test     = "StringEquals"
      values   = ["bucket-owner-full-control"]
      variable = "s3:x-amz-acl"
    }
  }

  statement {
    principals {
      identifiers = ["delivery.logs.amazonaws.com"]
      type        = "Service"
    }
    actions   = ["s3:GetBucketAcl"]
    resources = [aws_s3_bucket.access_logs.arn]
  }
}

# attach access logs bucket policy
resource aws_s3_bucket_policy access_logs {
  bucket = aws_s3_bucket.access_logs.id
  policy = data.aws_iam_policy_document.access_logs.json
}

# iam role for external dns
module external_dns_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "ExternalDNSRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.external_dns.json
  service_account_name      = "external-dns"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

locals {
  # managed hosted zones
  aws_route53_zones = [
    aws_route53_zone.symphony.id,
    data.aws_route53_zone.magma.id,
    aws_route53_zone.ctf.id,
    aws_route53_zone.springboard.id,
  ]
}

# policy required by external dns
data aws_iam_policy_document external_dns {
  statement {
    actions = [
      "route53:ChangeResourceRecordSets",
    ]

    resources = formatlist(
      "arn:aws:route53:::hostedzone/%s",
      local.aws_route53_zones,
    )
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
resource helm_release external_dns {
  name       = "external-dns"
  repository = local.helm_repository.bitnami
  chart      = "external-dns"
  version    = "3.4.1"
  namespace  = "kube-system"

  values = [yamlencode({
    annotationFilter = "kubernetes.io/ingress.class notin (nginx)"
    serviceAccount = {
      name = module.external_dns_role.service_account_name
      annotations = {
        "eks.amazonaws.com/role-arn" = module.external_dns_role.role_arn
      }
    }
    zoneIdFilters = local.aws_route53_zones
    metrics = {
      enabled = true
      serviceMonitor = {
        enabled = true
      }
    }
  })]
}

# policy required by cert manager
data aws_iam_policy_document cert_manager {
  statement {
    actions = [
      "route53:GetChange",
    ]

    resources = [
      "arn:aws:route53:::change/*",
    ]
  }

  statement {
    actions = [
      "route53:ChangeResourceRecordSets",
      "route53:ListResourceRecordSets",
    ]

    resources = [
      format(
        "arn:aws:route53:::hostedzone/%s",
        aws_route53_zone.ctf.id,
      ),
    ]
  }

  statement {
    actions = [
      "route53:ListHostedZonesByName",
    ]

    resources = ["*"]
  }
}

# iam role for cert manager
module cert_manager_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "CertManagerRole"
  role_path                 = local.eks_sa_role_path
  role_policy               = data.aws_iam_policy_document.cert_manager.json
  service_account_name      = "cert-manager"
  service_account_namespace = "cert-manager"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# cert manager is a certificate management controller.
resource helm_release cert_manager {
  name             = "cert-manager"
  repository       = local.helm_repository.jetstack
  chart            = "cert-manager"
  version          = "1.0.2"
  namespace        = "cert-manager"
  create_namespace = true

  values = [yamlencode({
    serviceAccount = {
      name = module.cert_manager_role.service_account_name
      annotations = {
        "eks.amazonaws.com/role-arn" = module.cert_manager_role.role_arn
      }
    }
    securityContext = {
      fsGroup = 1001
    }
    extraArgs = [
      "--issuer-ambient-credentials",
    ]
    prometheus = {
      servicemonitor = {
        enabled = true
      }
    }
  })]
}

locals {
  cert_issuer = {
    intern = "cert-issuer-intern"
  }
}

# cluster certificate issuer for intern.
resource "helm_release" "intern_cert_issuer" {
  name       = "intern-cert-issuer"
  namespace  = helm_release.cert_manager.namespace
  repository = local.helm_repository.kiwigrid
  chart      = "any-resource"

  values = [yamlencode({
    anyResources = {
      InternIssuer = yamlencode({
        apiVersion = "cert-manager.io/v1"
        kind       = "ClusterIssuer"
        metadata = {
          name = local.cert_issuer.intern
        }
        spec = {
          acme = {
            server = "https://acme-v02.api.letsencrypt.org/directory"
            email  = "alexsn@fb.com"
            privateKeySecretRef = {
              name = "${local.cert_issuer.intern}-account-key"
            }
            solvers = [{
              dns01 = {
                route53 = {
                  region       = data.aws_region.current.name
                  hostedZoneID = aws_route53_zone.symphony.id
                }
              }
              selector = {
                dnsZones = [local.domains.symphony.intern_name]
              }
            }]
          }
        }
      })
    }
  })]
}

