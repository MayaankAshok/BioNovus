import pymongo

client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
db = client['bionuvus']
users_collection = db['users']
samples_collection = db['samples']

user_data = {
    "_id": "admin_m",
    "password": "a_m",
    "age": 19,
    "category": "admin"
}

users_collection.insert_one(user_data)