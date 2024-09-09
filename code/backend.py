"""
This file contains a Flask application that provides endpoints for user authentication, 
user management, and sample management.
"""

from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask, request, jsonify
import bcrypt
import base64
from image_proc import get_intensity
app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://maitreyachitale:maitreyachitale@bionovusinc.uyz7d1l.mongodb.net/db"
mongo = PyMongo(app)

CURR_USER = ''
CURR_ROLE = ''

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

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    existing_user = mongo.db.users.find_one({'_id': user_name})
    if existing_user:
        return jsonify({
            'error': 'User already exists'
        }), 403

    mongo.db.users.insert_one({
        '_id': user_name,
        'password': hashed_password,
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
    global CURR_ROLE

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
    })
    if existing_user:
        hashed_password = existing_user.get('password')
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            CURR_USER = user_name
            CURR_ROLE = existing_user['category']
            return jsonify({
                'message': "Login was successful",
                'user_name' : user_name,
                'category' : existing_user['category']
                }), 201

    return jsonify({
        'error': "Password and UserName do not match."
    }), 404

@app.route('/display_U',methods=['GET'])
def display_u():
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

@app.route('/display_U_except_curr', methods=['GET'])
def display_u_except_curr():
    """
    Endpoint to display all users, excluding one specific user.

    Returns:
        jsonify: A JSON response containing user IDs and their roles.
    """
    global CURR_USER
    query = {'_id': {'$ne':CURR_USER}}
    print(query)
    # Find all users except the one specified by the query
    all_users_data = mongo.db.users.find(query)

    users = []

    for user in all_users_data:
        users.append({
            'id': str(user['_id']),  # Convert ObjectId to string
            'role': user['category']
        })

    return jsonify(users), 202

@app.route('/delete_U/<string:user_id>',methods=['DELETE'])
def delete_u(user_id):
    """
    Endpoint to delete a user by ID.

    Args:
        user_id (str): The ID of the user to be deleted.

    Returns:
        jsonify: A JSON response indicating whether the user was deleted successfully or not.
    """

    try:
        result_users = mongo.db.users.delete_one({'_id': user_id})
        result_samples = mongo.db.samples.delete_many({'u_id':user_id})
        if result_users.deleted_count > 0:
            return jsonify({'message': 'User deleted successfully'})
        return jsonify({'message': 'User not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/display_S',methods=['GET'])
def display_s():
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
            'type': sample['type'],
            'u_name': sample['u_id'],
            'intensity':sample['intensity']
        })

    return jsonify(samples), 202

@app.route('/delete_S/<string:sample_id>',methods=['DELETE'])
def delete_s(sample_id):
    """
    Endpoint to delete a sample by ID.

    Args:
        sample_id (str): The ID of the sample to be deleted.

    Returns:
        jsonify: A JSON response indicating whether the sample was deleted successfully or not.
    """

    try:

        all_samples_data=mongo.db.samples.find()
        result_sample = mongo.db.samples.delete_one({'_id': sample_id})
        u_id=result_sample['_id']
        print(u_id)
        count_samples_with_u_id=0
        for sample in all_samples_data:
            if sample['u_id']==u_id:
                count_samples_with_u_id += 1
        print(count_samples_with_u_id)
        if result_sample.deleted_count > 0:
            return jsonify({'message': 'Sample deleted successfully'})
        return jsonify({'message': 'Sample not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/insert_sample', methods=['POST'])
def insert_sample():
    """
    Endpoint to enter a sample using the start test button.

    Returns:
        A JSON response indicating whether the sample was inserted or not.
    """

    data = request.json
    s_id = data.get('s_id')
    s_type = data.get('s_type')
    with open('cache/pic.jpg', 'wb') as file:
        file.write(base64.b64decode( data["s_data"]))
    intensity = get_intensity('cache/pic.jpg')

    print (intensity)

    if not s_id or not s_type or not intensity:
        return jsonify({
            'error': 'All fields are required'
        }), 401

    global CURR_USER
 
    existing_samples = mongo.db.samples.find_one({
        '_id': s_id,
        'type': s_type,
        'u_id': CURR_USER,
        'intensity':intensity
    })

    if existing_samples:
        return jsonify({
            'error': 'Sample already exists'
        }), 402

    s_type = s_type.lower()
    mongo.db.samples.insert_one({
        '_id': s_id,
        'type': s_type,
        'u_id': CURR_USER,
        'intensity':intensity
    })

    return jsonify({
        'message': "Sample inserted successfully"
    }), 200

@app.route('/edit_sample', methods=['POST'])
def edit_sample():
    """
    Endpoint to edit a specific sample.

    Returns:
        A JSON response stating if the edit was succesful or not.
    """

    data = request.json
    old_id = data.get('old_id')
    new_id = data.get('s_id')
    new_type = data.get('type')

    if not old_id or not new_type or not new_id:
        return jsonify({
            'error': 'All fields are required'
        }), 401

    existing_sample = mongo.db.samples.find_one({
        '_id': old_id
    })

    if not existing_sample:
        return jsonify({
            'error': 'Sample does not exist'
        }), 402

    old_intensity = existing_sample['intensity']
    existing_sample = mongo.db.samples.find_one({
        '_id': new_id
    })

    if existing_sample:
        return jsonify({
            'error': 'The new sample ID already exists'
        }), 404

    mongo.db.samples.delete_one({'_id': old_id})

    mongo.db.samples.insert_one({'_id': new_id, 'type': new_type, 'u_id': CURR_USER, 'intensity':old_intensity})

    return jsonify({
        'message': 'Updation was succesfull'
    }), 200

@app.route('/new_user', methods=['POST'])
def new_user():

    """
    Endpoint to register a new user by the admin or reviewer.

    Returns:
        jsonify: A JSON response indicating whether the user registration was successful or not.
    """

    data = request.json
    user_name = data.get('username')
    user_name = user_name.lower()
    password = data.get('password')
    repassword = data.get('repassword')
    role = data.get('role')

    if not user_name or not password:
        return jsonify({
            'error': 'All fields are required'
        }), 401

    if password != repassword:
        return jsonify({
            'error': "password and repassword do not match"
        }), 402
    
    if repassword == role:
        return jsonify({
            'error': "password cannot be one of the roles or role is not selected"
        })

    existing_user = mongo.db.users.find_one({'_id': user_name})
    if existing_user:
        return jsonify({
            'error': 'User already exists'
        }), 403

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    mongo.db.users.insert_one({
        '_id': user_name,
        'password': hashed_password,
        'category': role
    })

    return jsonify({
        'message': "User registered succesfully"
    }), 200

@app.route('/display_R',methods=['GET'])
def display_r():
    """
    Endpoint to display all samples.

    Returns:
        jsonify: A JSON response containing sample IDs and their categories.
    """

    all_samples_data=mongo.db.samples.find()

    samples = []
    global CURR_USER
    global CURR_ROLE
    if CURR_ROLE == 'operator':
        for sample in all_samples_data:
            if sample['u_id'] == CURR_USER:
                samples.append({
                    'id': str(sample['_id']),  # Convert ObjectId to string
                    'type': sample['type'],
                    'intensity':round(sample['intensity'],2)
                })
    else:
        for sample in all_samples_data:
            samples.append({
                'id': str(sample['_id']),  # Convert ObjectId to string
                'type': sample['type'],
                'intensity':round(sample['intensity'],2)
            })

    return jsonify(samples), 202

if __name__ == '__main__':
    app.run(debug=True)
