#!/bin/bash

echo "Q" | openssl s_client  -connect $1:443 2>&1 | grep "Let's Encrypt Authority" | wc -l | tr -d " \t\n\r"
