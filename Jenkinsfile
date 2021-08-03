#!/usr/bin/env groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = "1.x"
    }
    stages {
        stage('test') {
            steps {
               script {
                  echo 'building application'
                  withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_ID')]) {
                      sh "docker build -t marcosjampietri/three-docker-repo:1.2 ./client"
                      
                      sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_ID' --password-stdin"
                      
                      sh "docker push marcosjampietri/three-docker-repo:1.2"
                  }
               }
            }
        }
        stage('build') {
            steps {
                script {
                   echo 'building docker image...'
                }
            }
        }
    }
    post {
        
    }
}
