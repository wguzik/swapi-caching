data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "rg" {
  name = var.rg_name
}

locals {
  name = "${var.project}${var.environment}"
  #check concat function
}

resource "azurerm_container_registry" "acr" {
  name                = "acr${local.name}"
  resource_group_name = data.azurerm_resource_group.rg.name
  location            = data.azurerm_resource_group.rg.location
  sku                 = "Basic"

  admin_enabled = true

  lifecycle {
    ignore_changes = [location]
  }
}

resource "azurerm_key_vault_secret" "acr_admin_username" {
  key_vault_id = var.kv_id
  name         = "acr-username"
  value        = azurerm_container_registry.acr.admin_username
}

resource "azurerm_key_vault_secret" "acr_admin_password" {
  key_vault_id = var.kv_id
  name         = "acr-password"
  value        = azurerm_container_registry.acr.admin_password
}