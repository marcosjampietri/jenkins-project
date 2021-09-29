#!/usr/bin/env bash

export DOCKER_ID=$1
export DOCKER_PASSWORD=$2
export MONGO_STRING=$3

echo $DOCKER_PASSWORD | docker login -u $DOCKER_ID --password-stdin
DATABASE="$MONGO_STRING" docker-compose -f docker-compose.yaml up --detach
