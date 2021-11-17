+++
title = "Docker swarm"
description = "Set up a docker swarm cluster from a docker-compose.yml file"
date = 2021-11-04
[taxonomies]
categories=["it"]
tags=["docker", "swarm", "docker-compose", "compose"]
[extra]
author = "Thomas Chartron"
avatar = "/img/tchartron.png"
+++

## Create a docker swarm cluster using a docker-compose file and traefik reverse proxy

___

Example git repository for compose project used : 

```shell
# install docker on all machines (i use a single node for now)
# using debian
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add non root user to docker group to allow him to run docker
sudo groupadd docker
sudo usermod -aG docker $USER
# Start on boot 
sudo systemctl enable docker.service
sudo systemctl enable containerd.service

# Use an image registry
# Create gitlab access token with write_registry and read_registry
# Login to registry
docker login registry.gitlab.com -u tchartron -p my_gitlab_access_token
# Build images
docker compose -f docker-compose.swarm.yml build [--no-cache]
# Push images
docker push registry.gitlab.com/monprojet/web/projet-php:0.1
docker push registry.gitlab.com/monprojet/web/projet-mysql:0.1
docker push registry.gitlab.com/monprojet/web/projet-nginx:0.1
docker push registry.gitlab.com/monprojet/web/projet-mercure:0.1

# Initialize the swarm on the manager node
docker swarm init
# Add workers eventually
# Create overlay network
docker network create -d overlay projet_overlay
# Get nodes
docker node ls
# Add label to match defined placement constraint (from docker-compose file) for mysql container as it is pinned to a specific host
docker node update --label-add hostname=manager_1 vmroytpjhydkmnrl4nj4levtg
# Deploy the stack
docker stack deploy --with-registry-auth --compose-file docker-compose.swarm.yml projet
# Deploy the stack with preprocessing to interpolate env vars !
(echo -e "version: '3.8'\n";  docker compose -f docker-compose.swarm.yml config) | docker stack deploy --with-registry-auth --compose-file - projet
# Prod deploy
docker stack deploy --with-registry-auth --compose-file docker-compose.swarm.prod.yml projet

#Test to see if it's loadbalanced and other behaviors
#Test scaling php
```

## Troubleshooting and useful commands

```shell
#Find why container does not start
docker service ps --no-trunc projet_mysql
#OR if on linux (above command does not show every errors)
journalctl -u docker.service | tail -n 50 

#Logs of running service
docker service logs projet_traefik -f

#Leave the swarm and destroy it's services and containers
docker swarm leave --force

#This explains how to communicate to service with hostname 
https://stackoverflow.com/questions/55039198/docker-swarm-how-to-communicate-to-other-services-through-their-hostname-only
``
