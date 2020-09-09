import socket
import numpy as np
import encodings

HOST = '192.168.43.230'  # Standard loopback interface address (localhost)
PORT = 8080        # Port to listen on (non-privileged ports are > 1023)




accountDict = {
  "Shan": "456789",
  "Hoai": "222555",
  "Fu": "123456"
}


def my_server():

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        print("Server Started waiting for client to connect ")
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
                    print(account + password)

                    if str(data) == "Data":
                        my_data = ""
                        for acc, passw in accountDict.items():
                            if acc == account:
                                if passw == password:
                                    my_data = "Account verified"    
                                else:
                                    my_data = "Access Denied"

                        

                        print("Ok Sending data back ")

                        # my_data = random_data()
                        print(my_data)
                        x_encoded_data = my_data.encode('utf-8')

                        conn.sendall(x_encoded_data)

                # elif str(data) == "Quit":
                #     print("shutting down server ")
                #     break

                if not data:
                    break
                else:
                    pass


if __name__ == '__main__':
    while 1:
        my_server()