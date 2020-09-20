import globals
import socket
import threading
import time


HOST = '192.168.0.2'  # The server's hostname or IP address CHECK BEFORE RUNNING PROGRAM
PORT = 8086      # The port used by the server CHECK BEFORE RUNNING PROGRAM




def getName():
    """
    Get name value from global
    """
    return globals.name

def getPW():
    """
    Get password value from global
    """
    return globals.password

def setResponse(status):
    """
    Set the response value to global
    """
    globals.accessResponse = status

def clearPassword():
    """
    Clear password value 
    """
    globals.password = ""



def my_client():
    """
    Build socket communication with server
    """
    while True:


        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            #Connection attempt
            s.connect((HOST, PORT))
            #Get the username and passowrd from global value
            name = getName()
            pw = getPW()
            acc = "Data " + name + " " + pw  + " 1"#car id

            #send the data if exist
            if pw != "":
                #encode the account and send
                my_inp = acc.encode('utf-8')
                print("Current account value:" + acc)
                s.sendall(my_inp)
                #receive the server response
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
    
#Program start
if __name__ == "__main__":
    while 1:
        my_client()