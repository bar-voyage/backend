# importing the requests library
import requests
import json
import mysql.connector
import os

from dotenv import load_dotenv
from pathlib import Path

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

with open('yelp_api_sports.json', 'w') as outfile:
    json.dump(data, outfile)

yelp_api_results = json.load(open("./yelp_api_sports.json"))

# get ENV variables for SQL connection
my_env = load_dotenv(dotenv_path='./.env')

# connect to database
con = mysql.connector.connect(user=os.environ['DB_USER'], 
                                password=os.environ['DB_PASSWORD'],
                                host=os.environ['DB_HOST'],
                                database=os.environ['DB_NAME'])
sqlcursor = con.cursor()

# insert sports bars + categories
for bars in yelp_api_results["businesses"]:
    insert_bars = "INSERT IGNORE INTO bar (yelp_id, name, latitude, longitude, address, city, zip, state, is_open) \
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    bar_val = (bars["id"], bars["name"], bars["coordinates"]["latitude"], bars["coordinates"]["longitude"], bars["location"]["address1"], \
                bars["location"]["city"], bars["location"]["zip_code"], bars["location"]["state"], bars["is_closed"]);
    sqlcursor.execute(insert_bars, bar_val)
    con.commit()

    insert_categories = "INSERT IGNORE INTO bar_type (yelp_id, category_id) VALUES (%s, %s)"
    # FIX ME: HARDCODED CAT ID FOR SPORTS
    category_val = (bars['id'], 1)
    sqlcursor.execute(insert_categories, category_val)
    con.commit()

# close DB con
con.close()
