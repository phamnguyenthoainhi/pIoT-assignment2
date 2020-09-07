import socket
import numpy as np
import encodings

HOST = '192.168.0.2'  # Standard loopback interface address (localhost)
PORT = 8080        # Port to listen on (non-privileged ports are > 1023)


def random_data():

    x1 = np.random.randint(0, 55, None)         # Dummy temperature
    y1 = np.random.randint(0, 45, None)         # Dummy humidigy
    my_sensor = "{},{}".format(x1,y1)
    return my_sensor                            # return data seperated by comma




def my_server():

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        print("Server Started waiting for client to connect ")
        s.bind((HOST, PORT))
        s.listen(5)
        conn, addr = s.accept()

        with conn:
            print('Connected by', addr)
            while True:
                print("listening")
                data = conn.recv(1024).decode('utf-8')
                # print(data)
                parts = data.split(' ')
                data = parts[0]
                print(parts)

                if str(data) == "Data":

                    print("Ok Sending data ")

                    # my_data = random_data()
                    my_data = "Account verified"
                    x_encoded_data = my_data.encode('utf-8')

                    conn.sendall(x_encoded_data)

                elif  str(data) == "Quit":
                    print("shutting down server ")
                    break


                if not data:
                    break
                else:
                    pass


if __name__ == '__main__':
    while 1:
        my_server()