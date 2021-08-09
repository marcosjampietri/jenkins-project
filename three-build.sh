#!/usr/bin/env bash

export DOCKER_ID=$1
export DOCKER_PASSWORD=$2

echo $DOCKER_PASSWORD | docker login -u $DOCKER_ID --password-stdin
docker-compose -f docker-compose.yaml up --detach
