import cv2
import re
import json
from sense_hat import SenseHat

def scan_QRcode():
    """
    Search for QR Codes using the provided webcam, the QR Code must contain specific hashed profile ID for Engineer to unlock.
    """
    sense= SenseHat()
    cap = cv2.VideoCapture(0)
    detector = cv2.QRCodeDetector()

    print("Reading QR code using Raspberry Pi camera")
    car_locked = True

    while True:
        try:
            print("Scanning....")
            _, img = cap.read()
            data, bbox, _ = detector.detectAndDecode(img)
            
            if bbox is not None:
                for i in range(len(bbox)):
                    cv2.line(img, tuple(bbox[i][0]), tuple(bbox[(i+1) % len(bbox)][0]), color=(255,
                            0, 0), thickness=2)
                    
                cv2.putText(img, data, (int(bbox[0][0][0]), int(bbox[0][0][1]) - 10), cv2.FONT_HERSHEY_SIMPLEX,
                            0.5, (0, 255, 0), 2)
                #when webcam has detected QR code value, the value stored inside the QR code will be compared to the local database.
                if data:
                    print("Data found: " + data)

                    with open("/home/pi/Desktop/Assignment_2/engineer_profile.json", "r") as read_file:
                        profile = json.load(read_file)
                    for i in profile:
                        #Unlock car when matched
                        if i["id"] == data:
                            car_locked = False
                            print("Name: " + i["name"])
                            print("Position: " + i["position"])
                    data = ""
                    if car_locked == False:
                        print("The car is currently unlocked")
                        sense.show_message("Car Unlocked")
                    
                    for i in range(50):
                        _, img = cap.read()
                    break
        except KeyboardInterrupt:
            break


    cap.release()
    cv2.destroyAllWindows()

#start main program
if __name__ == '__main__':
    scan_QRcode()