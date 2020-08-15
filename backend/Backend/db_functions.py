import mysql.connector
from gcloud_db import create_connection


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
        (make, body_type, color, seats, location, cost) VALUES (%s, %s, %s, %s, %s, %s)"
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
mydb = create_connection()
get_cars(mydb)