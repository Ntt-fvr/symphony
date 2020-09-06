# acm certificate for application load balancers.
resource aws_acm_certificate symphony {
  domain_name       = local.domains.symphony.name
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${local.domains.symphony.name}",
    "*.${local.domains.symphony.intern_name}",
  ]

  tags = local.tags
}

# dns record for symphony certificate validation
resource aws_route53_record symphony_cert_validation {
  for_each = {
    for dvo in aws_acm_certificate.symphony.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.symphony.id
}

# validate symphony certificate against dns record
resource aws_acm_certificate_validation symphony {
  certificate_arn = aws_acm_certificate.symphony.arn
  validation_record_fqdns = [
    for record in aws_route53_record.symphony_cert_validation : record.fqdn
  ]
}

