properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any

  environment {
    SERVICE_NAME = "designwizard-com"
    GITHUB_ORGANIZATION_NAME = "dw-frontend"
    NODE_ENV = getEnvName(env.BRANCH_NAME)
  }

  stages {
    stage('Preparation') {
      steps {
        cleanWs()

        echo 'Pulling... ' + env.BRANCH_NAME
        checkout scm
        sh 'git checkout ' + env.BRANCH_NAME
      }
    }

    stage('Merge master') {
      when {
          not {
              branch 'master'
          }
      }

      steps {
        sh 'git config user.email "wbmjenkins@cetin.info"'
        sh 'git config user.name "wbmJenkins"'
        sh 'git merge origin/master'
      }
    }

    stage('Build') {
      steps {
        sh 'npm install --unsafe-perm --legacy-peer-deps'
        sh 'CI=false npm run build'
      }
    }

    stage('Deploy to staging S3 bucket') {
      when {
        branch "staging"
      }

      steps {
        withAWS(region: 'eu-west-1', credentials: 'production-jenkins') {
          s3Upload(bucket:"dw.app.react.staging", workingDir:'./build', includePathPattern:'**/*', excludePathPattern:'**/node_modules/**/*');
        }
      }
    }


    stage('Invalidate staging CF Distro') {
      when {
        branch "staging"
      }

      steps {
        withAWS(region: 'eu-west-1', credentials: 'production-jenkins') {
          cfInvalidate(distribution:'E19PNYOSJLU0KZ', paths:['/*']);
        }
      }
    }

    stage('Deploy to production S3 bucket') {
      when {
        branch "master"
      }

      steps {
        withAWS(region: 'eu-west-1', credentials: 'production-jenkins') {
          s3Upload(bucket:"dw.app.react", workingDir:'./build', includePathPattern:'**/*', excludePathPattern:'**/node_modules/**/*');
        }
      }
    }


    stage('Invalidate production CF Distro') {
      when {
        branch "master"
      }

      steps {
        withAWS(region: 'eu-west-1', credentials: 'production-jenkins') {
          cfInvalidate(distribution:'E19IZXYQR2UHB2', paths:['/*']);
        }
      }
    }
  }
}

def getEnvName(branchName) {
    if("staging".equals(branchName)) {
        return "staging";
    } else if ("master".equals(branchName)) {
        return "production";
    } else {
        return "dev";
    }
}
