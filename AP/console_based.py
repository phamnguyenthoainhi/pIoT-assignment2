from scan_engineer_device_bluetooth import send_bt_message
from scan_engineer_profile_QRcode import scan_QRcode
from os import path
import datetime
import csv
import re
import sys

#locating the correct path file to specific python program
sys.path.insert(1, '/home/pi/Desktop/Assignment_2/FaceRecognitionEngine/')
from main import run_facial_recognition
import globals



def main():
    """
    Display a menu with options for users to select specific services.
    This program will be added into rcbash, therefore the once the terminal is started, this menu will show.
    """
    option_status = True
    # Ask users to choose one option, if its not valid then ask again
    while option_status is True:
        print("Please choose one of the services below.")
        print("1. Unlock with Bluetooth device (Engineer).")
        print("2. Unlock with QR Code (Engineer).")
        print("3. Face Scan Login (User).")
        print("4. Exit")
        input_option = input()
        if input_option == "1":
            send_bt_message()
        elif input_option == "2":
            scan_QRcode()
        elif input_option == "3":
            globals.init()
            run_facial_recognition()
        elif input_option == "4":
            print("Program ends.")
            option_status = False
        else:
            print("Invalid Option. Please try again.")
            option_status = True
#start main program
main()