from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime
import pandas as pd

TEMP_LIMIT = 30

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://maitreyapchitale:3jrPBDsOFqwvyuZr@bionovus.vklbulv.mongodb.net/temp_sensor"
mongo = PyMongo(app)

# default interval between temperature measurements
# interval = -1 means dont read from the temperature sensor
interval = 10

# called by the temperature sensor to post the measurements 
@app.route('/store_temp', methods=['POST'])
def store_db():
    global interval
    data = request.json
    timestamp = data.get('timestamp')
    temp =  data.get('temp')

    if temp == -1000: # only returned if the interval is set to -1. (ie. sensor not being read from)
        print("Skipped recording")
    else:
        print("Recorded temperature :", temp)
        mongo.db.temp.insert_one({
            "_id": timestamp,
            "temp": temp
        })
    
    # return the interval to specify the gap to the next measurement 
    return jsonify({
        'message': "Temperature logged",
        'interval' : interval
    }), 200

# UI can set the measurement interval
# interval < 0  means disable the sensor
@app.route('/set_interval', methods=['POST'])
@cross_origin()
def set_interval():
    global interval
    data = request.json
    interval_ = data.get('interval')
    try : 
        
        interval = float(interval_)
        if interval < 0 : interval = -1
        print("Set interval :" , interval)
    except: 
        print("Cant convert interval into float ")
        pass
    return jsonify({
        'message': "Set Interval",
    }), 200

# Read from all stored temperature readings and get min-max along with timestamp
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

    # Convert unix timestamp to readable format
    ts_min = float(time_min)
    time_min = datetime.utcfromtimestamp(ts_min).strftime('%Y-%m-%d %H:%M:%S')

    ts_max = float(time_max)
    time_max = datetime.utcfromtimestamp(ts_max).strftime('%Y-%m-%d %H:%M:%S')

    print(f"Minimum Temperature: {min_temp} at {time_min}")
    print(f"Maximum Temperature: {max_temp} at {time_max}")
    return min_temp,time_min,max_temp,time_max

# return a graph of the stored temperature measurements and min-max temperatures
@app.route('/analysis', methods=['GET'])
def generate_graphs():
    global TEMP_LIMIT
    TEMP_LIMIT = int(TEMP_LIMIT)
    data = list(mongo.db.temp.find())
    timestamps = [d['_id'] for d in data]
    formatted_timestamps = []

    # create a matplotlib line graph of the temperature variations
    for ts in timestamps:
        ts_int = float(ts)
        ts_final = datetime.utcfromtimestamp(ts_int).strftime('%Y-%m-%d %H:%M:%S')
        formatted_timestamps.append(ts_final)
    timestamps = formatted_timestamps
    temperatures = [d['temp'] for d in data]
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(timestamps, temperatures)
    plot_temp = TEMP_LIMIT
    ax.axhline(y=plot_temp, color='r', linestyle='--', label=f'Temp Limit: {plot_temp}')

    # Rotate the x-axis labels for better visibility
    plt.setp(ax.get_xticklabels(), rotation=30, ha='right')
    ax.set_xlabel('Time')
    ax.set_ylabel('Temperature')
    ax.set_title('Temperature over Time')
    print(TEMP_LIMIT)

    # Set only 10 date labels along x axis to prevent clutter 
    max_xticks = 10
    xloc = plt.MaxNLocator(max_xticks)
    ax.xaxis.set_major_locator(xloc)

    plt.tight_layout()
    # Save the plot as a PNG image
    plt.savefig('temperature_plot.png', format='png')
    
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
    time_interval = int(time_interval)
    print(time_interval)
    # set any negative or zero to be = off
    # any positive will give appropriate interval
    return jsonify({
        'message': "Record set"
    }), 200

# convert all the database readings into a excel file and save it.
@app.route('/download_report', methods=['POST'])
def download_report():
    data = list(mongo.db.temp.find())
    timestamps = [d['_id'] for d in data]
    formatted_timestamps = []
    for ts in timestamps:
        ts_int = float(ts)
        ts_final = datetime.utcfromtimestamp(ts_int).strftime('%Y-%m-%d %H:%M:%S')
        formatted_timestamps.append(ts_final)
    timestamps = formatted_timestamps
    
    # Convert to pandas Dataframe
    temperatures = [d['temp'] for d in data]
    df = pd.DataFrame({'Timestamp': timestamps, 'Temperature': temperatures})
    
    # Saving to Excel file
    excel_file_path = 'temperature_data.xlsx'
    df.to_excel(excel_file_path, index=False)
    return jsonify({
        'message': "Report downloaded as excel file"
    }), 200

@app.route('/set_limit', methods=['POST'])
def set_limit():
    global TEMP_LIMIT
    data=request.json
    temp_limit = data['temp_limit']
    print(temp_limit)
    TEMP_LIMIT = temp_limit
    return jsonify({
        'message': "Limit set succesfully"
    }), 200

if __name__ == '__main__':
    # main()
    app.run(debug=True)
