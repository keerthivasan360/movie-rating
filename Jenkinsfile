pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CRED = 'docker-hub-credentials'
        DOCKER_IMAGE_NAME = 'keerthivasan360/movie-rating'
        IMAGE_TAG = "latest"
    }
    
    stages {
        stage('Checkout GITHUB') {
            steps {
                echo 'Checking out source code...'
                git branch: 'main', url: 'https://github.com/keerthivasan360/movie-rating.git'
            }
        }
        
        stage('Create Docker image') {
            steps {
                echo 'Building Docker image...'
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CRED}") {
                        dockerImage.push()
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                // Using kubectl to apply manifests. Assumes kubectl is configured on the Jenkins node.
                sh 'kubectl apply -f k8s-manifest.yaml'
            }
        }
        
        stage('Show Deployed Application') {
            steps {
                echo 'Validating deployment and NodePort service...'
                sh 'kubectl get svc movie-rating-service'
                sh 'kubectl get pods -l app=movie-rating'
            }
        }
    }
}
