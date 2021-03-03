#!/bin/bash

ssh ubuntu@staging "mkdir -p /home/ubuntu/bns-dashboard"
scp -r /tmp/bns-dashboard/test/dist/* ubuntu@staging:/home/ubuntu/bns-dashboard
rm -rf /tmp/bns-dashboard/test
