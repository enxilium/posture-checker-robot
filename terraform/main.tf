provider "aws" {
  region = "us-east-2"
}

# ---- VPC & Networking ----
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

data "aws_availability_zones" "available" {}

resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[count.index]
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_security_group" "ecs_sg" {
  name        = "ecs-sg"
  description = "Allow HTTP traffic to containers"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "Allow HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow traffic between containers on any port
  ingress {
    description     = "Allow internal communication"
    from_port       = 0
    to_port         = 65535
    protocol        = "tcp"
    self            = true
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ---- Application Load Balancer ----
resource "aws_lb" "app_lb" {
  name               = "app-lb"
  internal           = false
  security_groups    = [aws_security_group.ecs_sg.id]
  subnets            = aws_subnet.public[*].id
}

resource "aws_lb_target_group" "app_tg" {
  name     = "app-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path = "/"
  }
}

resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.app_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

# ---- ECS Cluster & Tasks ----
resource "aws_ecs_cluster" "main" {
  name = "app-cluster"
}

resource "aws_ecs_task_definition" "app" {
  family                   = "app-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name         = "webapp"
      image        = var.webapp_image      # e.g. "your-nextjs-image:latest"
      portMappings = [
        {
          containerPort = 3000,
          hostPort      = 3000
        }
      ]
      essential    = true
    },
    {
      name         = "flask"
      image        = var.flask_image       # e.g. "your-flask-image:latest"
      portMappings = [
        {
          containerPort = 5000,
          hostPort      = 5000
        }
      ]
      essential    = true
    }
  ])
}

resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = aws_subnet.public[*].id
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app_tg.arn
    container_name   = "webapp"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.app_listener]
}

# ---- RDS/PostgreSQL Database ----
resource "aws_db_instance" "default" {
  identifier          = "posture-db"
  engine              = "postgres"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  username            = var.username
  password            = var.password
  publicly_accessible = true
  skip_final_snapshot = true
}

# ---- Outputs ----
output "db_endpoint" {
  value = aws_db_instance.default.endpoint
}

output "webapp_url" {
  value = aws_lb.app_lb.dns_name
}