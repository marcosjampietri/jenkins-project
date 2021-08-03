#!/usr/bin/env groovy

pipeline {
    
    agent any
    
    environment {
        NEW_VERSION = "1.x"
    }
    
    parameters {
        booleanParam(name: 'executeTest', defaultValue: false, description: '')
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
                      
                      sh 'echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_ID} --password-stdin'
                      
                      sh "docker push marcosjampietri/three-docker-repo:1.2"
                  }
               }
            }
        }
        
        stage("Ansible Provision") {
            steps {
                script {
                    
                    echo "copying ansible folder and pem from jenkins to Ansible Droplet... don't bother"
                    
                    sshagent(['ansible_server_key']) {
                        sh "scp -o StrictHostKeyChecking=no ansible/* root@46.101.47.136:/root"
                        withCredentials([sshUserPrivateKey(credentialsId: 'Marcos-ec2-default', keyFileVariable: 'KEYFILE', usernameVariable: 'USER')]) {
                            sh 'scp $KEYFILE root@46.101.47.136:/root/Marcos-ec2-default.pem'
                        }
                    }
                }
            }
        }
        
        stage("Terraform Provision") {
            
            environment {
                AWS_ACCESS_KEY_ID = credentials('jenkins_aws_access_key_id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins_aws_secret_access_key')
                SSH_KEY_SECRET = credentials('ssh_key_private')
                MY_IP = credentials('my_ip')          
                JEN_IP = credentials('jenkins_ip')          
            }
            
            steps {
                script {
                    echo 'provisioning server on AWS'
                    dir('terraform') {
                        sh "terraform init"
                        sh(script: "terraform apply \
                            -var 'my_ip=${MY_IP}' \
                            -var 'jenkins_ip=${JEN_IP}' \
                            -var 'ssh_key_private=${SSH_KEY_SECRET}' \
                            --auto-approve"
                        )
                        EC2_IP = sh(
                            script: "terraform output ec2_public_ip",
                            returnStdout: true
                        ).trim()
                       
                   }
                }
            }
        }
        
        stage("Play Ansible") {
            
            steps {
                script {
                    echo "running playbook to configure ec2 instances.... give me a break"
                    
                    def remote = [:]
                    remote.name = "ansible-droplet"
                    remote.host = "46.101.47.136"
                    remote.allowAnyHosts = true
                    
                    withCredentials([sshUserPrivateKey(credentialsId: 'ansible_server_key', keyFileVariable: 'AN_KEYFILE', usernameVariable: 'AN_USER')]) {
                        remote.user = AN_USER
                        remote.identityFile = AN_KEYFILE
                        sshCommand remote: remote, command: "ansible-playbook docker-ec2-playbook.yaml"  
                    }                    
                }
            }
        }
        
        stage('Deploy and Run') {
            
            environment {
                DOCKER_CRED = credentials('dockerhub-cred')
            }
            
            steps {
                script {
                    sleep(time: 90, unit: "SECONDS")
                    echo 'Deploying all the stuff to ${EC2_IP}'
                    
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
