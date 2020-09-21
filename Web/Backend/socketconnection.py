from db_functions import *
from gcloud_db import create_connection
from utils import *
import socket
import numpy as np
import encodings

HOST = '192.168.43.143'  # Standard loopback interface address (localhost)
PORT = 8082        # Port to listen on (non-privileged ports are > 1023)



accountDict = {
  "Shan": "456789",
  "Hoai": "222555",
  "Fu": "123456"
}


def my_server():

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        print("Server Started waiting for client to connect ")
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((HOST, PORT))
        s.listen(5)     #maximun 5 devices
        conn, addr = s.accept()

        with conn:
            print('Connected by', addr)
            while True:
                print("listening")
                data = conn.recv(1024).decode('utf-8')   #receive the data and decode Data Sample: "Data Shan 123456" 
                # print(data)
                parts = data.split(' ')
                data = parts[0]
                print(parts)
                if str(parts[0]) == "Data":
                    account = parts[1]
                    password = parts[2]
                    car_id = parts[3]
                    print(account + password + car_id)

                    if str(data) == "Data":
                        my_data = ""
                        message = validate_user_terminal(account, password, car_id)
                        if account == 'Unknown':
                            my_data = "Invalid. Please try again"
                        if message == 1:
                            my_data = "Access Denied. Wrong Password"
                        if message == 0:
                            my_data = "Access Granted"
                        if message == 3:
                            my_data = "Access Denied. You have not booked"

                        else:
                            print("None")
                       
                        print(my_data)
                        x_encoded_data = my_data.encode('utf-8')

                        conn.sendall(x_encoded_data)

                if not data:
                    break
                else:
                    pass

# Function to validate user
def validate_user_terminal(username, password, car_id):
    mydb = create_connection()
    # Check if user has been registered or not
    current_user = db_read(mydb, """SELECT * FROM users WHERE username = %s""", (username,))
    if len(current_user) == 1:
        saved_password_hash = current_user[0][4]
        saved_password_salt = current_user[0][3]
        password_hash = generate_hash(password, saved_password_salt)
        # check if input password matches saved password
        if password_hash == saved_password_hash:
            user_id = current_user[0][0]
            mydb = create_connection()
            lastid = unlock_car(mydb, (car_id,))
            # car has been unlocked
            if (lastid is not None):
                return 0
            # car id is not exist   
            else:
                return 3
        # wrong password
        else:
            return 1

    else:
        return 2

if __name__ == '__main__':
   while 1:
        my_server()
        