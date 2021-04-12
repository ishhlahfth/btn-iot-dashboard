#!/bin/bash

echo "deploy-production.sh | START"
echo "deploy-production.sh | SSH TO PRODUCTION, CREATE DIRECTORY"
ssh ubuntu@public << EOF
  mkdir -p /home/ubuntu/bns-dashboard
EOF
echo "deploy-production.sh | RUN SCP TO PRODUCTION"
scp -r /tmp/bns-dashboard/production/dist/* ubuntu@public:/home/ubuntu/bns-dashboard
echo "deploy-production.sh | DELETE TEMP FILE"
rm -rf /tmp/bns-dashboard/production
echo "deploy-production.sh | END"
