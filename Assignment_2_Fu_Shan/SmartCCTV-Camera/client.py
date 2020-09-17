import globals
import socket
import threading
import time


HOST = '192.168.0.2'  # The server's hostname or IP address
PORT = 8086      # The port used by the server


def process_data_from_server(x):
    x1, y1 = x.split(",")
    return x1,y1

def getName():
    return globals.name

def getPW():
    return globals.password

def setResponse(status):
    globals.accessResponse = status

def clearPassword():
    globals.password = ""


def start_client():
    globals.init()
    while True:
        my_client()


def my_client():
    while True:
        # threading.Timer(11, my_client).start()
        # print("console log")

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

            s.connect((HOST, PORT))
            # print("connecting")
            # my = input("Enter command ")
            
            name = getName()
            pw = getPW()
            # name = "Fu"
            # pw = "1234556"
            acc = "Data " + name + " " + pw  + " 1"#car id
            # print("current account value:" + acc)
            if pw != "":
                
                my_inp = acc.encode('utf-8')

                print("Current account value:" + acc)

                s.sendall(my_inp)

                data = s.recv(1024).decode('utf-8')
                
                answer = data
                print("Server response:" + answer)
                # if answer == "Access Granted":
                #     setResponse("pass")
                # elif answer == "Access Denied. Wrong Password":
                #     setResponse("denied")
                # # elif answer == "Access Denied. Username is not registered":
                # #     setResponse("denied")
                # elif answer == "Access Denied. You have not booked":
                #     setResponse("denied")

                if answer == "Account verified":
                    setResponse("pass")
                    break
                
                elif answer == "Access Denied":
                    setResponse("denied")

                else:
                    setResponse("denied")

            clearPassword()

            s.close()
            time.sleep(1)
        
    print("Socket communication closed")
    
# globals.init()
if __name__ == "__main__":
    while 1:
        my_client()