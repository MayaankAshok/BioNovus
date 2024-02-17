import os

class TextColors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ORANGE = '\033[38;5;208m'
    END = '\033[0m'

def clear_screen():
    # Check if the operating system is Windows or Unix-like (Linux, macOS)
    if os.name == 'nt':  # for Windows
        os.system('cls')
    else:  # for Unix-like systems
        os.system('clear')