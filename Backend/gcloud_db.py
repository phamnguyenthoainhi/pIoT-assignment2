import mysql.connector
import pymysql
import os
import sqlalchemy
from sqlalchemy import exc
db_user = "root"
db_password = '1234'
db_name = 'car_share'
db_connection_name = 'iot-assignment2-286206:asia-east2:iot-programming-asntwo'
# mydb = mysql.connector.connect(
        #     host="35.220.177.82",
        #     user="root",
        #     password="1234",
        #     database="car_share"
        # )
        # unix_socket = '/cloudsql/{}'.format(db_connection_name)
        # mydb = pymysql.connect(user="root", password="1234",
        #                             unix_socket=unix_socket, db="car_share")
        # mydb = sqlalchemy.create_engine(
        
        #     sqlalchemy.engine.url.URL(
        #         drivername="mysql+pymysql",
        #         username='root',  # e.g. "my-database-user"
        #         password='1234',  # e.g. "my-database-password"
        #         database='car_share',  # e.g. "my-database-name"
        #         query={
        #             "unix_socket": "{}/{}".format(
        #                 "/cloudsql",  # e.g. "/cloudsql"
        #                 "iot-assignment2-286206:asia-east2:iot-programming-asntwo")  # i.e "<PROJECT-NAME>:<INSTANCE-REGION>:<INSTANCE-NAME>"
        #         }
        #     )

        # )      
def create_connection():
    mydb = None
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="car_share"
            # ,
            # unix_socket = '/cloudsql/{}'.format(db_connection_name)
        )

        # unix_socket = '/cloudsql/{}'.format(db_connection_name)
        # mydb = pymysql.connect(user=db_user, password=db_password,
        #                     unix_socket=unix_socket, db=db_name)
                            
        print("CONNECTING DATABASE...")
        return mydb
        
    except mysql.connector.Error as e:
        print(e)

        # if os.environ.get('GAE_ENV') == 'standard':
                # If deployed, use the local socket interface for accessing Cloud SQL
        # unix_socket = '/cloudsql/{}'.format(db_connection_name)
        # mydb = pymysql.connect(user=db_user, password=db_password,
        #                     unix_socket=unix_socket, db=db_name)
        # else:
               
        #     host = '127.0.0.1'
        #     mydb = pymysql.connect(user=db_user, password=db_password,
        #                         host=host, db=db_name)
        # mydb = sqlalchemy.create_engine(
        # # Equivalent URL:
        # # mysql+pymysql://<db_user>:<db_pass>@/<db_name>?unix_socket=<socket_path>/<cloud_sql_instance_name>
        #     sqlalchemy.engine.url.URL(
        #         drivername="mysql+pymysql",
        #         username='root',  # e.g. "my-database-user"
        #         password='1234',  # e.g. "my-database-password"
        #         database='car_share',  # e.g. "my-database-name"
        #         query={
        #             "unix_socket": '/cloudsql/{}'.format(db_connection_name)
        #         }
        #     )
        # # ... Specify additional properties here.

        # )        
        
    # try:
    #     mydb = mysql.connector.connect(
    #         host="34.105.54.90",
    #         user="root",
    #         password="1234",
    #         database="car_share"
    #     )
    #     return mydb

    # try:
        # mydb = mysql.connector.connect(
        #     host="localhost",
        #     user="root",
        #     password="",
        #     database="car_share"
        # )
        # mydb = mysql.connector.connect(
        #     host="35.221.215.154",
        #     user="root",
        #     password="1234",
        #     database="car_share"
        # )
        # mydb = pymysql.connect(host='35.221.215.154',
        #                      user='root',
        #                      password='1234',
        #                      db='car_share')
        

    



def createtable_cars(mydb):
    """
    Create a table named datab1 in assignment1 database
    Parameters:
        mydb: a MySQLConnection object
    Returns: true if the query excecutes sucessfully, false if there is error
    """
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
  """
  Create a table named datab1 in assignment1 database
  Parameters:
      mydb: a MySQLConnection object
  Returns: true if the query excecutes sucessfully, false if there is error
  """
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
  """
  Create a table named datab1 in assignment1 database
  Parameters:
      mydb: a MySQLConnection object
  Returns: true if the query excecutes sucessfully, false if there is error
  """
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



mydb = create_connection()
createtable_cars(mydb)
createtable_users(mydb)
createtable_bookings(mydb)
createtable_reports(mydb)
createtable_photos(mydb)