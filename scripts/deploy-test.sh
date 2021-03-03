#!/bin/bash

scp -r "/tmp/${BITBUCKET_REPO_SLUG}/${BITBUCKET_DEPLOYMENT_ENVIRONMENT}/dist" ubuntu@staging:/home/ubuntu/bns-dashboard
rm -rf "/tmp/${BITBUCKET_REPO_SLUG}/${BITBUCKET_DEPLOYMENT_ENVIRONMENT}"
