#!/usr/bin/env groovy

pipeline {
    
    agent any
    
    environment {
        NEW_VERSION = "0.1"
        ANSIBLE_SERVER = "142.93.59.204"
    }
    
    parameters {
        booleanParam(name: 'executeTest', defaultValue: false, description: '')
        booleanParam(name: 'executeBuild', defaultValue: false, description: '')
        booleanParam(name: 'executeAnsibleProvision', defaultValue: true, description: '')
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
                      sh "docker build -t marcosjampietri/three-docker-repo:${NEW_VERSION} ./client"
                      sh "docker build -t marcosjampietri/api:${NEW_VERSION} ./server"
                      sh "docker build -t marcosjampietri/nginx:${NEW_VERSION} ./nginx"
                      
                      sh 'echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_ID} --password-stdin'
                      
                      sh "docker push marcosjampietri/three-docker-repo:${NEW_VERSION}"
                      sh "docker push marcosjampietri/api:${NEW_VERSION}"
                      sh "docker push marcosjampietri/nginx:${NEW_VERSION}"
                  }
               }
            }
        }
        
        stage("Ansible Provision") {
            steps {
                script {                
                    echo "copying ansible folder, docker-compose and pem from jenkins to Ansible Droplet... don't bother"
                    
                    sshagent(['ansible_server_key']) {
                        sh "scp -o StrictHostKeyChecking=no ansible/* root@${ANSIBLE_SERVER}:/root"
                        sh "scp -o StrictHostKeyChecking=no docker-compose.yaml root@${ANSIBLE_SERVER}:/root"
                        withCredentials([sshUserPrivateKey(credentialsId: 'Marcos-ec2-default', keyFileVariable: 'KEYFILE', usernameVariable: 'USER')]) {
                            sh 'scp $KEYFILE root@$ANSIBLE_SERVER:/root/Marcos-ec2-default.pem'
                        }
                    }
                }
            }
        }
        
        stage("Terraform Provision") {
            
            environment {
                AWS_ACCESS_KEY_ID = credentials('jenkins_aws_access_key_id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins_aws_secret_access_key')
                MY_IP = credentials('my_ip')          
                JEN_IP = credentials('jenkins_ip')        
                ANS_IP = credentials('ansible_ip')        
            }
            
            steps {
                script {
                    echo 'provisioning server on AWS'
                    
                    dir('terraform') {
                        sh "terraform init"
                        sh(script: "terraform apply \
                            -var 'my_ip=$MY_IP' \
                            -var 'jenkins_ip=$JEN_IP' \
                            -var 'ansible_ip=$ANS_IP' \
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
                    sleep(time: 10, unit: "SECONDS")
                    
                    echo "running playbook to configure ec2 instances.... give me a break"
                    
                    def remote = [:]
                    remote.name = "ansible-droplet"
                    remote.host = env.ANSIBLE_SERVER
                    remote.allowAnyHosts = true
                    
                    withCredentials([sshUserPrivateKey(credentialsId: 'ansible_server_key', keyFileVariable: 'AN_KEYFILE', usernameVariable: 'AN_USER')]) {
                        remote.user = AN_USER
                        remote.identityFile = AN_KEYFILE
                        sshCommand remote: remote, command: "ansible-playbook docker-ec2-playbook.yaml --extra-vars '@pass.json'"  
                    }                    
                }
            }
        }
        
        stage('Deploy and Run') {
            
            environment {
                DOCKER_CRED = credentials('dockerhub-cred')
                MONGO_STRING = credentials('mongo-string-cred')
            }
            
            steps {
                script {
                    sleep(time: 10, unit: "SECONDS")
                    
                    echo 'Deploying all the stuff to EC2...'
                    echo "${EC2_IP}"
                    
                    def shellCmd = 'bash ./three-build.sh $DOCKER_CRED_USR $DOCKER_CRED_PSW'
                    
                    def ec2Instance = "ec2-user@${EC2_IP}"
                      
                    sshagent(['Marcos-ec2-default']) {
                       sh "scp -o StrictHostKeyChecking=no three-build.sh ${ec2Instance}:/home/ec2-user"
                       sh "scp -o StrictHostKeyChecking=no docker-compose.yaml ${ec2Instance}:/home/ec2-user"
                       withCredentials([file(credentialsId: 'compose-vars', variable: 'ENV_FILE')]) {
                            sh 'scp -o StrictHostKeyChecking=no $ENV_FILE ${ec2Instance}:/home/ec2-user/.env.prod'
                           }
                       sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${shellCmd}"
                   }
                }
            }
        }
       
    }
}
