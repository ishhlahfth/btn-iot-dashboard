#!/bin/bash

scp -r /tmp/${BITBUCKET_REPO_UUID}/${BITBUCKET_DEPLOYMENT_ENVIRONMENT}/dist ubuntu@staging:/home/ubuntu/bns-dashboard
rm -rf /tmp/${BITBUCKET_REPO_UUID}/${BITBUCKET_DEPLOYMENT_ENVIRONMENT}
