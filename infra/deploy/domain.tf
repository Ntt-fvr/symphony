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
  name  = local.magma_domain_name
  count = terraform.workspace == "default" ? 1 : 0
}

# hosted zone for magma records for non default workspaces
data "aws_route53_zone" "magma" {
  name = local.magma_domain_name
}
