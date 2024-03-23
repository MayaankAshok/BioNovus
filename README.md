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

## Running the webapp

In the project directory /code/nav-bar, you can run:

```bash
npm start
```

This Runs the app in the development mode.\
Open [http://localhost:3000] to view it in your browser.\
The page will reload when you make changes.\
You may also see any lint errors in the console.

```bash
python3 backend.py
```

This command in the project directory /code will help to run the backend Flask.

Note: Both of the commands are required to run the project.

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
4. `/docs` directory contains all relevant documentation related to the project.
5. `/MOM` directory contains MOMs for all the meetings we had with our client.
