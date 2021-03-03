#!/bin/bash

echo "BITBUCKET_REPO_SLUG: ${BITBUCKET_REPO_SLUG}"
echo "BITBUCKET_DEPLOYMENT_ENVIRONMENT: ${BITBUCKET_DEPLOYMENT_ENVIRONMENT}"

ssh ubuntu@staging "mkdir -p /home/ubuntu/bns-dashboard"
scp -r /tmp/${BITBUCKET_REPO_SLUG}/${BITBUCKET_DEPLOYMENT_ENVIRONMENT}/dist/* ubuntu@staging:/home/ubuntu/bns-dashboard
rm -rf /tmp/${BITBUCKET_REPO_SLUG}/${BITBUCKET_DEPLOYMENT_ENVIRONMENT}
