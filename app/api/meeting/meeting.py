# pip3 install requests
# pip3 install requests
import requests
import json

API_KEY = "oenodlive_default_secret"
OENODLIVE_URL = "https://oenod.live/api/v1/meeting"
# OENODLIVE_URL = "http://localhost:3010/api/v1/join"

headers = {
    "authorization": API_KEY,
    "Content-Type": "application/json",
}

response = requests.post(
    OENODLIVE_URL,
    headers=headers
)

print("Status code:", response.status_code)
data = json.loads(response.text)
print("meeting:", data["meeting"])
