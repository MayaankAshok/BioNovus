# README

## Aim

The aim of this project is to create a webapp for a biosensor.

## Technologies used

### React and NodeJS

1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
2. Libraries used are:
   ```javascript
   import React, {useState} from "react"
   import axios from 'axios'
   import {Link,useNavigate} from "react-router-dom";
   ```

### MongoDB and Flask

1. MongoDB was used as the database and Flask served as the endpoints for user authentication etc.
2. Libraries used are:
   ```python
   from flask_pymongo import PyMongo
   from flask_cors import CORS
   from flask import Flask, request, jsonify
   import bcrypt
   ```

## Running the Main App
On the Raspberry Pi, to enable the python venv, run:
```
source ~/test/bin/activate
```
Start the backend Flask server in `/code` with.

```bash
python3 backend.py
```

On a separate terminal start the React web app; In  `/code/app`, run:

```bash
npm install 
npm start
```
Open http://localhost:3000 in the browser to view the app.

## Running the raspberry pi with the temperature sensor connected.
On the Raspberry Pi, run :
```
source ~/test/bin/activate
```
From the `/code` folder run :
```
python3 backend_temp.py
```  
On a separate terminal, run:
```
source ~/test/bin/activate
sudo modprobe w1-gpio
sudo modprobe w1-therm
```
And from the `/code/temp_sens` run :
```
python3 script.py
```
---
On the desktop to start the web app to view analytics and trends, run the following from `/code/app_temp_sensor`:
```
npm install 
npm start
```
Open http://localhost:3000 in the browser to view the app.  
Note: you can set the local IP of the Raspberry Pi in `/code/app_temp_sensor/src/App.js`

## Project Directory Structure

In the project directory structure is as described below :

```
.
├── code
│   ├── img
│   ├── app
│   │   ├── node_modules
│   │   ├── public
│   │   └── src
│   ├── app_temp_sensor
│   │   ├── node_modules
│   │   ├── public
│   │   └── src
│   ├── temp_sens
│   ├── cache
│   └── __pycache__
├── docs
├── MoM
└── Pics
    ├── Project_images
    └── test
```

1. `/code` directory contains all the relevant code to the project.
2. `/code/app/src` directory contains the main JavaScript file `App.js` and `index.js` for the whole web-app.
3. `/code/app/src/pages` directory contains all code files for all the relevant pages on the web-app.
4. `/code/app_temp_sensor` is the main directory for the temperature sensor web-app. The `src` subfolder contains the code files.
5. `/code/temp_sens` contains the script that periodically reads the temperature sensor data and uploads to the flask server.
6. `/code/cache` is a folder used to temporarily store files received in the flask server.
7. `/docs` directory contains all relevant documentation related to the project.
8. `/MOM` directory contains MOMs for all the meetings we had with our client.
