

resource "aws_instance" "server" {
    ami = "ami-04e601abe3e1a910f"
    instance_type = "t2.micro"
    key_name = aws_key_pair.deployer.key_name
    vpc_security_group_ids = [aws_security_group.maingroup.id]
    iam_instance_profile = aws_iam_instance_profile.ec2-profile.name
    connection {
        type = "ssh"
        host = self.public_ip
        user = "ubuntu"
        private_key = var.private_key
        timeout = "4"

    }
    tags = {
        "name" = "DeployVM"
    }
  
}

resource "aws_iam_instance_profile" "ec2-profile" {
    name = "ec2-profile"
    role = "EC2-ECR-AUTH"
  
}

resource "aws_security_group" "maingroup" {
    egress = [
        {
            cidr_blocks         = ["0.0.0.0/0"]
            description         = ""
            from_port           = 0
            ipv6_cidr_blocks    = []
            prefix_list_ids     = []
            protocol            = "-l"
            security_groups     = []
            self                = false
            to_port             = 0

        }

    ]
    ingress = [
        {
            cidr_blocks         = ["0.0.0.0/0", ]
            description         = ""
            from_port           = 22
            ipv6_cidr_blocks    = []
            prefix_list_ids     = []
            protocol            = "tcp"
            security_groups     = []
            self                = false
            to_port             = 22
        },

         {
            cidr_blocks         = ["0.0.0.0/0", ]
            description         = ""
            from_port           = 80
            ipv6_cidr_blocks    = []
            prefix_list_ids     = []
            protocol            = "tcp"
            security_groups     = []
            self                = false
            to_port             = 80
        },

    ]
  
}

resource "aws_key_pair" "deployer" {
    key_name = var.key_name
    public_key = var.public_key
}

