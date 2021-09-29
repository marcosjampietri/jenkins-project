provider "aws" {
  region = "eu-west-2"
  # access_key = ""
  # secret_key = ""
}

variable "sub_cidr_block" {
  description = "sub cidr block"
  default     = "10.0.10.0/24"
  type        = string
}

variable "my_ip" {}
variable "jenkins_ip" {}
variable "ansible_ip" {}


resource "aws_vpc" "marcos-vpc-test" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "marchito-vpc"
  }

}

resource "aws_subnet" "marcos-subnet-test" {
  vpc_id            = aws_vpc.marcos-vpc-test.id
  cidr_block        = var.sub_cidr_block
  availability_zone = "eu-west-2a"
  tags = {
    Name = "marcos-subnet1"
  }

}

# data "aws_vpc" "sub-na-vpc-default" {
#   default = true
# 
# }


resource "aws_route_table" "marcos-table" {
  vpc_id = aws_vpc.marcos-vpc-test.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.marcos-gateway.id

  }

  tags = {
    Name = "marcos-table"
  }
}

resource "aws_internet_gateway" "marcos-gateway" {
  vpc_id = aws_vpc.marcos-vpc-test.id

}

resource "aws_route_table_association" "marcos-association" {
  subnet_id      = aws_subnet.marcos-subnet-test.id
  route_table_id = aws_route_table.marcos-table.id
}

resource "aws_security_group" "marcos-sg" {
  name   = "marcos-sg"
  vpc_id = aws_vpc.marcos-vpc-test.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip, var.jenkins_ip, var.ansible_ip]
  }

  ingress {
    from_port   = 5150
    to_port     = 5150
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "marcos-sg-tag"
  }

}

data "aws_ami" "latest-amazon-linux-image" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-gp2"]
  }
}


output "ec2_public_ip" {

  value = aws_instance.marcos-server.public_ip

}

resource "aws_instance" "marcos-server" {
  ami                    = data.aws_ami.latest-amazon-linux-image.id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.marcos-subnet-test.id
  vpc_security_group_ids = [aws_security_group.marcos-sg.id]
  availability_zone      = "eu-west-2a"

  associate_public_ip_address = true
  key_name                    = "Marcos-ec2-default"


  tags = {
    Name = "e-commerce"
  }

}
