from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask, request, jsonify
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime

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

def min_max_temp():
    data = list(mongo.db.temp.find())
    
    min_temp = 10000000000
    max_temp = 0

    for item in data:
        print(item)
        temperature = item['temp']
        print(temperature)
        if temperature < min_temp:
            min_temp = temperature
            time_min=item['_id']
        if temperature > max_temp:
            max_temp = temperature
            time_max=item['_id']

    ts_min = float(time_min)
    time_min = datetime.utcfromtimestamp(ts_min).strftime('%Y-%m-%d %H:%M:%S')

    ts_max = float(time_max)
    time_max = datetime.utcfromtimestamp(ts_max).strftime('%Y-%m-%d %H:%M:%S')

    print(f"Minimum Temperature: {min_temp} at {time_min}")
    print(f"Maximum Temperature: {max_temp} at {time_max}")
    return min_temp,time_min,max_temp,time_max

@app.route('/analysis', methods=['GET'])
def generate_graphs():
    data = list(mongo.db.temp.find())
    timestamps = [d['_id'] for d in data]
    formatted_timestamps = []
    for ts in timestamps:
        ts_int = float(ts)
        ts_final = datetime.utcfromtimestamp(ts_int).strftime('%Y-%m-%d %H:%M:%S')
        formatted_timestamps.append(ts_final)
    timestamps = formatted_timestamps
    temperatures = [d['temp'] for d in data]
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(timestamps, temperatures)
    # Rotate the x-axis labels for better visibility
    # timestamps_2 = [d['_id'] for d in data]
    # temperatures_2 = [d['temp'] + 2 for d in data]
    # ax.plot(timestamps_2, temperatures_2, color='green')
    plt.setp(ax.get_xticklabels(), rotation=30, ha='right')
    ax.set_xlabel('Time')
    ax.set_ylabel('Temperature')
    ax.set_title('Temperature over Time')


    max_xticks = 10
    xloc = plt.MaxNLocator(max_xticks)
    ax.xaxis.set_major_locator(xloc)

    plt.tight_layout()
    # plt.show()

    # Save the plot as a PNG image
    image_buffer = BytesIO()
    plt.savefig(image_buffer, format='png')
    image_buffer.seek(0)
    plt.close()

    # Convert the image to base64 string
    image_base64 = base64.b64encode(image_buffer.getvalue()).decode('utf-8')
    min_temp, time_min, max_temp, time_max = min_max_temp()
    # print(min_temp)
    return jsonify({
        'min_temp': min_temp,
        'time_min': time_min,
        'max_temp': max_temp,
        'time_max': time_max,
        'image': image_base64
    })


@app.route('/clear_data', methods=['POST'])
def clear_data():
    mongo.db.temp.delete_many({})
    print("hello")
    return jsonify({
        'message': "All data deleted"
    }), 200

@app.route('/set_record', methods=['POST'])
def set_record():
    data=request.json
    time_interval = data['time_interval']
    print(time_interval)
    # set any negative or zero to be = off
    # any positive will give appropriate interval
    return jsonify({
        'message': "Record set"
    }), 200

@app.route('/download_report', methods=['POST'])
def download_report():
    

# def main():
#     # store_db()
#     # generate_graphs()
#     # min_max_temp()

if __name__ == '__main__':
    # main()
    app.run(debug=True)
