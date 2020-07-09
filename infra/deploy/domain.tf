locals {
  purpleheadband_domain_name = format(
    "%spurpleheadband.cloud",
    terraform.workspace != "default" ? format("${terraform.workspace}.") : "",
  )

  symphony_domain_name = format(
    "%sthesymphony.cloud",
    terraform.workspace != "default" ? format("${terraform.workspace}.") : "",
  )

  domains = {
    purpleheadband = {
      name        = local.purpleheadband_domain_name
      intern_name = format("intern.%s", local.purpleheadband_domain_name)
    }

    symphony = {
      name        = local.symphony_domain_name
      intern_name = format("intern.%s", local.symphony_domain_name)
    }
  }

  subdomain_count = terraform.workspace != "default" ? 1 : 0
}

# hosted zone for dns records
resource "aws_route53_zone" "symphony" {
  name = format("%s.", local.domains.symphony.name)
}

# access root hosted zone
data "aws_route53_zone" "symphony" {
  name  = replace(aws_route53_zone.symphony.name, format("%s.", terraform.workspace), "")
  count = local.subdomain_count
}

# dns record from parent hosted zone to subdomain name servers
resource "aws_route53_record" "symphony_subdomain" {
  name    = aws_route53_zone.symphony.name
  type    = "NS"
  zone_id = data.aws_route53_zone.symphony[count.index].id
  records = aws_route53_zone.symphony.name_servers
  ttl     = 300
  count   = local.subdomain_count
}

# hosted zone for dns records
resource "aws_route53_zone" "purpleheadband" {
  name = format("%s.", local.domains.purpleheadband.name)
}

# access root hosted zone
data "aws_route53_zone" "purpleheadband" {
  name  = replace(aws_route53_zone.purpleheadband.name, format("%s.", terraform.workspace), "")
  count = local.subdomain_count
}

# dns record from parent hosted zone to subdomain name servers
resource "aws_route53_record" "purpleheadband_subdomain" {
  name    = aws_route53_zone.purpleheadband.name
  type    = "NS"
  zone_id = data.aws_route53_zone.purpleheadband[count.index].id
  records = aws_route53_zone.purpleheadband.name_servers
  ttl     = 300
  count   = local.subdomain_count
}

locals {
  # domain name for magma records
  magma_domain_name = "magma.etagecom.io"
}

# hosted zone for magma records
resource "aws_route53_zone" "magma" {
  name  = format("%s.", local.magma_domain_name)
  count = terraform.workspace == "default" ? 1 : 0
}

# cross workspace reference to magma hosted zone
data "aws_route53_zone" "magma" {
  name  = format("%s.", local.magma_domain_name)
  count = 1 - length(aws_route53_zone.magma)
}

locals {
  magma_hosted_zone = try(aws_route53_zone.magma[0], data.aws_route53_zone.magma[0])
}

resource "aws_route53_record" "symphony_signup" {
  zone_id = aws_route53_zone.symphony.id
  name    = format("signup.%s", local.symphony_domain_name)
  type    = "A"
  ttl     = 300
  records = [
    "108.168.157.70",
  ]
}

resource "aws_route53_record" "symphony_www_signup" {
  zone_id = aws_route53_zone.symphony.id
  name    = format("www.%s", aws_route53_record.symphony_signup.name)
  type    = "CNAME"
  ttl     = 300
  records = [
    aws_route53_record.symphony_signup.name
  ]
}
