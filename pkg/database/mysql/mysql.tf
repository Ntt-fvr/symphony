/**
 * Copyright (c) 2004-present Facebook All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

terraform {
  required_version = ">= 0.13"
  required_providers {
    docker = {
      source  = "terraform-providers/docker"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 2.0"
    }
  }
}

variable port {
  type        = number
  description = "Port exposed out of the MySQL container."
  default     = 3306
}

resource random_pet mysql {}

resource random_password db_password {
  special = false
  length  = 20
}

locals { db_name = "testdb" }

resource docker_container mysql {
  name  = random_pet.mysql.id
  image = docker_image.mysql.latest

  env = [
    "MYSQL_ROOT_PASSWORD=${random_password.db_password.result}",
    "MYSQL_DATABASE=${local.db_name}",
  ]
  ports {
    internal = 3306
    external = var.port
  }
}

resource docker_image mysql {
  name         = "mysql"
  keep_locally = true
}

output endpoint {
  value       = "localhost:${var.port}"
  description = "The MySQL instance's host/port."
}

output username {
  value       = "root"
  description = "The MySQL username to connect with."
}

output password {
  value       = random_password.db_password.result
  sensitive   = true
  description = "The MySQL instance password for the user."
}

output database {
  value       = local.db_name
  description = "The name of the database inside the MySQL instance."
}
