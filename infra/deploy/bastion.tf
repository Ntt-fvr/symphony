# ssh keypair for bastion access, retrieve private key with:
# $ secrets_tool get_from_group BASTION_SSH_PKEY SYMPHONY_KUBERNETES
resource "aws_key_pair" "bastion" {
  key_name   = "symphony-bastion"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDgnbKIio1ZwIvOJMFilwwoU0Ywz/xQFlftKFvJjQa9KlqWpW7rwrGExf5MLLFquSFxOLPinhF8aK3CwxVjRUowuxkz5QKWb2N/Jt/KCQINxRJYrI6ilrtfg2sgimmrz0J+fSbE8t8gpNfsJhwDFY0biGsKrQZHxjyjjGyb3XNYhqud2kOOCPsiyYaNmIe3cImSnVlo/5P7ONYbGJn7H02E+ZadgM90DS6mQecCffSc5NqydF/TDJdciQoqkygwP9l0wdnBp5B+/6Jf5OQ+K+HrN3AR8xKCFbVT97wtpEERxM1obrlCCjpDl/NZlz0W58Koi9rDGxJ7RAYLufJPoMrSb4bPAIi37GFCbxp0bCF2aTBnLGSUDzrFN5WHo74NOY8/M6yBmKtiwED0VRjAz/iSiuBM+5m6bHBMjYDqK64l5e/oQ3yEIgTJ4tIBDJDRIpM4zFgMSKw8b/YDzVOQwxL+KgiR8rAosb2Leoh1e5NuqKJdHV1e9V377llMZoIGBQQ+V71WJxiK0ngCUm9H8KDP9iHshK1lQtwrDVZPlydP3QuvUDNSorDr/xC8gfWmPs28+9koQdIjVCeWUU516WhZ7QaZrtpGEnchQdisVITVRE0y4sTJGmywTU8bcBiTyi7DfDtoXN9w16g8H7veDLuP2ymVrhpoALHrUcH1PR/VZw=="
}

# allow bastion access from facebook ips
resource "aws_security_group" "bastion" {
  name_prefix = "${local.eks_cluster_name}-bastion-"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = jsondecode(
      jsondecode(data.aws_secretsmanager_secret_version.cidrs.secret_string)["facebook"]
    )
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ec2 instance for bastion host
module "bastion" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 2.0"

  name                        = "${local.eks_cluster_name}-bastion"
  ami                         = data.aws_ami.bastion.id
  instance_type               = "t2.nano"
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.bastion.id]
  subnet_ids                  = module.vpc.public_subnets
  key_name                    = aws_key_pair.bastion.key_name

  user_data = <<EOF
    #!/bin/bash
    echo '${tls_private_key.eks_workers.private_key_pem}' > /home/ec2-user/.ssh/node_id_rsa
  EOF

  tags = merge(
    local.tags,
    { "kubernetes.io/cluster/${local.eks_cluster_name}" = "owned" },
  )
}

# expose bastion host over intern
resource "aws_route53_record" "bastion" {
  name    = "bastion.${local.domains.symphony.intern_name}"
  type    = "A"
  zone_id = aws_route53_zone.symphony.id
  ttl     = 300
  records = module.bastion.public_ip
}

# bastion uses amazon linux AMI
data "aws_ami" "bastion" {
  owners      = ["137112412989"]
  most_recent = true

  filter {
    name = "name"
    values = [
      "amzn2-ami-hvm-*-x86_64-gp2",
    ]
  }
}
