pipeline {
    // Run Script on server 1
    agent {label 'server1-hari'}

    // Setup Tools Node
    tools {nodejs 'nodejs'}

    // Running CI/CD Pipeline
    stages {
        // 
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/Harrywithrian/simple-apps.git'
            }
        }
        stage('Build') {
            steps {
                sh '''cd apps
                npm install'''
            }
        }
        stage('Testing') {
            steps {
                sh '''cd apps
                npm test
                npm run test:coverage'''
            }
        }
        stage('Code Review') {
            steps {
                sh '''cd apps
                sonar-scanner \
                -Dsonar.projectKey=simple-apps \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://172.23.10.105:9000 \
                -Dsonar.login=sqp_91750a0adf4edbe888a5cca745c7ed1ca32ac0c3'''
            }
        }
        stage('Deploy compose') {
            steps {
                sh '''
                docker compose build
                docker compose up -d
                '''
            }
        }
    }
}