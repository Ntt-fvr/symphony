locals {
  # nfs standard port
  nfs_port = 2049
}

# grant efs access to eks cluster and worker nodes
resource aws_security_group efs_sg {
  name        = "efs-mount"
  description = "Allow NFS traffic from k8s cluster and worker nodes."
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = local.nfs_port
    to_port   = local.nfs_port
    protocol  = "tcp"

    security_groups = [
      module.eks.cluster_security_group_id,
      module.eks.worker_security_group_id,
    ]
  }

  egress {
    from_port = local.nfs_port
    to_port   = local.nfs_port
    protocol  = "tcp"

    security_groups = [
      module.eks.cluster_security_group_id,
      module.eks.worker_security_group_id,
    ]
  }
}

# efs file system for eks persistent volumes
resource aws_efs_file_system eks_pv {
  tags = {
    Name = "${var.project}.k8s.pv.local"
  }
}

# efs mount target for eks persistent volumes
resource aws_efs_mount_target eks_pv_mnt {
  file_system_id  = aws_efs_file_system.eks_pv.id
  security_groups = [aws_security_group.efs_sg.id]
  subnet_id       = module.vpc.private_subnets[count.index]
  count           = length(local.vpc_private_subnets)
}

# iam role for efs provisioner
module efs_provisioner_role {
  source                    = "../modules/irsa"
  role_name_prefix          = "EFSProvisionerRole"
  role_path                 = local.eks_sa_role_path
  role_policy_arns          = ["arn:aws:iam::aws:policy/AmazonElasticFileSystemReadOnlyAccess"]
  service_account_name      = "efs-provisioner"
  service_account_namespace = "kube-system"
  oidc_provider_arn         = module.eks.oidc_provider_arn
  tags                      = local.tags
}

# k8s requires provisioner to treat efs as a persistent volume
resource helm_release efs_provisioner {
  name       = "efs-provisioner"
  repository = local.helm_repository.stable
  chart      = "efs-provisioner"
  version    = "0.13.0"
  namespace  = module.efs_provisioner_role.service_account_namespace

  values = [yamlencode({
    efsProvisioner = {
      efsFileSystemId = aws_efs_file_system.eks_pv.id
      awsRegion       = data.aws_region.current.id
      path            = "/pv-volume"
      provisionerName = "aws-efs"
      storageClass = {
        name = "efs"
      }
    }
    serviceAccount = {
      name = module.efs_provisioner_role.service_account_name
      annotations = {
        "eks.amazonaws.com/role-arn" = module.efs_provisioner_role.role_arn
      }
    }
  })]
  depends_on = [aws_efs_mount_target.eks_pv_mnt]
}
