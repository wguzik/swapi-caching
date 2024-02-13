locals {
  postfix                       = "${var.project}-${var.environment}-${var.location}"
  namespaces                    = ["monitoring", "nginx"]
  kube_prometheus_stack_version = "56.6.2"
}

module "rg" {
  source = "./modules/rg"

  postfix     = local.postfix
  project     = var.project
  environment = var.environment
  location    = var.location
}

module "vnet" {
  source = "./modules/vnet"

  rg_name = module.rg.rg_name
  postfix = local.postfix

  depends_on = [
    module.rg
  ]
}