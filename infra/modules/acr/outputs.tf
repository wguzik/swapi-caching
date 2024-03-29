output "acr_name" {
  value = azurerm_container_registry.acr.name
}

output "acr_login" {
  value = "az acr login -n ${azurerm_container_registry.acr.name}"
}

output "admin_username" {
  value = azurerm_container_registry.acr.admin_username
}

output "admin_password" {
  value = azurerm_container_registry.acr.admin_password
}