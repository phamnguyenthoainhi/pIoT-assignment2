import mysql.connector
from gcloud_db import create_connection
import sys

def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

def insertBLOB(mydb, user_id, name, photo):
    try:
        cursor = mydb.cursor()
        sql_insert_blob_query = """ INSERT INTO photos
                          (user_id, username, photo) VALUES (%s,%s,%s)"""
        empPicture = convertToBinaryData(photo)
        insert_blob_tuple = (user_id, name, empPicture)
        cursor.execute(sql_insert_blob_query, insert_blob_tuple)
        cursor.commit()
        return("Success")
    except mysql.connector.Error as error:
        return("Failed inserting BLOB data into MySQL table {}".format(error))

def delete_photo(mydb, photo_id):
    
    return "Success"


# Get car by id
def get_car(mydb, data):
    try:
        sql = "select * from cars where car_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))

# Get all users
def get_users(mydb):
    try:
        sql = "select * from users"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))

# Get a user by id
def get_user(mydb, data):
    try:
        sql = "select username, email from users where user_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))

# Remove a user by id
def remove_user(mydb, data):
    try:
        sql = "DELETE FROM users WHERE user_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Edit a user by id
def edit_user(mydb, data):
    try:
        sql = "UPDATE users SET username = %s, email = %s \
            WHERE user_id = %s "
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

def get_cars(mydb):
    try:
        sql = "select * from cars"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
        

    except mysql.connector.Error as e:
        print(str(e))

def add_car(mydb, data):
    try:
        sql = "INSERT INTO cars \
        (make, body_type, color, seats, location, cost, latitude, longitude) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))


def db_write(mydb, query, params):
    cursor = mydb.cursor()
    try:
        cursor.execute(query, params)
        mydb.commit()
        cursor.close()

        return True

    except mysql.connector.Error as e:
        cursor.close()
        print(e)
        return False


def db_read(mydb, query, params=None):
    cursor = mydb.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    entries = cursor.fetchall()
    cursor.close()

    content = []

    for entry in entries:
        content.append(entry)

    return content


# Remove a car with car_id
def remove_car(mydb, data):
    try:
        sql = "DELETE FROM cars WHERE car_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Edit a car by id
def edit_car(mydb, data):
    try:
        sql = "UPDATE cars SET make = %s, body_type = %s, color = %s, seats = %s, location = %s, cost = %s, latitude = %s, longitude = %s \
            WHERE car_id = %s "
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Lock a car by id
def lock_car(mydb, data):
    try:
        sql = "UPDATE cars SET locked = 1 WHERE car_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Unlock a car by id
def unlock_car(mydb, data):
    try:
        sql = "UPDATE cars SET locked = 0 WHERE car_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))


# Get all cars that are locked
def get_locked(mydb):
    try:
        sql = "select * from cars where locked = 1"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))  

# Get all cars that are unlocked
def get_unlocked(mydb):
    try:
        sql = "select * from cars where locked = 0"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e)) 

# Get all bookings booking_dates of a car
def car_booking_dates(mydb, data):
    try:   
        sql = "select booking_date from bookings where car_id = %s"
        cursor= mydb.cursor()
        cursor.execute(sql, data)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e)) 

# Get all bookings return_dates of a car
def car_return_dates(mydb, data):
    try:
        sql = "select return_date from bookings where car_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e)) 

# Add a booking
def add_booking(mydb,data):
    try:
        sql = "INSERT INTO bookings \
        (car_id, user_id, status, booking_date, return_date, price) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))

# Edit a booking with id
def edit_booking(mydb, data):
    try:
        sql = "UPDATE bookings SET status = %s, booking_date = %s, return_date = %s, price = %s\
            WHERE booking_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))

# View rental history of a car (all of its bookings)
def bookings_history(mydb,data):
    try:
        sql = "SELECT * FROM bookings where car_id = %s"
        print(sql)
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        bookings = cursor.fetchall()
        return bookings
    except mysql.connector.Error as e:
        print(str(e))

# View rental history of a user (all of their bookings)
def bookings_history_u(mydb,data):
    try:
        sql = "SELECT * FROM bookings where user_id = %s"
        print(sql)
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        bookings = cursor.fetchall()
        return bookings
    except mysql.connector.Error as e:
        print(str(e))


# Remove a booking
def remove_booking(mydb,data):
    try:
        sql = "DELETE FROM bookings WHERE booking_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Get all bookings
def get_bookings(mydb):
    try:
        sql = "select * from bookings"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))

# View reports
def view_reports(mydb):
    try:
        sql = "select * from reports"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))

# Add a report
def add_report(mydb, data):
    try:
        sql = "INSERT INTO reports (car_id, user_id, content, report_date) VALUES (%s, %s, %s, %s)"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Remove a report
def remove_report(mydb, data):
    try:
        sql = "DELETE FROM cars WHERE report_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid
    except mysql.connector.Error as e:
        print(str(e))

# Edit a report and change its content
def edit_report(mydb,data):
    try:
        sql = "UPDATE reports SET content = %s \
            WHERE report_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))

# mydb = create_connection()
# print(get_car(mydb, (2,)))
# print(car_booking_dates(mydb, (1,)))
# print(car_return_dates(mydb, (1,)))