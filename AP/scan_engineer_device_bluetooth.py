import os
import bluetooth
from sense_hat import SenseHat

def send_bt_message():
    """
    Search for nearby bluetooth devices and search for targetted device(engineer's device) to proceed unlocking the car.
    """
    nearby_devices = bluetooth.discover_devices()
    os.system("hcitool scan")

    for add in nearby_devices:       
        car_locked = True    
        for addr in mac_address_list:
            if addr == add:
                print("Searching for target device: " + addr)
                car_locked = False
                if car_locked == False:
                    print("The car is currently unlocked")
                    sense.show_message("Car Unlocked")
                #setting the correct protocal channel for smartphone to enable bluetooth searching
                os.system("obexftp --nopath --uuid none --bluetooth %s --channel 12" % addr)
                break
    if car_locked == True:
        print("No matching device detected.")

#defining a enginneers' device MAC Addresses
mac_address_list = ["FC:DE:90:C2:9C:2A","FC:DE:90:C2:9C:2B"]

#defining an initial car lock status
car_locked = True
sense = SenseHat()

#Listing discovered Nearby Devices



#Start main program
if __name__ == '__main__':
    send_bt_message()