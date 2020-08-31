# Module Imports
import mariadb
import sys

import mysql.connector
from mysql.connector import Error

# # Connect to MariaDB Platform
# try:
#     conn = mariadb.connect(
#         user="root",
#         # password="db_user_passwd",
#         host="localhost",
#         # port=3306,
#         database="faceImage"

#     )
# except mariadb.Error as e:
#     print(f"Error connecting to MariaDB Platform: {e}")
#     sys.exit(1)

# # Get Cursor
# cur = conn.cursor()



def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

def insertBLOB(name, photo):
    print("Inserting BLOB into python_employee table")
    try:
        connection = mariadb.connect(host='localhost',
                                             database='faceImage',
                                             user='root')

        cursor = connection.cursor()
        sql_insert_blob_query = """ INSERT INTO user
                          (username, photo) VALUES (%s,%s)"""

        empPicture = convertToBinaryData(photo)


        # Convert data into tuple format
        insert_blob_tuple = (name, empPicture)
        result = cursor.execute(sql_insert_blob_query, insert_blob_tuple)
        connection.commit()
        print("Image and file inserted successfully as a BLOB into python_employee table", result)

        cursor.close()
        connection.close()
        print("MySQL connection is closed")

    except mysql.connector.Error as error:
        print("Failed inserting BLOB data into MySQL table {}".format(error))


        

insertBLOB("Elonmusk23", "/home/pi/Desktop/elonmusk.jpeg")

# insertBLOB(2, "Scott", "D:\Python\Articles\my_SQL\images\scott_photo.png",
#            "D:\Python\Articles\my_SQL\images\scott_bioData.txt")