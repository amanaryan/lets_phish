#!/bin/bash

echo "Q" | openssl s_client  -connect $1:443 2>/dev/null | grep "Let's Encrypt Authority" | wc -l | tr -d " \t\n\r"
