#!/bin/bash

API_KEY="oenodlive_default_secret"
OENODLIVE_URL="https://oenod.live/api/v1/join"
# OENODLIVE_URL="http://localhost:3010/api/v1/join"

curl $OENODLIVE_URL \
    --header "authorization: $API_KEY" \
    --header "Content-Type: application/json" \
    --data '{"room":"test","password":"0","name":"oenodlive","audio":"1","video":"1","screen":"1","notify":"1"}' \
    --request POST