pipeline {
   agent { label "docker" }
   stages {
        stage ('WebLogger.Server - Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'bd77fbbe-d091-4d05-99bf-995f9c3bea79', url: 'git@github.com:lenchis001/WebLogger.git']]]) 
            }
        }
        stage ("Build image") {
            steps {
                sh "docker image build -t leon1996/weblogger-${ENV}:0.${BUILD_NUMBER} ."
            }
        }
        stage ("Stop and remove old version") {
            steps {
                sh "docker container stop weblogger-${ENV} || true && docker container rm weblogger-${ENV} || true"
            }
        }
        stage("Deploy new version") {
           steps {
               script {
                   int port=0
                   switch(ENV) {            
                    case "dev": 
                        port=4006 
                        break; 
                    case "qa": 
                        port=4005 
                        break; 
                    case "prod": 
                        port=4004
                        break; 
                    }

                    sh "docker container run -d --name weblogger-${ENV} -p ${port}:80 -e DATABASE_SERVER_ADDRESS=`docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' weblogger-${ENV}-mysql` --net weblogger --restart=unless-stopped leon1996/weblogger-${ENV}:0.${BUILD_NUMBER} "
                }
           }
       }
   }
}