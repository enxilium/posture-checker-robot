provider "aws" {
    region = "us-east-2"
}

resource "aws_db_instance" "default" {
    identifier = "posture-db"
    engine = "postgres"
    instance_class = "db.t3.micro"
    allocated_storage = 20
    username = "enxilium"
    password = "posture-checker-123"
    publicly_accessible = false
    skip_final_snapshot = true
}

output "db_endpoint" {
    value = aws_db_instance.default.endpoint
}   