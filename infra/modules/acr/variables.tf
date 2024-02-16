variable "rg_name" {
  type = string
}

variable "project" {
  type    = string
  default = "wg"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "kv_id" {
  type = string
}
