# pip3 install requests
import requests
import json

API_KEY = "odnodlive_default_secret"
OENODLIVE_URL = "https://oenod.live/api/v1/join"
# OENODLIVE_URL = "http://localhost:3010/api/v1/join"

headers = {
    "authorization": API_KEY,
    "Content-Type": "application/json",
}

data = {
    "room": "test",
    "password": "false",
    "name": "odnodlive",
    "audio": "true",
    "video": "true",
    "screen": "true",
    "notify": "true",
}

response = requests.post(
    OENODLIVE_URL,
    headers=headers,
    json=data,
)

print("Status code:", response.status_code)
data = json.loads(response.text)
print("join:", data["join"])
