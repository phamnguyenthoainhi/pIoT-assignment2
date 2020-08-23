import mysql.connector

def create_connection():
    mydb = None
    # try:
    #     mydb = mysql.connector.connect(
    #         host="34.105.54.90",
    #         user="root",
    #         password="1234",
    #         database="car_share"
    #     )
    #     return mydb

    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="user",
            password="1234",
            database="car_share"
        )
        return mydb

    except mysql.connector.Error as e:
        print(e)



def createtable_cars(mydb):
    """

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
                                                    cost FLOAT \
                                                    )")
        return True

    except mysql.connector.Error as e:
        print(str(e))
        return False

def createtable_users(mydb):
  """

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
  """
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE TABLE IF NOT EXISTS reports( \
                                                  report_id INT \
                                                  auto_increment \
                                                  PRIMARY KEY, \
                                                  car_id INT, \
                                                  user_id INT, \
                                                  content VARCHAR(255),\
                                                  FOREIGN KEY (car_id) REFERENCES cars(car_id), \
                                                  FOREIGN KEY (user_id) REFERENCES users(user_id), \
                                                  report_date VARCHAR(255) \
                                                  )")
      return True

  except mysql.connector.Error as e:
      print(str(e))
      return False

def createtable_pictures(mydb):
  """
  """
  try:
      cursor = mydb.cursor()
      cursor.execute("CREATE TABLE IF NOT EXISTS pictures( \
                                                  picture_id INT \
                                                  auto_increment \
                                                  PRIMARY KEY, \
                                                  user_id INT, \
                                                  username VARCHAR(255),\
                                                  email VARCHAR(255),\
                                                  picture BINARY,\
                                                  FOREIGN KEY (user_id) REFERENCES users(user_id) \
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
createtable_pictures(mydb)