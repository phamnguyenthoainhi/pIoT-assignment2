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

# Edit a car
def edit_car(mydb, data):
    try:
        sql = "UPDATE cars SET make = %s, body_type = %s, color = %s, seats = %s, location = %s, cost = %s \
            WHERE car_id = %s "
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

# Edit a booking with id
def edit_booking(mydb, data):
    try:
        sql = "UPDATE bookings SET status = %s, booking_date = %s, return_date = %s\
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
def edit_report(mybd,data):
    try:
        sql = "UPDATE reports SET content = %s \
            WHERE report_id = %s"
        cursor = mydb.cursor()
        cursor.execute(sql, data)
        mydb.commit()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print(str(e))

mydb = create_connection()
# get_cars(mydb)
# car = ["make1", "body_type1", "color1", 1, "location1", 1, 1]
# add_car(mydb, car)
# remove_car(mydb, (10,))
# edit_car(mydb, car)