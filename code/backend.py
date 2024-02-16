import pymongo
from essentials import clear_screen
from essentials import TextColors

class Checker:

    @staticmethod
    def check_uname_login(username, users_collection, login_method):

        user = users_collection.find_one({'_id': username})
        if user:
            clear_screen()
            print(f"{TextColors.RED}Username exists. Press Enter to continue.{TextColors.END}")
            inp = input()
            login_method()
        else:
            return
        
    @staticmethod
    def check_password_login(password, re_password, login_method):

        if password == re_password:
            return
        else:
            print(f"{TextColors.RED}Passwords do not match. Press Enter to continue.{TextColors.END}")
            inp = input()
            login_method()

    @staticmethod
    def check_age_login(age, login_method):

        try:
            age = int(age)
            return
        except:
            print(f"{TextColors.RED}Age should be an integer. Press Enter to continue.{TextColors.END}")
            inp = input()
            login_method()

class DataBase:

    def __init__(self):
        self.client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
        self.db = self.client['bionuvus']
        self.users_collection = self.db['users']
        self.samples_collection = self.db['samples']

    def signup(self):
        clear_screen()
        u_name = input(f"{TextColors.BLUE}Enter Username: {TextColors.END}")
        Checker.check_uname_login(u_name, self.users_collection, self.login)

        password = input(f"{TextColors.BLUE}Enter Password: {TextColors.END}")
        re_password = input(f"{TextColors.BLUE}Re-enter Password: {TextColors.END}")
        Checker.check_password_login(password, re_password, self.login)

        age = input(f"{TextColors.BLUE}Enter your age (in years): {TextColors.END}")
        Checker.check_age_login(age, self.login)

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
        pass

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