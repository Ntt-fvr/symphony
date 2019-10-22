# certificate to be used by application load balancers
resource "aws_acm_certificate" "cert" {
  domain_name       = local.domains.symphony.name
  validation_method = "DNS"

  subject_alternative_names = concat(
    [
      "*.${local.domains.symphony.name}",
      "*.${local.domains.symphony.intern_name}",
    ],
    [
      local.domains.purpleheadband.name,
      "*.${local.domains.purpleheadband.name}",
      "*.${local.domains.purpleheadband.intern_name}",
    ],
  )

  tags = local.tags

  lifecycle {
    create_before_destroy = true
    # SANs are recreated in random order, prevent certificate recreate by ignoring SAN changes
    # See: https://github.com/terraform-providers/terraform-provider-aws/issues/8531
    ignore_changes = [
      subject_alternative_names,
    ]
  }
}

# dns record for certificate validation
resource "aws_route53_record" "cert_validation" {
  name = aws_acm_certificate.cert.domain_validation_options[count.index]["resource_record_name"]
  type = aws_acm_certificate.cert.domain_validation_options[count.index]["resource_record_type"]
  zone_id = length(regexall(
    local.domains.symphony.name, aws_acm_certificate.cert.domain_validation_options[count.index]["domain_name"],
  )) > 0 ? aws_route53_zone.symphony.id : aws_route53_zone.purpleheadband.id
  records         = [aws_acm_certificate.cert.domain_validation_options[count.index]["resource_record_value"]]
  count           = length(aws_acm_certificate.cert.subject_alternative_names) + 1
  ttl             = 60
  allow_overwrite = true
}

# validate certificate against dns record
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn
}
