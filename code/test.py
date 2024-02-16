import pymongo

client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
db = client['bionuvus']
users_collection = db['users']
samples_collection = db['samples']

users_collection.delete_one({'username': "maitreya"})