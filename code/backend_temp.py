from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://maitreyapchitale:3jrPBDsOFqwvyuZr@bionovus.vklbulv.mongodb.net/temp_sensor"
mongo = PyMongo(app)

@app.route('/store_db', methods=['POST'])
def store_db():
    temp = 32
    timestamp = "11:10AM"
    mongo.db.temp.insert_one({
        "_id": timestamp,
        "temp": temp
    })
    return

@app.route('/gen_graphs')
def generate_graphs():
    data = list(mongo.db.temp.find())
    print(data)
    timestamps = [d['_id'] for d in data]
    temperatures = [d['temp'] for d in data]
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(timestamps, temperatures)
    # Rotate the x-axis labels for better visibility
    timestamps_2 = [d['_id'] for d in data]
    temperatures_2 = [d['temp'] + 2 for d in data]
    ax.plot(timestamps_2, temperatures_2, color='green')
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
    # store_db()
    generate_graphs()
    # clear_data()

if __name__ == '__main__':
    main()
