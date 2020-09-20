import mysql.connector
from mysql.connector import Error
import mariadb
import sys



def search_row(name):
    """
    Search for the user data by name
    """
    sql = "SELECT * FROM photos WHERE username = %s"
    username = (name,)
    cursor.execute(sql, username)
    result = cursor.fetchall()
    for row in result:
        user_id = row[0]
    return user_id


def write_file(data, filename):
    """
    Convert binary data and output to the hard disk
    """
    
    with open(filename, 'wb') as file:
        file.write(data)

def readBLOB(_id, photo):
    """
    read BLOB data from Cloud Data base and write to hard disk
    """
    
        
    fetch_user_query = """SELECT * from photos where photo_id = %s"""

    cursor.execute(fetch_user_query, (_id,))
    record = cursor.fetchall()
    for row in record:
        print("Username = ", row[2])
        image = row[3]
        print("Storing user image on disk \n")
        write_file(image, photo)

#Start building connection
try:
    print("Building Connection..")
    connection = mariadb.connect(host='35.220.177.82',
                                             database='car_share',
                                             user='root',
                                             password='1234')

    cursor = connection.cursor()
    
    fetch_user_all = """SELECT * from photos"""

    cursor.execute(fetch_user_all)
    record = cursor.fetchall()
    number = len(record)

    fetch_usernames = """SELECT username from photos"""
    cursor.execute(fetch_usernames)
    names = cursor.fetchall()

    names=[i[0] for i in names]
   
    print("Users: ", names)
   
    for i in range(number):
        name = names[i]
        userID = search_row(name)
        print("ID = ", int(userID))
        
        readBLOB(userID, "/home/pi/Desktop/Assignment_2/FaceRecognitionEngine/profiles/{}.jpg".format(name))

#Error Catch
except mysql.connector.Error as error:
    print("Failed to read BLOB data from MySQL table {}".format(error))

#Close connection 
finally:
    cursor.close()
    connection.close()
    print("MySQL connection is closed")

