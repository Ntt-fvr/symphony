resource aws_wafregional_ipset cellcom {
  name = "cellcom"

  dynamic "ip_set_descriptor" {
    for_each = jsondecode(
      jsondecode(data.aws_secretsmanager_secret_version.cidrs.secret_string)["cellcom"]
    )

    content {
      type  = "IPV4"
      value = ip_set_descriptor.value
    }
  }
}

resource aws_wafregional_regex_pattern_set cellcom {
  name = "cellcom"

  regex_pattern_strings = [
    format(".*cellcom.%s", local.domains.symphony.name),
  ]
}

resource aws_wafregional_regex_match_set cellcom {
  name = "cellcom"

  regex_match_tuple {
    regex_pattern_set_id = aws_wafregional_regex_pattern_set.cellcom.id
    text_transformation  = "LOWERCASE"

    field_to_match {
      type = "HEADER"
      data = "host"
    }
  }
}

resource aws_wafregional_rule cellcom {
  name        = "cellcom"
  metric_name = "cellcom"

  predicate {
    data_id = aws_wafregional_regex_match_set.cellcom.id
    negated = false
    type    = "RegexMatch"
  }

  predicate {
    data_id = aws_wafregional_ipset.cellcom.id
    negated = true
    type    = "IPMatch"
  }

  predicate {
    data_id = aws_wafregional_ipset.fb_ips.id
    negated = true
    type    = "IPMatch"
  }
}
