# README

## Aim

The aim of this project is to create a webapp for a biosensor.

## Technologies used

### React and NodeJS

1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

2. Libraries used are:

```
import React,{useState} from "react"
import axios from 'axios'
import { Link,useNavigate } from "react-router-dom";
```

### MongoDB and Flask

1. MongoDB was used as the database and Flask served as the endpoints for user authentication etc.

2. Libraries used are:

```
from essentials import clear_screen
from essentials import TextColors
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask, request, jsonify
import bcrypt
from bson.objectid import ObjectId
```

## Running the webapp

`npm start`

In the project directory /code/nav-bar, you can run:
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`python3 backend.py`

This command in the project directory /code will help to run the backend flask.

## Project Directory Structure

In the project directory structure is as described below :

```
.
├── code
│   ├── img
│   ├── nav-bar
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
2. `/code/nav-bar/src` directory contains the main Javascipt file `App.js` and `index.js` for the whole web-app.
3. `/code/nav-bar/src/pages` directory contains all code files to all the relevant pages on the web-app
4. `/docs` directory contains the all relevant documentation related to the project.
5. `/MOM` directory contains MOM's to all the meetings we had with our client


<!-- `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
