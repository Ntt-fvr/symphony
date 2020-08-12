locals {
  helm_repository = {
    symphony = {
      url      = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["helm_repository"]
      username = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["username"]
      password = jsondecode(data.aws_secretsmanager_secret_version.artifactory.secret_string)["password"]
    }
    stable        = "https://kubernetes-charts.storage.googleapis.com"
    incubator     = "http://storage.googleapis.com/kubernetes-charts-incubator"
    kiwigrid      = "https://kiwigrid.github.io"
    jaegertracing = "https://jaegertracing.github.io/helm-charts"
    codecentric   = "https://codecentric.github.io/helm-charts"
    sstarcher     = "https://shanestarcher.com/helm-charts"
    bitnami       = "https://charts.bitnami.com/bitnami"
    eks           = "https://aws.github.io/eks-charts"
    jetstack      = "https://charts.jetstack.io"
  }
}
