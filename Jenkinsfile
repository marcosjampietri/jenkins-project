#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('test') {
            steps {
               script {
                  echo 'building application'
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
}
