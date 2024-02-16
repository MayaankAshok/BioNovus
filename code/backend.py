import pymongo
from essentials import clear_screen
from essentials import TextColors

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
    def check_password_login(username,password,users_collection,login_method):
        user = users_collection.find_one({'_id': username,'password':password})
        if user:
            clear_screen()
            return
        else:
            print(f"{TextColors.RED}Incorrect password. Press Enter to continue{TextColors.END}")
            inp = input()
            clear_screen()
            login_method()

    @staticmethod
    def check_uname_login(username, users_collection, signup_method, login_method):

        user = users_collection.find_one({'_id': username})
        if user:
            return
        else:
            clear_screen()
            print(f"{TextColors.RED}Username doesn't exist.{TextColors.END}")
            print(f"{TextColors.YELLOW}1. SignUp{TextColors.END}")
            print(f"{TextColors.YELLOW}2. Login{TextColors.END}")
            choice = input(f"{TextColors.BLUE}Do you want to continue login or signup: {TextColors.END}")
            print(f"{TextColors.BLUE}Press Enter to continue. {TextColors.END}")           
            inp = input()
            if choice == '1':
                signup_method()
            elif choice == '2':
                login_method()

    @staticmethod
    def check_uname_for_delete(username, users_collection):
        user = users_collection.find_one({'_id': username})
        if user:
            return
        else:
            clear_screen()
            print(f"{TextColors.RED}Username doesn't exist. Press enter to continue.{TextColors.END}")
            inp = input()
            main()

class DataBase:

    def __init__(self):
        self.client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
        self.db = self.client['bionuvus']
        self.users_collection = self.db['users']
        self.samples_collection = self.db['samples']

    def signup(self):
        clear_screen()
        u_name = input(f"{TextColors.BLUE}Enter Username: {TextColors.END}")
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
        Checker.check_uname_login(u_name, self.users_collection, self.signup, self.login)

        password = input(f"{TextColors.BLUE}Enter Password: {TextColors.END}")
        Checker.check_password_login(u_name,password, self.users_collection, self.login)
        clear_screen()
        print(f"{TextColors.GREEN}User logged in successfully.{TextColors.END}")
        print()
        print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
        inp = input()
        main()

    def delete_user(self):
        clear_screen()
        u_name = input(f"{TextColors.BLUE}Enter Username to be deleted: {TextColors.END}")
        Checker.check_uname_for_delete(u_name, self.users_collection)

        self.users_collection.delete_one({'_id': u_name})
        clear_screen()
        print(f"{TextColors.GREEN}User deleted from the database successfully. {TextColors.END}")
        print()
        print(f"{TextColors.YELLOW}Press enter to continue. {TextColors.END}")
        inp = input()
        main()
        

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
        database.login()
    elif choice == '3': 
        database.close()
    else:
        clear_screen()
        print(f"{TextColors.RED}Invalid Choice. Please enter a valid option.{TextColors.END}")
        print()
        print(f"{TextColors.YELLOW}Press enter to continue.{TextColors.END}")
        inp = input()
        main()

if __name__ == '__main__':  
    main()