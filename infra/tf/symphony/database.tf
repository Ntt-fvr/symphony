locals {
  mysql_port = 3306
}

resource random_password graph_db {
  length  = 16
  special = false
}

data aws_iam_role rds_enhanced_monitoring {
  name = "rds-monitoring-role"
}
