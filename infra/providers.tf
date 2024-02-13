terraform {

  backend "azurerm" {
    resource_group_name  = "yourrg"
    storage_account_name = "saname"
    container_name       = "dev"
    key                  = "terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.88.0"
    }
  }
}

provider "azurerm" {
  features {}
}
