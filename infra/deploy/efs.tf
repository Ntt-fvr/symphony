locals {
  # nfs standard port
  nfs_port = 2049
}

# grant efs access to eks cluster and worker nodes
resource "aws_security_group" "efs_sg" {
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
resource "aws_efs_file_system" "eks_pv" {
  tags = {
    Name = "${var.project}.k8s.pv.local"
  }
}

# efs mount target for eks persistent volumes
resource "aws_efs_mount_target" "eks_pv_mnt" {
  file_system_id  = aws_efs_file_system.eks_pv.id
  security_groups = [aws_security_group.efs_sg.id]
  subnet_id       = module.vpc.private_subnets[count.index]
  count           = length(local.vpc_private_subnets)
}

# allow eks workers to assume efs provisioner role
resource "aws_iam_role" "efs_provisioner" {
  name_prefix        = "EFSProvisionerRole"
  assume_role_policy = data.aws_iam_policy_document.eks_worker_assumable.json
  tags               = local.tags
}

# grant efs read only policy to efs provisioner
resource "aws_iam_role_policy_attachment" "efs_provisioner" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonElasticFileSystemReadOnlyAccess"
  role       = aws_iam_role.efs_provisioner.id
}

# k8s requires provisioner to treat efs as a persistent volume
resource "helm_release" "efs_provisioner" {
  name       = "efs-provisioner"
  repository = local.helm_repository.stable
  chart      = "efs-provisioner"
  version    = "0.12.1"
  namespace  = "kube-system"
  keyring    = ""

  values = [<<VALUES
  efsProvisioner:
    efsFileSystemId: ${aws_efs_file_system.eks_pv.id}
    awsRegion: ${data.aws_region.current.id}
    path: /pv-volume
    provisionerName: aws-efs
    storageClass:
      name: efs
  podAnnotations:
    iam-assumable-role: ${aws_iam_role.efs_provisioner.arn}
  VALUES
  ]

  depends_on = [aws_efs_mount_target.eks_pv_mnt]
}
