pipeline {
     agent {lable "test-server"}
        environment {
        registryName = "testdatadaanrepo"
        registryUrl = "testdatadaanrepo.azurecr.io"
        registryCredential = "ACR"
        dockerImage = 'testdatadaanrepo'
	    webAppResourceGroup = 'Rg-Amit'
	    webAppName = 'testdatadaanrepo'
    }
stages {
    stage('checkout') {
        steps {
            checkout scm
            }
    }

    stage ('build image') {
        steps {        
            script {
                dockerImage = docker.build("${registryName}:${env.BUILD_ID}")
                }      
            }
    }

    stage('push to ACR') {
        steps{   
            script {
                docker.withRegistry( "http://${registryUrl}", registryCredential ) {
                dockerImage.push()
                }
            }
        }
    }
    
    stage('deploy to appservice') {
        steps {
            withCredentials([
            string(credentialsId: 'app-id', variable: 'username'),
            string(credentialsId: 'tenant-id', variable: 'tenant'),
            string(credentialsId: 'app-id-pass', variable: 'password')
            ]) {
            sh """
                /usr/local/bin/az login --service-principal -u ${username} -p ${password} --tenant ${tenant}
                /usr/local/bin/az  webapp config container set --name datadaan-test --resource-group Rg-Amit  --docker-custom-image-name=testdatadaanrepo.azurecr.io/testdatadaanrepo:${env.BUILD_ID}
                """
            }
        }
    }
    
}
    }