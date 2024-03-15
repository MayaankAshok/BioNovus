"""
This file contains a Flask application that provides endpoints for user authentication, user management, and sample management.
"""

from essentials import clear_screen
from essentials import TextColors
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask, request, jsonify
from bson import ObjectId

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bionuvus"
mongo = PyMongo(app)

CURR_USER = ''

@app.route('/signup', methods=['POST'])

def signup():

    """
    Endpoint to register a new user.

    Returns:
        jsonify: A JSON response indicating whether the user registration was successful or not.
    """

    data = request.json
    user_name = data.get('username')
    user_name = user_name.lower()
    password = data.get('password')
    repassword = data.get('repassword')

    if not user_name or not password:
        return jsonify({
            'error': 'All fields are required'
        }), 401
    
    if password != repassword:
        return jsonify({
            'error': "password and repassword do not match"
        }), 402

    existing_user = mongo.db.users.find_one({'_id': user_name})
    if existing_user:
        return jsonify({
            'error': 'User already exists'
        }), 403
    
    mongo.db.users.insert_one({
        '_id': user_name,
        'password': password,
        'category': "operator"
    })

    return jsonify({
        'message': "User registered succesfully"
    }), 200

@app.route('/login', methods=['POST'])
def login():
    """
    Endpoint for user login.

    Returns:
        jsonify: A JSON response indicating whether the login was successful or not.
    """

    global CURR_USER

    data = request.json
    user_name = data.get('username')
    user_name = user_name.lower()
    password = data.get('password')

    if not user_name or not password:
        return jsonify({
            'error': 'All fields are required'
        }), 401
    
    existing_user = mongo.db.users.find_one({
        '_id': user_name,
        'password': password
    })

    if existing_user:
        CURR_USER = user_name
        return jsonify({
            'message': "Login was successful",
        }), 201
    
    return jsonify({
        'error': "Password and UserName do not match."
    }), 404

@app.route('/display_U',methods=['GET'])
def display_U():
    """
    Endpoint to display all users.

    Returns:
        jsonify: A JSON response containing user IDs and their roles.
    """

    all_users_data=mongo.db.users.find()
    users = []

    for user in all_users_data:
        users.append({
            'id': str(user['_id']),  # Convert ObjectId to string
            'role': user['category']
        })

    return jsonify(users), 202

@app.route('/delete_U/<string:user_id>',methods=['DELETE'])
def delete_U(user_id):
    """
    Endpoint to delete a user by ID.

    Args:
        user_id (str): The ID of the user to be deleted.

    Returns:
        jsonify: A JSON response indicating whether the user was deleted successfully or not.
    """

    try:
        result = mongo.db.users.delete_one({'_id': user_id})
        if result.deleted_count > 0:
            return jsonify({'message': 'User deleted successfully'})
        else:
            return jsonify({'message': 'User not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/display_S',methods=['GET'])
def display_S():
    """
    Endpoint to display all samples.

    Returns:
        jsonify: A JSON response containing sample IDs and their categories.
    """

    all_samples_data=mongo.db.samples.find()
    samples = []

    for sample in all_samples_data:
        samples.append({
            'id': str(sample['_id']),  # Convert ObjectId to string
            'type': sample['sample_type'],
            'user_id':sample['user_id']
        })

    return jsonify(samples), 202

@app.route('/delete_S/<string:sample_id>',methods=['DELETE'])
def delete_S(sample_id):
    """
    Endpoint to delete a user by ID.

    Args:
        user_id (str): The ID of the user to be deleted.

    Returns:
        jsonify: A JSON response indicating whether the user was deleted successfully or not.
    """

    try:
        result = mongo.db.samples.delete_one({'_id': sample_id})
        if result.deleted_count > 0:
            return jsonify({'message': 'Sample deleted successfully'})
        else:
            return jsonify({'message': 'Sample not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':  
    app.run(debug=True)