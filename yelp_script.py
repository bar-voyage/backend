# importing the requests library
import requests
import json

client_id = 'su_I7EgiWUkgGtErzncvtg'
api_key = 'IXccQhiUVYME-6ch4uN95vl0Wg6g_IYeGIJrgXOTZD5EeMJXEYNgBjlCchRQMEnVmgJkfs9EYlQdboh_R6OFPYHpOe4-fMH5Xx4klVorQN_Y6rSY_5eiJSp2A1f0YXYx'
URL = "https://api.yelp.com/v3/businesses/search?location=\"Washington DC\"&categories=sportsbars"


# authentication
HEADERS = {
        'Authorization': 'Bearer {}'.format(api_key),
    }

r = requests.get(url = URL, headers = HEADERS)
  
# extracting data in json format
data = r.json()

print(json.dumps(data, indent=4))