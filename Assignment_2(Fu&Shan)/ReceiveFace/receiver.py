import mysql.connector
from mysql.connector import Error
import mariadb
import sys

def write_file(data, filename):
    # Convert binary data to proper format and write it on Hard Disk
    with open(filename, 'wb') as file:
        file.write(data)

def readBLOB(emp_id, photo):
    print("Reading BLOB data from python_employee table")

    # try:
    #     # connection = mariadb.connect(host='localhost',
    #     #                                      database='faceImage',
    #     #                                      user='fushan',
    #     #                                      password='fushan')

        
    sql_fetch_blob_query = """SELECT * from user where id = %s"""

    cursor.execute(sql_fetch_blob_query, (emp_id,))
    record = cursor.fetchall()
    for row in record:
        print("Id = ", row[0], )
        print("Username = ", row[1])
        image = row[2]
        print("Storing employee image and bio-data on disk \n")
        write_file(image, photo)

    # except mysql.connector.Error as error:
    #     print("Failed to read BLOB data from MySQL table {}".format(error))

    # finally:
    #     cursor.close()
    #     connection.close()
    #     print("MySQL connection is closed")

# readBLOB(2, "/home/pi/Desktop/Assignment_2/ReceiveFace/Shan.jpeg")
# readBLOB(2, "D:\Python\Articles\my_SQL\query_output\scott_photo.png",
#          "D:\Python\Articles\my_SQL\query_output\scott_bioData.txt")

try:
    connection = mariadb.connect(host='localhost',
                                             database='faceImage',
                                             user='fushan',
                                             password='fushan')

    cursor = connection.cursor()
    sql_fetch_blob_query = """SELECT * from user"""

    cursor.execute(sql_fetch_blob_query)
    record = cursor.fetchall()
    number = len(record)

    sql_fetchnames_query = """SELECT username from user"""
    cursor.execute(sql_fetchnames_query)
    names = cursor.fetchall()

    names=[i[0] for i in names]
    # names = str(names)
    # selectedString = names[1:-1]
    # parts = selectedString.split(',')

    
    
    print(names)
   
    for i in range(number):
        print(i)
        name = names[i]
        print(name)
        
        
        readBLOB(i+1, "/home/pi/Desktop/Assignment_2/ReceiveFace/{}.jpeg".format(name))

        
except mysql.connector.Error as error:
    print("Failed to read BLOB data from MySQL table {}".format(error))
    
finally:
    cursor.close()
    connection.close()
    print("MySQL connection is closed")

