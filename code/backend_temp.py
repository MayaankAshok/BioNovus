from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask, request, jsonify

import matplotlib.pyplot as plt
import matplotlib.dates as mdates
app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://maitreyapchitale:3jrPBDsOFqwvyuZr@bionovus.vklbulv.mongodb.net/temp_sensor"
mongo = PyMongo(app)

@app.route('/store_temp', methods=['POST'])
def store_db():
    data = request.json
    timestamp = data.get('timestamp')
    temp =  data.get('temp')
    # temp = 16
    # timestamp = "10:56AM"
    print("Recorded temperature :", temp)
    mongo.db.temp.insert_one({
        "_id": timestamp,
        "temp": temp
    })
    return jsonify({
        'message': "Temperature logged"
    }), 200

@app.route('/gen_graphs')
def generate_graphs():
    data = list(mongo.db.temp.find())
    print(data)
    timestamps = [d['_id'] for d in data]
    temperatures = [d['temp'] for d in data]
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(timestamps, temperatures)
    # Rotate the x-axis labels for better visibility
    plt.setp(ax.get_xticklabels(), rotation=30, ha='right')
    ax.set_xlabel('Time')
    ax.set_ylabel('Temperature')
    ax.set_title('Temperature over Time')
    plt.tight_layout()
    plt.show()
    return

@app.route('/clear_data', methods=['POST'])
def clear_data():
    mongo.db.temp.delete_many({})

def main():
    store_db()
    generate_graphs()

if __name__ == '__main__':
    main()
