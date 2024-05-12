#!/bin/bash
cd
sudo yum update -y
sudo yum install -y git

sudo yum install docker containerd git screen -y
sleep 1
wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)
sleep 1
sudo mv docker-compose-$(uname -s)-$(uname -m) /usr/libexec/docker/cli-plugins/docker-compose
sleep 1
chmod +x /usr/libexec/docker/cli-plugins/docker-compose
sleep 5
sudo systemctl enable docker.service --now
sudo usermod -a -G docker ec2-user

sudo systemctl start docker.service