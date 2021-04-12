#!/bin/bash

echo "deploy-test.sh | START"
echo "deploy-test.sh | SSH TO STAGING, CREATE DIRECTORY"
ssh ubuntu@staging << EOF
  mkdir -p /home/ubuntu/bns-dashboard
EOF
echo "deploy-test.sh | RUN SCP TO STAGING"
scp -r /tmp/bns-dashboard/test/dist/* ubuntu@staging:/home/ubuntu/bns-dashboard
echo "deploy-test.sh | DELETE TEMP FILE"
rm -rf /tmp/bns-dashboard/test
echo "deploy-test.sh | END"
