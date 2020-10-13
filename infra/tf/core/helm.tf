locals {
  helm_repository = {
    stable               = "https://kubernetes-charts.storage.googleapis.com"
    incubator            = "http://storage.googleapis.com/kubernetes-charts-incubator"
    kiwigrid             = "https://kiwigrid.github.io"
    jaegertracing        = "https://jaegertracing.github.io/helm-charts"
    codecentric          = "https://codecentric.github.io/helm-charts"
    sstarcher            = "https://shanestarcher.com/helm-charts"
    bitnami              = "https://charts.bitnami.com/bitnami"
    eks                  = "https://aws.github.io/eks-charts"
    jetstack             = "https://charts.jetstack.io"
    autoscaler           = "https://kubernetes.github.io/autoscaler"
    prometheus-community = "https://prometheus-community.github.io/helm-charts"
    ingress-nginx        = "https://kubernetes.github.io/ingress-nginx"
  }
}
