import pymongo
from essentials import clear_screen
from essentials import TextColors

class Valid_Inputs:

    sampleTypes = ['blood', 'urine', 'saliva']

class Checker:

    @staticmethod
    def check_uname_signup(username, users_collection, signup_method):

        user = users_collection.find_one({'_id': username})
        if user:
            clear_screen()
            print(f"{TextColors.RED}Username exists. Press Enter to continue.{TextColors.END}")
            inp = input()
            signup_method()
        else:
            return
        
    @staticmethod
    def check_password_signup(password, re_password, signup_method):

        if password == re_password:
            return
        else:
            print(f"{TextColors.RED}Passwords do not match. Press Enter to continue.{TextColors.END}")
            inp = input()
            signup_method()

    @staticmethod
    def check_age_signup(age, signup_method):

        try:
            age = int(age)
            return
        except:
            print(f"{TextColors.RED}Age should be an integer. Press Enter to continue.{TextColors.END}")
            inp = input()
            signup_method()

    @staticmethod
    def check_password_login(username,password, users_collection, login_method):

        user = users_collection.find_one({'_id': username, 'password':password})
        if user:
            clear_screen()
            return user
        else:
            print(f"{TextColors.RED}Incorrect password and username pair. Press Enter to continue.{TextColors.END}")
            inp = input()
            clear_screen()
            login_method()

    @staticmethod
    def check_uname_login(username, users_collection, signup_method):

        user = users_collection.find_one({'_id': username})
        if user:
            return username
        else:
            clear_screen()
            print(f"{TextColors.RED}Username doesn't exist. Please signup. Press Enter to continue.{TextColors.END}")
            inp = input()
            signup_method()

    @staticmethod
    def check_s_id(s_id, samples_collection, enter_sample_method, user_name):

        sample = samples_collection.find_one({'_id': s_id})
        if sample:
            print(f"{TextColors.RED}Sample already exists, invalid sample ID. Press enter to re-enter sample ID{TextColors.END}")
            inp = input()
            enter_sample_method(user_name)
        else:
            return
        
    @staticmethod
    def check_s_type(s_type, enter_sample_method, user_name):

        sample_types = Valid_Inputs.sampleTypes
        if s_type in sample_types:
            return
        else:
            print(f"{TextColors.RED}Invalid sample type. Press enter to re-enter sample ID{TextColors.END}")
            inp = input()
            enter_sample_method(user_name)

class DataBase:

    def __init__(self):
        self.client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
        self.db = self.client['bionuvus']
        self.users_collection = self.db['users']
        self.samples_collection = self.db['samples']

    def signup(self):
        clear_screen()
        u_name = input(f"{TextColors.BLUE}Enter Username: {TextColors.END}")
        u_name = u_name.lower()
        Checker.check_uname_signup(u_name, self.users_collection, self.signup)

        password = input(f"{TextColors.BLUE}Enter Password: {TextColors.END}")
        re_password = input(f"{TextColors.BLUE}Re-enter Password: {TextColors.END}")
        Checker.check_password_signup(password, re_password, self.signup)

        age = input(f"{TextColors.BLUE}Enter your age (in years): {TextColors.END}")
        Checker.check_age_signup(age, self.signup)

        user_data = {
            '_id': u_name,
            'password': password,
            'age': int(age),
            'category': 'operator'
        }
        self.users_collection.insert_one(user_data)
        clear_screen()
        print(f"{TextColors.GREEN}User added to the database successfully.{TextColors.END}")
        print()
        print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
        inp = input()
        main()

    def login(self):
        clear_screen()
        u_name = input(f"{TextColors.BLUE}Enter Username: {TextColors.END}")
        Checker.check_uname_login(u_name, self.users_collection, self.signup)

        password = input(f"{TextColors.BLUE}Enter Password: {TextColors.END}")
        user = Checker.check_password_login(u_name, password, self.users_collection, self.login)
        
        return user
    
    def enter_sample(self, user_name):

        clear_screen()
        s_id = input(f"{TextColors.BLUE}Enter Sample_ID: {TextColors.END}")
        Checker.check_s_id(s_id, self.samples_collection, self.enter_sample, user_name)

        s_type = input(f"{TextColors.BLUE}Enter Sample_Type: {TextColors.END}")
        s_type = s_type.lower()
        Checker.check_s_type(s_type, self.enter_sample, user_name)

        s_data = input(f"{TextColors.BLUE}Enter the sample data: {TextColors.END}")

        sample_data = {
            '_id': s_id,
            's_type': s_type,
            's_data': s_data,
            'u_name': user_name
        }
        self.samples_collection.insert_one(sample_data)
        clear_screen()
        print(f"{TextColors.GREEN}Sample added to the database successfully.{TextColors.END}")
        print()
        print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
        inp = input()
        return

    def close(self):

        clear_screen()
        print(f"{TextColors.GREEN}Thank you for working with Bionovus! {TextColors.END}")
        print()
        exit()

def main():
    clear_screen()
    print(f"{TextColors.GREEN}Welcome to Bionuvus Inc. {TextColors.END}")
    print()
    print(f"{TextColors.YELLOW}1. SignUp{TextColors.END}")
    print(f"{TextColors.YELLOW}2. Login{TextColors.END}")
    print(f"{TextColors.YELLOW}3. Exit{TextColors.END}")
    print()
    choice = input(f"{TextColors.BLUE}Choose an option from above to proceed: {TextColors.END}")

    database = DataBase()

    if choice == '1':
        database.signup()

    elif choice == '2':
        user = database.login()
        while True:
            clear_screen()
            print(f"{TextColors.GREEN}Welcome {user['_id']}.{TextColors.END}")
            print()
            print(f"{TextColors.YELLOW}1. Enter new sample{TextColors.END}")
            print(f"{TextColors.YELLOW}2. Settings{TextColors.END}")
            print(f"{TextColors.YELLOW}3. Logout{TextColors.END}")
            print()
            choice = input(f"{TextColors.BLUE}Choose an option from above to proceed: {TextColors.END}")

            if choice == '1':
                database.enter_sample(user)
                continue

            elif choice == '2':
                pass

            elif choice == '3':
                pass

            else:
                print(f"{TextColors.RED}Invalid choice, press enter to return to landing page.{TextColors.END}")
                inp = input()
                continue

    elif choice == '3': 
        pass

    else:
        clear_screen()
        print(f"{TextColors.RED}Invalid Choice. Please enter a valid option.{TextColors.END}")
        print()
        print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
        inp = input()
        main()

if __name__ == '__main__':  
    main()