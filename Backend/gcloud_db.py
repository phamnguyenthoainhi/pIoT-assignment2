import mysql.connector

mydb = mysql.connector.connect(
  host="34.105.54.90",
  user="root",
  password="1234",
  database="car_share"
)

def createdatabase(mydb):
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE DATABASE IF NOT EXISTS db")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False

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
                                                    cost INT \
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
                                                  username VARCHAR(255), \
                                                  password VARCHAR(255), \
                                                  email VARCHAR(255), \
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
                                                  FOREIGN KEY (car_id) REFERENCES cars(car_id), \
                                                  FOREIGN KEY (user_id) REFERENCES users(user_id), \
                                                  booking_date VARCHAR(255), \
                                                  return_date VARCHAR(255) \
                                                  )")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False

def createtable_reports(mydb):
  """
  Create a table named datab1 in assignment1 database

  Parameters:
      mydb: a MySQLConnection object

  Returns: true if the query excecutes sucessfully, false if there is error

  """
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE TABLE IF NOT EXISTS reports( \
                                                  report_id INT \
                                                  auto_increment \
                                                  PRIMARY KEY, \
                                                  car_id INT, \
                                                  user_id INT, \
                                                  FOREIGN KEY (car_id) REFERENCES cars(car_id), \
                                                  FOREIGN KEY (user_id) REFERENCES users(user_id), \
                                                  report_date VARCHAR(255) \
                                                  )")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False


# createdatabase(mydb)
createtable_cars(mydb)
createtable_users(mydb)
createtable_bookings(mydb)
createtable_reports(mydb)