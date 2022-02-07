# importing the requests library
import requests
import json
import mysql.connector
import os
from pathlib import Path
from dotenv import load_dotenv

# get ENV variables
my_env = load_dotenv(dotenv_path='../.env')

# connect to database
con = mysql.connector.connect(user=os.environ['DB_USER'], 
                                password=os.environ['DB_PASSWORD'],
                                host=os.environ['DB_HOST'],
                                database=os.environ['DB_NAME'])
sqlcursor = con.cursor()

sqlcursor.execute("DELETE FROM bar_type");
con.commit()
con.close()