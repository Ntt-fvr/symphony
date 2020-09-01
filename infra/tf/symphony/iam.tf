module team {
  source     = "../modules/team-iam"
  group_name = "Symphony"
  role_name  = "SymphonyAdminRole"
  count      = local.production_only_count
}

module deployer {
  source    = "./modules/deployer"
  name      = "symphony.deployer"
  providers = { aws = aws.us-east-1 }
  count     = local.production_only_count
}

resource aws_iam_group_membership deployer {
  name  = "deployer"
  group = module.team[count.index].group_name
  users = [module.deployer[count.index].name]
  count = local.production_only_count
}