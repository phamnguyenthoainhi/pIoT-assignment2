import globals
import socket
import threading
import time


HOST = '192.168.0.2'  # The server's hostname or IP address
PORT = 8080        # The port used by the server


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
    threading.Timer(11, my_client).start()
    # print("console log")

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

        s.connect((HOST, PORT))
        # print("connecting")
        # my = input("Enter command ")
        
        name = getName()
        pw = getPW()

        acc = "Data " + name + " " + pw
        # print("current account value:" + acc)
        if pw != "":
            # acc = "Data Hoai 2225565 Quit"
            #my = "Data"
            my_inp = acc.encode('utf-8')
            print("current account value:" + acc)
            s.sendall(my_inp)

            data = s.recv(1024).decode('utf-8')
            
            answer = data
            print("server response:" + answer)
            if answer == "Account verified":
                setResponse("pass")
            elif answer == "Access Denied":
                setResponse("denied")

        clearPassword()

            

        s.close()
        time.sleep(1)


if __name__ == "__main__":
    
    while 1:
        
        my_client()