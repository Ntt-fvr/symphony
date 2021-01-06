variable "registry" {
  default = ""
}

variable "tag" {
  default = "latest"
}

group "default" {
  targets = [
    "admin",
    "async",
    "docs",
    "front",
    "graph",
    "jobrunner",
    "migrate",
    "store",
  ]
}

target "admin" {
  dockerfile = "admin/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/admin:${tag}" : "admin:${tag}"]
}

target "async" {
  dockerfile = "async/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/async:${tag}" : "async:${tag}"]
}

target "docs" {
  context = "docs"
  tags = [notequal("", registry) ? "${registry}/docs:${tag}" : "docs:${tag}"]
}

target "front" {
  context = "app"
  dockerfile = "fbcnms-projects/platform-server/Dockerfile.prod"
  tags = [notequal("", registry) ? "${registry}/front:${tag}" : "front:${tag}"]
}

target "graph" {
  dockerfile = "graph/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/graph:${tag}" : "graph:${tag}"]
}

target "jobrunner" {
  dockerfile = "jobrunner/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/jobrunner:${tag}" : "jobrunner:${tag}"]
}

target "migrate" {
  dockerfile = "migrate/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/migrate:${tag}" : "migrate:${tag}"]
}

target "store" {
  dockerfile = "store/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/store:${tag}" : "store:${tag}"]
}

target "storybook" {
  context = "app"
  dockerfile = "fbcnms-projects/storybook/Dockerfile"
  tags = [notequal("", registry) ? "${registry}/storybook:${tag}" : "storybook:${tag}"]
}
