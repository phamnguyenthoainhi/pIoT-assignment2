import os
import bluetooth
import json
import sqlite3
from sqlite3 import Error
from sense_hat import SenseHat
import itertools



def send_bt_message():
    """
    Search for nearby bluetooth devices and search for targetted device to proceed sending WeatherStatus.txt file
    """
    for add in nearby_devices:           
        os.system("hcitool scan")
        for addr in mac_address_list:
            if addr == add:
                # target_mac_address = add
                print("Searching for target device: " + target_mac_address)
                # car_locked = not car_locked
                car_locked = False
                print(car_locked)
                os.system("obexftp --nopath --uuid none --bluetooth %s --channel 12" % target_mac_address)
                break

    car_locked = True
    print(car_locked)

mac_address_list = ["FC:DE:90:C2:9C:2A","FC:DE:90:C2:9C:2B"]
#defining a target device name
target_phone = "Galaxy S20 Ultra LTE"
target_mac_address = "FC:DE:90:C2:9C:2A"
car_locked = True
# car_status = itertools.cycle([True, False]).__next__

#Lisintg discovered Nearby Devices
nearby_devices = bluetooth.discover_devices()
# sense = SenseHat()







#Start main program
if __name__ == '__main__':
    send_bt_message()