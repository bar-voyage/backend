#!/usr/bin/python3

import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from collections import OrderedDict

load_dotenv()
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

def show_rec_given_user(user_id):
    liked_bars_list, fin_liked_bars = [], []
    close_users_list = find_close_users(user_id)
    print("similar users found: " + str(close_users_list))
    for user in close_users_list:
        liked_bars_list.append(get_liked_bars(user))
    liked_bars_list = list((liked_bars_list))
    for bar in liked_bars_list:
        if (len(bar) != 0):
            for i in range(len(bar)):
                fin_liked_bars.append(bar[i])

    print("bars to recommend: " + str(set(fin_liked_bars)))
    return str(set(fin_liked_bars))

def find_close_users(user_id):
    user_id = str(user_id)
    row_list = []
    con = connect_db()
    cursor = con.cursor()
    try: 
        cursor.execute("SELECT user_id FROM users WHERE age=(SELECT age FROM users WHERE user_id="+ user_id+") \
                                                    AND gender=(SELECT gender FROM users WHERE user_id="+user_id+") \
                                                    AND user_id !="+user_id+";")
        rows = cursor.fetchall()
        close_db(con)
        for row in rows:
            # print(row[0])
            row_list.append(row[0])
        return row_list
    except Error as e:
        print("Error executing query", e)
        close_db(con)

def get_liked_bars(user_id):
    row_list = []
    con = connect_db()
    cursor = con.cursor()
    try: 
        cursor.execute("SELECT bar_id FROM ratings WHERE user_id=" + str(user_id) + " AND stars >= '"+str(3.5)+"';")
        rows = cursor.fetchall()
        close_db(con)
        for row in rows:
            row_list.append(row[0])
        return row_list
    except Error as e:
        print("Error executing query", e)
        close_db(con)
    
def connect_db():
    try:
        con = mysql.connector.connect(host=DB_HOST,
                                        database=DB_NAME,
                                        user=DB_USER,
                                        password=DB_PASSWORD)
        return con
    except Error as e:
        print("Error while connecting to MySQL", e)

def close_db(con):
    if con.is_connected():
        con.close()

def main():
    show_rec_given_user(93)

if __name__ == "__main__":
    main()
