#!/bin/bash

API_KEY="oenodlive_default_secret"
OENODLIVE_URL="https://oenod.live/api/v1/meeting"
# OENODLIVE_URL="http://localhost:3010/api/v1/join"

curl $OENODLIVE_URL \
    --header "authorization: $API_KEY" \
    --header "Content-Type: application/json" \
    --request POST