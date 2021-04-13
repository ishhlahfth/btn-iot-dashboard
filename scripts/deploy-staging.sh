#!/bin/bash

echo "deploy-staging.sh | START"
echo "deploy-staging.sh | SSH TO STAGING, CREATE DIRECTORY"
ssh ubuntu@staging << EOF
  mkdir -p /home/ubuntu/bns-dashboard-stg
EOF
echo "deploy-staging.sh | RUN SCP TO STAGING"
scp -r /tmp/bns-dashboard/staging/dist/* ubuntu@staging:/home/ubuntu/bns-dashboard-stg
echo "deploy-staging.sh | DELETE TEMP FILE"
rm -rf /tmp/bns-dashboard/staging
echo "deploy-staging.sh | END"
