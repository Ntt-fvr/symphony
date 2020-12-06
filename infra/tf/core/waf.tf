resource "aws_wafregional_regex_pattern_set" "blocked_uris" {
  name                  = "blockeduris"
  regex_pattern_strings = ["/debug/"]
}

resource "aws_wafregional_regex_match_set" "blocked_uris" {
  name = "blockeduris"

  regex_match_tuple {
    regex_pattern_set_id = aws_wafregional_regex_pattern_set.blocked_uris.id
    text_transformation  = "NONE"

    field_to_match {
      type = "URI"
    }
  }
}

resource "aws_wafregional_regex_pattern_set" "keycloak_blocked_uris" {
  name = "keycloakblockeduris"
  regex_pattern_strings = [
    "^/auth/admin/",
    "^/auth/realms/master/",
    "^/?$",
  ]
}

resource "aws_wafregional_regex_match_set" "keycloak_blocked_uris" {
  name = "keycloakblockeduris"

  regex_match_tuple {
    regex_pattern_set_id = aws_wafregional_regex_pattern_set.keycloak_blocked_uris.id
    text_transformation  = "NONE"

    field_to_match {
      type = "URI"
    }
  }
}

resource "aws_wafregional_byte_match_set" "keycloak_host" {
  name = "keycloak"

  byte_match_tuples {
    text_transformation   = "LOWERCASE"
    target_string         = "auth.${local.domains.symphony.name}"
    positional_constraint = "ENDS_WITH"

    field_to_match {
      type = "HEADER"
      data = "host"
    }
  }
}

resource "aws_wafregional_rule" "blocked_uris" {
  metric_name = "blockeduris"
  name        = "blockeduris"

  predicate {
    data_id = aws_wafregional_regex_match_set.blocked_uris.id
    negated = false
    type    = "RegexMatch"
  }
}

resource "aws_wafregional_byte_match_set" "master" {
  name = "master"

  byte_match_tuples {
    text_transformation   = "LOWERCASE"
    target_string         = "master.${local.domains.symphony.name}"
    positional_constraint = "ENDS_WITH"

    field_to_match {
      type = "HEADER"
      data = "host"
    }
  }
}

resource "aws_wafregional_rule" "master" {
  metric_name = "master"
  name        = "master"

  predicate {
    data_id = aws_wafregional_byte_match_set.master.id
    negated = false
    type    = "ByteMatch"
  }

  predicate {
    data_id = aws_wafregional_ipset.fb_ips.id
    negated = true
    type    = "IPMatch"
  }
}

resource "aws_wafregional_rule" "keycloak" {
  metric_name = "keycloakblockeduris"
  name        = "keycloakblockeduris"

  predicate {
    data_id = aws_wafregional_byte_match_set.keycloak_host.id
    negated = false
    type    = "ByteMatch"
  }

  predicate {
    data_id = aws_wafregional_regex_match_set.keycloak_blocked_uris.id
    negated = false
    type    = "RegexMatch"
  }

  predicate {
    data_id = aws_wafregional_ipset.fb_ips.id
    negated = true
    type    = "IPMatch"
  }
}

locals {
  wafacl_rules = [
    aws_wafregional_rule.master.id,
    aws_wafregional_rule.keycloak.id,
    aws_wafregional_rule.blocked_uris.id,
    aws_wafregional_rule.cellcom.id,
  ]
}

resource "aws_wafregional_web_acl" "wafacl" {
  metric_name = "wafacl"
  name        = "wafacl"

  default_action {
    type = "ALLOW"
  }

  dynamic "rule" {
    for_each = local.wafacl_rules

    content {
      action {
        type = "BLOCK"
      }

      rule_id  = rule.value
      priority = index(local.wafacl_rules, rule.value) + 1
    }
  }
}

resource "aws_wafregional_ipset" "fb_ips" {
  name = "fbips"

  dynamic "ip_set_descriptor" {
    for_each = local.cidrs.facebook

    content {
      type  = "IPV4"
      value = ip_set_descriptor.value
    }
  }
}

resource "aws_wafregional_rule" "fb_ips" {
  metric_name = "fbips"
  name        = "fbips"

  predicate {
    data_id = aws_wafregional_ipset.fb_ips.id
    negated = false
    type    = "IPMatch"
  }
}

resource "aws_wafregional_web_acl" "internacl" {
  metric_name = "internacl"
  name        = "internacl"

  default_action {
    type = "BLOCK"
  }

  rule {
    action {
      type = "ALLOW"
    }

    priority = 1
    rule_id  = aws_wafregional_rule.fb_ips.id
  }
}
