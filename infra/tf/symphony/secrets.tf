module artifactory_secret {
  source   = "../modules/secret"
  path     = "${path.module}/../secrets/artifactory.yaml"
  override = var.artifactory
}
