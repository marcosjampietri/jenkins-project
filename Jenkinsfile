#!/usr/bin/env groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = "1.x"
    }
    stages {
        stage('Test') {
            steps {
                script {
                   echo 'building docker image...'
                }
            }
        }
        stage('Build') {
            steps {
               script {
                  echo 'building application..'
                  withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_ID')]) {
                      sh "docker build -t marcosjampietri/three-docker-repo:1.2 ./client"
                      
                      sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_ID} --password-stdin"
                      
                      sh "docker push marcosjampietri/three-docker-repo:1.2"
                  }
               }
            }
        }
        stage("Ansible Provision") {
            steps {
                script {
                    echo "copying ansible folder from mac to server Droplet... don't bother"
                }
            }
        }
        stage("Terraform Provision") {
            steps {
                script {
                    echo "Setting up ec2 instances..."
                }
            }
        }
        stage('deploy') {
            steps {
                script {
                   echo 'Deploying all the stuff...'
                   sshagent(['Marcos-ec2-default']) {
                       sh "echo 'Ready to use the ec2 instance key'"
                   }
                }
            }
        }
    }
}
