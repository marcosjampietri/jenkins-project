#!/usr/bin/env groovy

pipeline {
    agent any
    environment {
        NEW_VERSION = "1.x"
    }
    parameters {
        booleanParam(name: 'executeTest', defaultValue: true, description: '')
        booleanParam(name: 'executeBuild', defaultValue: false, description: '')
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
        stage('Deploy and Run') {
            steps {
                script {
                   echo 'Deploying all the stuff...'
                   
                   def shellCmd = "bash ./three-build.sh ${DOCKER_CRED_URS} ${DOCKER_CRED_PSW}"
                   
                   def ec2Instance = "ec2-user@${EC2_IP}"
                   
                   sshagent(['Marcos-ec2-default']) {
                       sh "scp server-cmds.sh ${ec2Instance}:/home/ec2-user"
                       sh "scp docker-compose.yaml ${ec2Instance}:/home/ec2-user"
                       sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${shellCmd}"
                   }
                }
            }
        }
    }
}
