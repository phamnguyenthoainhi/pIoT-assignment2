# from gpiozero import LED, Button, Buzzer
import cv2
import re
import json
from sense_hat import SenseHat

def run_qrcode():
    
    # led = LED(19)
    # sw1 = Button(21)
    # buzzer = Buzzer(26)
    sense= SenseHat()
    cap = cv2.VideoCapture(0)
    detector = cv2.QRCodeDetector()

    # def sw1Pressed():
    #     global sw1Press
    #     sw1Press = True

    # sw1.when_pressed = sw1Pressed
    # sw1Press = False

    print("Reading QR code using Raspberry Pi camera")
    # print("Press SW1 to scan.")
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
                
                if data:
                    # print("data found")
                    # status = False
                    # buzzer.beep(0.1, 0.1, 1)
                    print("Data found: " + data)
                    car_locked = False
                    # led.off()
                    with open("/home/pi/Desktop/Assignment_2/engineer_profile.json", "r") as read_file:
                        profile = json.load(read_file)
                    for i in profile:
                        if i["id"] == data:
                            print("Name: " + i["name"])
                            print("Position: " + i["position"])

                        
                    data = ""
                    if car_locked == False:
                        print("The car is currently unlocked")
                        sense.show_message("Car Unlocked")
                    
                    for i in range(50):
                        _, img = cap.read()
                        # cv2.imshow("code detector", img)
                    break
        except KeyboardInterrupt:
            break
                    
                
                
            

                
        
        # else:
        #     cap.read()
        #     cv2.destroyAllWindows()
        #     print("window closed")
        
        # if cv2.waitKey(1) == ord("q"):
        #     break


    cap.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    run_qrcode()