import os
import bluetooth
from sense_hat import SenseHat




def send_bt_message():
    """
    Search for nearby bluetooth devices and search for targetted device to proceed sending WeatherStatus.txt file
    """
    for add in nearby_devices:           
        os.system("hcitool scan")
        for addr in mac_address_list:
            if addr == add:
                # target_mac_address = add
                print("Searching for target device: " + addr)
                # car_locked = not car_locked
                car_locked = False
                if car_locked == False:
                    print("The car is currently unlocked")
                    sense.show_message("Car Unlocked")
                os.system("obexftp --nopath --uuid none --bluetooth %s --channel 12" % target_mac_address)
                break

# car_locked = True
# print(car_locked)
mac_address_list = ["FC:DE:90:C2:9C:2A","FC:DE:90:C2:9C:2B"]
#defining a target device name


target_phone = "Galaxy S20 Ultra LTE"
target_mac_address = "FC:DE:90:C2:9C:2A"
car_locked = True


sense = SenseHat()
#Lisintg discovered Nearby Devices
nearby_devices = bluetooth.discover_devices()










#Start main program
if __name__ == '__main__':
    send_bt_message()