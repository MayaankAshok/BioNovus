import os
import glob
import time
import requests
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
 
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
 
def read_temp_raw():
    # return 0
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    # return 24
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
    if interval != -1:
        r = requests.post('http://localhost:5000/store_temp', json={"timestamp": str(time.time()), "temp": read_temp()})
    else:
        r = requests.post('http://localhost:5000/store_temp', json={"timestamp": str(time.time()), "temp": -1000})

    print("Reading Temp")
    if r.status_code != 200:
        print ("Error sending")
        print(r.status_code, r.reason)
        break
    interval = r.json().get("interval")
    print("Recd: ", interval)
    if interval == -1:

        time.sleep(10 - time.time() + last_time)
    else:
        next_interval= interval - time.time() + last_time
        print(next_interval)
        if next_interval>0:
            time.sleep(next_interval)