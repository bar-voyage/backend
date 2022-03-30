import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans
from surprise.model_selection import train_test_split
from surprise import accuracy

# load_data.py
reader = Reader(line_format='user item rating timestamp', sep=',', rating_scale=(1, 5), skip_lines=1)
data = Dataset.load_from_file("./rec/test_ratings.csv", reader=reader)

# Similarity Predictions
sim_options = {
    "name": "cosine",
    "user_based": False,
}
# take into account the mean ratings of each user
algo = KNNWithMeans(sim_options=sim_options)

# Create Training Set using Data
# trainingSet = data.build_full_trainset()
trainset, testset = train_test_split(data, test_size=.25)
# print(trainingSet)

# Compute the cosine similarity matrix
algo.fit(trainset)

# Make a prediction
# prediction = algo.predict('64', 1090)
predictions = algo.test(testset)
print("length: " + str(len(predictions)))
for pred in predictions:
    print(pred)
accuracy.rmse(predictions)