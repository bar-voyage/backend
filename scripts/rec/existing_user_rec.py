import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans
from surprise.model_selection import train_test_split
from surprise import accuracy

import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
import csv

load_dotenv()
con = None

DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

# get ratings data from db
def get_user_ratings():
    con = connect_db()
    row_list = []
    cursor = con.cursor()
    try: 
        cursor.execute("SELECT user_id, bar_id, stars FROM ratings;")
        rows = cursor.fetchall()
        close_db(con)
        with open('./rec/metadata.csv', 'w', newline='') as f_handle:
            writer = csv.writer(f_handle)
            header = ['user_id', 'bar_id', 'stars']
            writer.writerows(rows)
        
    except Error as e:
        print("Error executing query", e)
        close_db(con)


# load_data.py
def create_dataframe():
    reader = Reader(line_format='user item rating', sep=',', rating_scale=(1, 5), skip_lines=1)
    data = Dataset.load_from_file("./rec/metadata.csv", reader=reader)
    return data

def find_similar_users(data):
    # Similarity Predictions
    sim_options = {
        "name": "cosine",
        "user_based": False,
    }
    # take into account the mean ratings of each user
    algo = KNNWithMeans(sim_options=sim_options)
    return algo

def get_all_predictions(data, algo):
    # Create Training Set using Data
    # trainingSet = data.build_full_trainset()
    trainset, testset = train_test_split(data, test_size=.25)

    # Compute the cosine similarity matrix
    algo.fit(trainset)

    # Make a prediction
    predictions = algo.test(testset)
    print("length: " + str(len(predictions)))
    for pred in predictions:
        print(pred)
    accuracy.rmse(predictions)
    return predictions

# given a list of bar_ids, return those that cross
def find_user_pref_bars(user_id):
    con = connect_db()
    cursor = con.cursor()
    user_pref_rows,user_prefs,pref_bars_list, fin_bars_list = [], [], [], []

    # get user's prefs 
    try: 
        cursor.execute("SELECT category_id FROM user_pref WHERE user_id=" + str(user_id) + ";")
        user_pref_rows = cursor.fetchall()
        for pref in user_pref_rows:
            user_prefs.append(pref[0])

        print("user prefs:")
        print(user_prefs)
        
        for i in range(len(user_prefs)):
            cursor.execute("SELECT bar_id FROM bar JOIN bar_type ON bar.yelp_id = bar_type.yelp_id \
                                                                WHERE bar_type.category_id=" + str(user_prefs[i])+ ";")
            all_bars = cursor.fetchall()
            for bar in all_bars:
                pref_bars_list.append(bar)
        
        for bar in pref_bars_list:
            fin_bars_list.append(bar[0])
        print("bars to recommend: " + str(len(fin_bars_list)) + "\n" + str(set(fin_bars_list)))
        
        close_db(con)
        return set(fin_bars_list)
    except Error as e:
        print("Error executing query", e)
        close_db(con)
    
def rank_bar_predictions(bars_to_predict_on, user_id, data, algo):
    # Create Training Set using Data
    # trainingSet = data.build_full_trainset()
    trainset, testset = train_test_split(data, test_size=.25)

    # Compute the cosine similarity matrix
    algo.fit(trainset)
    predictions = []
    # Make a prediction
    for bar in bars_to_predict_on:
        predictions.append(algo.predict(user_id, bar))
        print(algo.predict(user_id, bar))
    # print(predictions)
    return predictions


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
    get_user_ratings()
    data = create_dataframe()
    algo = find_similar_users(data)
    bars_to_predict_on = find_user_pref_bars(69)
    rank_bar_predictions(bars_to_predict_on, 69, data, algo)

if __name__ == "__main__":
    main()
