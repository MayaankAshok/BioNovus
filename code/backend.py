# from essentials import clear_screen
# from essentials import TextColors
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask import Flask, request, jsonify
# from bson import ObjectId

# class Valid_Inputs:

#     sampleTypes = ['blood', 'urine', 'saliva']

# class Checker:

#     @staticmethod
#     def check_uname_signup(username, users_collection, signup_method):

#         user = users_collection.find_one({'_id': username})
#         if user:
#             clear_screen()
#             print(f"{TextColors.RED}Username exists. Press Enter to continue.{TextColors.END}")
#             inp = input()
#             signup_method()
#         else:
#             return
        
#     @staticmethod
#     def check_password_signup(password, re_password, signup_method):

#         if password == re_password:
#             return
#         else:
#             print(f"{TextColors.RED}Passwords do not match. Press Enter to continue.{TextColors.END}")
#             inp = input()
#             signup_method()

#     @staticmethod
#     def check_age_signup(age, signup_method):

#         try:
#             age = int(age)
#             return
#         except:
#             print(f"{TextColors.RED}Age should be an integer. Press Enter to continue.{TextColors.END}")
#             inp = input()
#             signup_method()

#     @staticmethod
#     def check_password_login(username, password, users_collection, login_method):

#         user = users_collection.find_one({'_id': username, 'password':password})
#         if user:
#             clear_screen()
#             return user
#         else:
#             print(f"{TextColors.RED}Incorrect password and username pair. Press Enter to continue.{TextColors.END}")
#             inp = input()
#             clear_screen()
#             user = login_method()
#             return user

#     @staticmethod
#     def check_uname_login(username, users_collection, signup_method, login_method):

#         user = users_collection.find_one({'_id': username})
#         if user:
#             return username
#         else:
#             clear_screen()
#             print(f"{TextColors.RED}Username doesn't exist.{TextColors.END}")
#             print()
#             print(f"{TextColors.YELLOW}1. SignUp{TextColors.END}")
#             print(f"{TextColors.YELLOW}2. Login{TextColors.END}")
#             print()
#             choice = input(f"{TextColors.BLUE}Chose an option from above to proceed: {TextColors.END}")
#             if choice == '1':
#                 signup_method()
#             elif choice == '2':
#                 username = login_method()
#                 return username

#     @staticmethod
#     def check_s_id(s_id, samples_collection, enter_sample_method, user_name):

#         sample = samples_collection.find_one({'_id': s_id})
#         if sample:
#             print(f"{TextColors.RED}Sample already exists, invalid sample ID. Press enter to re-enter sample ID{TextColors.END}")
#             inp = input()
#             enter_sample_method(user_name)
#         else:
#             return
        
#     @staticmethod
#     def check_s_type(s_type, enter_sample_method, user_name):

#         sample_types = Valid_Inputs.sampleTypes
#         if s_type in sample_types:
#             return
#         else:
#             print(f"{TextColors.RED}Invalid sample type. Press enter to re-enter sample ID{TextColors.END}")
#             inp = input()
#             enter_sample_method(user_name)
        
#     @staticmethod
#     def check_uname_delete(username, users_collection):
#         user = users_collection.find_one({'_id': username})
#         if user:
#             return
#         else:
#             clear_screen()
#             print(f"{TextColors.RED}Username doesn't exist. Press enter to continue.{TextColors.END}")
#             inp = input()
#             # main()

# class Settings:

#     @staticmethod
#     def settings_operator():
#         pass

#     @staticmethod
#     def settings_reviewer():
#         pass

#     @staticmethod
#     def settings_admin(database):
#         clear_screen()
#         print(f"{TextColors.GREEN}Settings: {TextColors.END}")
#         print()
#         print(f"{TextColors.YELLOW}1. Sample Operations {TextColors.END}")
#         print(f"{TextColors.YELLOW}2. User operations {TextColors.END}")
#         print()
#         choice = input(f"{TextColors.BLUE}Select an option from above: {TextColors.END}")

#         if choice == '1':
#             print(TextColors.GREEN)
#             for sample in database.samples_collection.find():
#                 print(sample)
#             print(TextColors.END)
#             sample_id = input(f"{TextColors.BLUE}Enter the _id of the sample you want to alter: {TextColors.END}")
#             print()
#             print(f"{TextColors.YELLOW}1. Delete Sample{TextColors.END}")
#             print(f"{TextColors.YELLOW}2. Alter Sample data{TextColors.END}")
#             print()
#             operation = input(f"{TextColors.BLUE}Select an option from above: {TextColors.END}")
            
#             if operation == '1':
#                 result = database.samples_collection.delete_one({"_id": sample_id})
#                 if result:
#                     clear_screen()
#                     print(f"{TextColors.GREEN}Deletion Succesfull. {TextColors.END}")
#                     print()
#                     print(f"{TextColors.BLUE}Press Enter to return to landing page. {TextColors.END}")
#                     inp = input()
#                     return
#                 else:
#                     clear_screen()
#                     print(f"{TextColors.END}Sample ID input is not present. {TextColors.END}")
#                     print()
#                     print(f"{TextColors.BLUE}Press Enter to return to settings page. {TextColors.END}")
#                     inp = input()
#                     Settings.settings_admin(database)
#             return
#         elif choice == '2':
#             pass
#         else:
#             pass

# class DataBase:

    # def __init__(self):
    #     self.client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    #     self.db = self.client['bionuvus']
    #     self.users_collection = self.db['users']
    #     self.samples_collection = self.db['samples']

    # def signup(self):
        # clear_screen()
        # u_name = input(f"{TextColors.BLUE}Enter Username: {TextColors.END}")
        # u_name = u_name.lower()
        # Checker.check_uname_signup(u_name, self.users_collection, self.signup)

        # password = input(f"{TextColors.BLUE}Enter Password: {TextColors.END}")
        # re_password = input(f"{TextColors.BLUE}Re-enter Password: {TextColors.END}")
        # Checker.check_password_signup(password, re_password, self.signup)

        # age = input(f"{TextColors.BLUE}Enter your age (in years): {TextColors.END}")
        # Checker.check_age_signup(age, self.signup)

        # user_data = {
        #     '_id': u_name,
        #     'password': password,
        #     'age': int(age),
        #     'category': 'operator'
        # }
        # self.users_collection.insert_one(user_data)
        # clear_screen()
        # print(f"{TextColors.GREEN}User added to the database successfully.{TextColors.END}")
        # print()
        # print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
        # inp = input()
        # main()

    # def login(self):
    #     clear_screen()
    #     u_name = input(f"{TextColors.BLUE}Enter Username: {TextColors.END}")
    #     Checker.check_uname_login(u_name, self.users_collection, self.signup, self.login)

    #     password = input(f"{TextColors.BLUE}Enter Password: {TextColors.END}")
    #     user = Checker.check_password_login(u_name, password, self.users_collection, self.login)
        
    #     return user
    
    # def enter_sample(self, user_name):

    #     clear_screen()
    #     s_id = input(f"{TextColors.BLUE}Enter Sample_ID: {TextColors.END}")
    #     Checker.check_s_id(s_id, self.samples_collection, self.enter_sample, user_name)

    #     s_type = input(f"{TextColors.BLUE}Enter Sample_Type: {TextColors.END}")
    #     s_type = s_type.lower()
    #     Checker.check_s_type(s_type, self.enter_sample, user_name)

    #     s_data = input(f"{TextColors.BLUE}Enter the sample data: {TextColors.END}")

    #     sample_data = {
    #         '_id': s_id,
    #         's_type': s_type,
    #         's_data': s_data,
    #         'u_name': user_name
    #     }
    #     self.samples_collection.insert_one(sample_data)
    #     clear_screen()
    #     print(f"{TextColors.GREEN}Sample added to the database successfully.{TextColors.END}")
    #     print()
    #     print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
    #     inp = input()
    #     return

    # def delete_user(self):
    #     clear_screen()
    #     u_name = input(f"{TextColors.BLUE}Enter Username to be deleted: {TextColors.END}")
    #     Checker.check_uname_delete(u_name, self.users_collection)

    #     self.users_collection.delete_one({'_id': u_name})
    #     clear_screen()
    #     print(f"{TextColors.GREEN}User deleted from the database successfully. {TextColors.END}")
    #     print()
    #     print(f"{TextColors.YELLOW}Press enter to continue. {TextColors.END}")
    #     inp = input()
        # main()
        
    # def logout(self):
    #     clear_screen()
    #     print(f"{TextColors.BLUE}Are you sure you want to logout? Enter 'y' to confirm and anything else to return to landing page.{TextColors.END}")
    #     print()
    #     decision = input()
    #     decision = decision.lower()
    #     if decision == 'y':
    #         # main()
    #     else:
    #         return

    # def close(self):
    #     clear_screen()
    #     print(f"{TextColors.GREEN}Thank you for working with Bionovus! {TextColors.END}")
    #     print()
        # exit()

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://maitreyapchitale:3jrPBDsOFqwvyuZr@bionovus.vklbulv.mongodb.net/bionovus_db"
mongo = PyMongo(app)
# database = DataBase()

CURR_USER = ''

@app.route('/delete_users', methods=['GET'])
def delete_users():
    try:
        users = list(mongo.db.users.find())
        print(users)
        if users:
            user_ids = [user['_id'] for user in users]
            return jsonify(user_ids), 202
        
        return jsonify({
            'error': "users not found"
        }), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 402

@app.route('/signup', methods=['POST'])
def signup():
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

    global CURR_USER

    data = request.json
    user_name = data.get('username')
    user_name = user_name.lower()
    password = data.get('password')
    print(user_name)
    print(password)

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
    all_users_data=mongo.db.users.find()
    users = []

    for user in all_users_data:
        users.append({
            'id': str(user['_id']),  # Convert ObjectId to string
            'role': user['category']
          
        })

    return jsonify(users)

@app.route('/delete_U/<string:user_id>',methods=['DELETE'])
def delete_U(user_id):
    try:
        result = mongo.db.users.delete_one({'_id': user_id})
        if result.deleted_count > 0:
            return jsonify({'message': 'User deleted successfully'})
        else:
            return jsonify({'message': 'User not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':  
    app.run(debug=True)
    # main()