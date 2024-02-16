locals {
  postfix = "${var.project}-${var.environment}-${var.location}"
}

module "rg" {
  source = "./modules/rg"

  postfix     = local.postfix
  project     = var.project
  environment = var.environment
  location    = var.location
}

module "kv" {
  source = "./modules/kv"

  rg_name     = module.rg.rg_name
  project     = var.project
  environment = var.environment
  depends_on = [
    module.rg
  ]
}

module "acr" {
  source = "./modules/acr"

  rg_name     = module.rg.rg_name
  project     = var.project
  environment = var.environment
  kv_id       = module.kv.kv_id

  depends_on = [
    module.rg,
    module.kv
  ]
}
