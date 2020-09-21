import mysql.connector
import pymysql
import os
import sqlalchemy
from sqlalchemy import exc
db_user = "root"
db_password = '1234'
db_name = 'car_share'
db_connection_name = 'iot-assignment2-286206:asia-east2:iot-programming-asntwo'

# create connection with the cloud database
def create_connection():
    mydb = None
    try:
        unix_socket = '/cloudsql/{}'.format(db_connection_name)
        mydb = pymysql.connect(user=db_user, password=db_password,
                            unix_socket=unix_socket, db=db_name)
        print("CONNECTING DATABASE...")
        return mydb

    except mysql.connector.Error as e:
        print(e)      
        

def createtable_cars(mydb):
    try:
        cursor = mydb.cursor()
        
        cursor.execute("CREATE TABLE IF NOT EXISTS cars( \
                                                    car_id INT \
                                                    auto_increment \
                                                    PRIMARY KEY, \
                                                    make VARCHAR(255), \
                                                    body_type VARCHAR(255), \
                                                    color VARCHAR(255), \
                                                    seats INT, \
                                                    location VARCHAR(255), \
                                                    cost INT, \
                                                    locked BIT DEFAULT 1, \
                                                    latitude FLOAT, \
                                                    longitude FLOAT \
                                                    )")
        return True

    except mysql.connector.Error as e:
        print(str(e))
        return False

def createtable_users(mydb):
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE TABLE IF NOT EXISTS users( \
                                                  user_id INT \
                                                  auto_increment \
                                                  PRIMARY KEY, \
                                                  username VARCHAR(255),\
                                                  email VARCHAR(255), \
                                                  password_salt VARCHAR(255) NOT NULL, \
                                                  password_hash VARCHAR(255) NOT NULL, \
                                                  role ENUM('Customer', 'Admin', 'Manager', 'Engineer')\
                                                  )")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False

def createtable_bookings(mydb):
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE TABLE IF NOT EXISTS bookings( \
                                                  booking_id INT \
                                                  auto_increment \
                                                  PRIMARY KEY, \
                                                  car_id INT, \
                                                  user_id INT, \
                                                  status ENUM('Pending', 'Booked', 'Canceled'), \
                                                  FOREIGN KEY (car_id) REFERENCES cars(car_id) ON DELETE CASCADE, \
                                                  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE, \
                                                  booking_date VARCHAR(255), \
                                                  return_date VARCHAR(255), \
                                                  price FLOAT \
                                                  )")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False

def createtable_reports(mydb):
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE TABLE IF NOT EXISTS reports( \
                                                  report_id INT \
                                                  auto_increment \
                                                  PRIMARY KEY, \
                                                  car_id INT, \
                                                  user_id INT, \
                                                  content VARCHAR(255),\
                                                  FOREIGN KEY (car_id) REFERENCES cars(car_id) ON DELETE CASCADE, \
                                                  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE, \
                                                  report_date VARCHAR(255) \
                                                  )")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False
    
def createtable_photos(mydb):
    try:
        cursor = mydb.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS photos( \
                                                    photo_id INT \
                                                    auto_increment \
                                                    PRIMARY KEY, \
                                                    user_id INT, \
                                                    username VARCHAR(255),\
                                                    photo LONGBLOB,\
                                                    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE \
                                                    )")
        return True

    except mysql.connector.Error as e:
        print(str(e))
        return False
