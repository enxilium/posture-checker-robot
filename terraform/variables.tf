variable "username" {
  description = "The master username for the database"
  type        = string
}

variable "password" {
  description = "The master password for the database"
  type        = string
  sensitive   = true
}

variable "webapp_image" {
  description = "The image for the webapp container"
  type        = string
}

variable "flask_image" {
  description = "The image for the flask container"
  type        = string
}
