import os
import glob
import time
import requests

# Might have to be run separately with sudo permissions
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
 
# Find the temperature sensor connected as an IO device
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
 
def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    # Read the first temperature from the associated file. Clean the data and return as Celsius
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c

interval = 10
while True:
    last_time = time.time()
    
    # periodically post the measurements to the Flask server 
    if interval != -1: 
        r = requests.post('http://localhost:5000/store_temp', json={"timestamp": str(time.time()), "temp": read_temp()})
    else: # Temperature readings to be disabled
        r = requests.post('http://localhost:5000/store_temp', json={"timestamp": str(time.time()), "temp": -1000})

    if r.status_code != 200:
        print ("Error sending")
        print(r.status_code, r.reason)
        break
    
    # Read the new interval the server asks for
    interval = r.json().get("interval")
    
    # if temperature sensor is to be disabled, query the server again in 10 secs
    # else wait the specified interval and reread the temperature.
    if interval == -1:
        time.sleep(10 - time.time() + last_time)
    else: 
        next_interval= interval - time.time() + last_time # take into account the time taken to execute the request when calculating interval
        if next_interval>0:
            time.sleep(next_interval)