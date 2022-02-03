# irish_pubs, pubs

# import required libraries
import requests
import json
import mysql.connector
import os
from dotenv import load_dotenv


# get ENV variables
my_env = load_dotenv(dotenv_path='../.env')

client_id = os.environ['YELP_CLIENT_ID']
api_key = os.environ['YELP_API_KEY']
URL = "https://api.yelp.com/v3/businesses/search?location=\"Washington DC\"&categories=irish_pubs&categories=pubs"


# authentication
HEADERS = {
        'Authorization': 'Bearer {}'.format(api_key),
    }

r = requests.get(url = URL, headers = HEADERS)
  
# extracting data in json format
data = r.json()

divebar_fpath = "./yelp_jsons/yelp_all_pubs.json"

with open(divebar_fpath, 'w') as outfile:
    json.dump(data, outfile)

yelp_api_results = json.load(open(divebar_fpath))

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
    # FIX ME: HARDCODED CAT ID DANCE
    category_val = (bars['id'], 7)
    sqlcursor.execute(insert_categories, category_val)
    con.commit()

# close DB con
con.close()


