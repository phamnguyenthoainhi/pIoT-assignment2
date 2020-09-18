from bluetooth1 import send_bt_message
from qrCodeScanner import run_qrcode
from os import path
import datetime
import csv
import re
import sys


sys.path.insert(1, '/home/pi/Desktop/Assignment_2/SmartCCTV-Camera/')
from main import run_facial_recognition
import globals

current_day = str(datetime.datetime.now().strftime("%d/%m/%Y"))


def main():
    option_is_not_valid = True
    # Ask users to choose one option, if its not valid then ask again
    while option_is_not_valid is True:
        print("Please choose one option below (Type 1 or 2 to choose)")
        print("1. bluetooth")
        print("2. qr code")
        print("3. face")
        print("4. Exit")
        # print(globals)
        report_option = input()
        if report_option == "1":
            send_bt_message()
        elif report_option == "2":
            run_qrcode()
        elif report_option == "3":
            globals.init()
            run_facial_recognition()
            
            # option_is_not_valid = False
        elif report_option == "4":
            print("Program ends.")
            option_is_not_valid = False
        else:
            print("Invalid Option. Please try again.")
            option_is_not_valid = True

main()