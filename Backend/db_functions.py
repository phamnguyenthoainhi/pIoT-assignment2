import mysql.connector
from gcloud_db import create_connection


# Add a user
def sign_up(mydb, data):
    try:
        sql = "INSERT INTO users \
        (username, password, email, role) VALUES (%s, %s, %s, %s)"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))


# Get all cars from db
def get_cars(mydb):
    try:
        sql = "select * from cars"
        cursor = mydb.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        print(str(e))

# Add a car
def add_car(mydb, data):
    try:
        sql = "INSERT INTO cars \
        (make, body_type, color, seats, location, cost) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))

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

# Add a booking
def add_booking(mydb,data):
    try:
        sql = "INSERT INTO bookings \
        (car_id, user_id, status, booking_date, return_date) VALUES (%s, %s, %s, %s, %s)"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))


# View rental history of a car (all of its bookings)
def bookings_history(mydb,data):
    try:

        return


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

mydb = create_connection()
# get_cars(mydb)
# car = ["make1", "body_type1", "color1", 1, "location1", 1]
# add_car(mydb, car)
# remove_car(mydb, (10,))