from gcloud_db import *
from flask import Flask
from flask_mail import Mail, Message
from db_functions import *
import json
from collections import Counter
from classes import *
from flask import Blueprint, request, Response, jsonify
from gcloud_db import create_connection
from utils import *
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'carsharepIoT@gmail.com'
app.config['MAIL_PASSWORD'] = 'a123456789!'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
@app.route('/')
def hello_world():
    return 'Index'

# Insert photo
@app.route("/api/photos/<int:user_id>", methods=['POST'])
@cross_origin()
def insert_photo(user_id):
    print(request.json)
    mydb = create_connection()
    user_id = request.json["user_id"]
    username = request.json["username"]
    photo = request.json["photo"]
    success = convertPhoto(photo, username, user_id)
    # lastid = insertBLOB(mydb, user_id, username, photo)
    if (success is not None):
        return "Success"
    return Response("Record missing, please add full record", status=400)

# Delete photo
@app.route("/api/photos/<int:photo_id>", methods=['DELETE'])
@cross_origin()
def delete_photo_api(photo_id):
    mydb = create_connection()
    lastid = delete_photo(mydb, (photo_id,))
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please add full record", status=400)

# Get 5 cars with the most bookings, returns array of tuple(car_id, number of bookings) 
@app.route("/api/cars/mostbookings", methods=['GET'])
@cross_origin()
def most_bookings():
    mydb = create_connection()
    allBookings = get_bookings(mydb)
    occurences = []
    for booking in allBookings:
        carMake = get_car(mydb, (booking[1],))[0][1]
        occurences.append(carMake)
    c = Counter(occurences)
    return json.dumps(tuple(c.most_common(5)))

# Get 5 cars with the least bookings, returns array of tuple(car_id, number of bookings)
@app.route("/api/cars/leastbookings", methods=['GET'])
@cross_origin()
def least_bookings():
    mydb = create_connection()
    allBookings = get_bookings(mydb)
    occurences = []
    for booking in allBookings:
        carMake = get_car(mydb, (booking[1],))[0][1]
        occurences.append(carMake)
    c = Counter(occurences)
    return json.dumps(tuple(c.most_common()[:-6:-1]))

# Get 5 cars with the most revenue, returns array of tuple(car_id, total revenue)
@app.route("/api/cars/mostrevenues", methods=['GET'])
@cross_origin()
def most_revenues():
    mydb = create_connection()
    allBookings = get_bookings(mydb)
    # occurences = []
    results = {}
    for booking in allBookings:
        carMake = get_car(mydb, (booking[1],))[0][1]
        if carMake in results:
            # print(results[booking[1]])
            # print(booking[6])
            _ = results[carMake] + booking[6]
            results[carMake] =_
            #results.update({booking[1]: _})
            # print("hello")
        else:
            results[carMake] = booking[6]
            # print("key exists")
    actualResults = []
    for result in sorted(results, key=results.get, reverse = True):
        actualResults.append((result, results[result]))
    # print(actualResults)
    return json.dumps(tuple(actualResults))

@app.route("/api/cars/countmake", methods=['GET'])
@cross_origin()
def count_carmake_api():
    mydb = create_connection()
    countmake = count_carmake(mydb)
    
    for number in countmake:
        print(number)
        print(type(number))
    return json.dumps(countmake)
    

# Get revenues by month in a year
@app.route("/api/monthlyrevenues", methods=['GET'])
@cross_origin()
def monthlyRevenues():
    mydb = create_connection()
    results = {}
    allBookings = get_bookings(mydb)
    for booking in allBookings:
        month = booking[-2].split("-")[1]
        price = booking[-1]
        if month in results:
            _ = results[month] + price
            results[month] = _
        else:
            results[month] = price 
    actualResults = []
    for result in sorted(results):
        actualResults.append((result, results[result]))
    # print(actualResults)
    return json.dumps(tuple(actualResults))        
    # return json.dumps(result)

# View user's rental history
@app.route("/api/users/<int:user_id>/bookings", methods=['GET'])
@cross_origin()
def rentalHistoryUser(user_id):
    mydb = create_connection()
    bookings = bookings_history_u(mydb, (user_id,))
    result = []
    for booking in bookings:
        _ = Booking(booking[0], booking[1], booking[2], booking[3], booking[4], booking[5], booking[6])
        car = get_car(mydb, (booking[1],))
        carObject = Car(car[0][0], car[0][1], car[0][2], car[0][3], car[0][4], car[0][5], car[0][6], car[0][7], car[0][8], car[0][9])
        _.car = carObject
        user = get_user(mydb, (booking[2],))
        userObject = User(booking[2], user[0][0], user[0][1])
        _.user = userObject
        result.append(_)
    result = tuple(result)
    return json.dumps(result, cls = ComplexEncoder) 


# Get all cars
@app.route("/api/cars", methods=['GET'])
@cross_origin()
def getCars():
    mydb = create_connection()
    cars = get_cars(mydb)
    result = []
    for car in cars:
        _ = Car(car[0], car[1], car[2], car[3], car[4], car[5], car[6], car[7], car[8], car[9])
        result.append(_)
    
    result = tuple(result)
    return json.dumps(result, cls = ComplexEncoder)

#Add a car
@app.route("/api/cars", methods=['POST'])
@cross_origin()
def addCar():
    mydb = create_connection()
    make = request.json['make']
    body_type = request.json['body_type']
    color = request.json['color']
    seats = request.json['seats']
    location = request.json['location']
    cost = request.json['cost']
    latitude = request.json['latitude']
    longitude = request.json['longitude']

    data = [make, body_type, color, seats, location, cost, latitude, longitude]

    lastid = add_car(mydb,data)
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please add full record", status=400)

# Edit a car, accepts all 6 features of car and the car_id in the URL
@app.route("/api/cars/<int:car_id>", methods = ['PUT'])
@cross_origin()
def editCar(car_id):
    mydb = create_connection()

    make = request.json['make']
    body_type = request.json['body_type']
    color = request.json['color']
    seats = request.json['seats']
    location = request.json['location']
    cost = request.json['cost']
    latitude = request.json['latitude']
    longitude = request.json['longitude']
# make = %s, body_type = %s, color = %s, seats = %s, location = %s, cost = %s, latitude = %s, longitude
    data = [make, body_type, color, seats, location, cost, latitude, longitude, car_id]
    
    lastid = edit_car(mydb, data)
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please try again", status=400)

#Remove a car, accepts car_id in request
@app.route("/api/cars/<int:car_id>", methods= ['DELETE'])
@cross_origin()
def removeCar(car_id):
    mydb = create_connection()
    lastid = remove_car(mydb, (car_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)
           
# Lock a car, accepts car_id in request
@app.route("/api/cars/<int:car_id>/lock", methods=['PUT'])
@cross_origin()
def lockCar(car_id):
    mydb = create_connection()
    lastid = lock_car(mydb, (car_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

# Unlock a car, accepts car_id in request
@app.route("/api/cars/<int:car_id>/unlock", methods=['PUT'])
@cross_origin()
def unLockCar(car_id):
    mydb = create_connection()
    lastid = unlock_car(mydb, (car_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

#Get all bookings
@app.route("/api/bookings", methods=['GET'])
@cross_origin()
def getBookings():
    mydb = create_connection()
    bookings = get_bookings(mydb)
    result = []
    for booking in bookings:
        _ = Booking(booking[0], booking[1], booking[2], booking[3], booking[4], booking[5], booking[6])
        car = get_car(mydb, (booking[1],))
        carObject = Car(car[0][0], car[0][1], car[0][2], car[0][3], car[0][4], car[0][5], car[0][6], car[0][7], car[0][8], car[0][9])
        _.car = carObject
        user = get_user(mydb, (booking[2],))
        userObject = User(booking[2], user[0][0], user[0][1])
        _.user = userObject
        result.append(_)
    result = tuple(result)
    return json.dumps(result, cls = ComplexEncoder)  

#Add a booking
@app.route("/api/bookings", methods=['POST'])
@cross_origin()
def addBooking():
    mydb = create_connection()
    car_id = request.json['car_id']
    user_id = request.json['user_id']
    status = request.json['status']
    booking_date = request.json['booking_date']
    return_date = request.json['return_date']
    price = request.json['price']
    data = [car_id, user_id, status, booking_date, return_date, price]

    lastid = add_booking(mydb,data)
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please add full record", status=400)

#Remove a booking
@app.route("/api/bookings/<int:booking_id>", methods=['DELETE'])
@cross_origin()
def rmBooking(booking_id):
    mydb = create_connection()
    lastid = remove_booking(mydb, (booking_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

#Edit a booking, accepts status, booking_date, return_date and finally booking id
@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
@cross_origin()
def editBooking(booking_id):
    mydb = create_connection() 

    status = request.json['status']
    booking_date = request.json['booking_date']
    return_date = request.json['return_date']

    data = [status, booking_date, return_date, booking_id]

    lastid = edit_booking(mydb, data)
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

# View car's rental history
@app.route("/api/cars/<int:car_id>/bookings", methods=['GET'])
@cross_origin()
def rentalHistory(car_id):
    mydb = create_connection()
    bookings = bookings_history(mydb, (car_id,))
    car = get_car(mydb, (car_id,))
    carObject = Car(car[0][0], car[0][1], car[0][2], car[0][3], car[0][4], car[0][5], car[0][6], car[0][7], car[0][8], car[0][9])
    result = []
    for booking in bookings:
        _ = Booking(booking[0], booking[1], booking[2], booking[3], booking[4], booking[5], booking[6])
        _.car = carObject
        user = get_user(mydb, (booking[2],))
        userObject = User(booking[2], user[0][0], user[0][1])
        _.user = userObject
        result.append(_)
    result = tuple(result)
    return json.dumps(result, cls = ComplexEncoder)  

# Get all booking dates of a car
@app.route("/api/cars/<int:car_id>/booking_dates", methods = ['GET'])
@cross_origin()
def getBookingDates(car_id):
    mydb = create_connection()
    bookingDates = car_booking_dates(mydb, (car_id,))
    results = []
    for i in bookingDates:
        results.append(i[0])
    return json.dumps(results, cls = ComplexEncoder)

# Get all return dates of a car
@app.route("/api/cars/<int:car_id>/return_dates", methods = ['GET'])
@cross_origin()
def getReturnDates(car_id):
    mydb = create_connection()
    returnDates = car_return_dates(mydb, (car_id,))
    results = []
    for i in returnDates:
        results.append(i[0])
    return json.dumps(results, cls = ComplexEncoder)


# View reports
@app.route("/api/reports", methods=['GET'])
@cross_origin()
def getReports():
    mydb = create_connection()
    reports = view_reports(mydb)
    result = []
    for report in reports:
        _ = Report(report[0], report[1], report[2], report[3], report[4])
        car = get_car(mydb, (report[1], ))
        carObject = Car(car[0][0], car[0][1], car[0][2], car[0][3], car[0][4], car[0][5], car[0][6], car[0][7], car[0][8], car[0][9])
        _.car = carObject
        result.append(_)
    result = tuple(result)
    return json.dumps(result, cls = ComplexEncoder)

# Add a report
@app.route("/api/reports", methods=['POST'])
@cross_origin()
def addReport():
    mydb = create_connection()

    car_id = request.json['car_id']
    user_id = request.json['user_id']
    content = request.json['content']
    report_date = request.json['report_date']

    data = [car_id, user_id, content, report_date]

    lastid = add_report(mydb,data)
    if (lastid is not None):
        engineers = get_engineers(mydb)
        if (engineers is not None):
            with app.app_context():
                 with mail.connect() as conn:
                    for user in engineers:
                        message = 'A new car report has been added. Please check your dashboard for more information!'
                        subject = "Hello Engineer, %s" % user
                        msg = Message(recipients=[user],
                                    body=message,
                                    subject=subject, sender = 'carsharepIoT@gmail.com')

                        conn.send(msg)
        return "Success"
    return Response("Bad request", status=400)

#Edit a report with id, accepts content
@app.route("/api/reports/<int:report_id>", methods=["PUT"])
@cross_origin()
def editReport(report_id):
    mydb = create_connection() 

    content = request.json['content']

    data = [content, report_id]

    lastid = edit_booking(mydb, data)
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

#Remove a report with id
@app.route("/api/reports/<int:report_id>", methods=['DELETE'])
@cross_origin()
def rmReport(report_id):
    mydb = create_connection()
    lastid = remove_report(mydb, (report_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

@app.route("/register", methods=["POST"])
@cross_origin()
def register_user():
    user_email = request.json["email"]
    user_password = request.json["password"]
    user_confirm_password = request.json["confirm_password"]
    user_role = request.json["role"]
    user_name = request.json['username']
    if user_password == user_confirm_password and validate_user_input(
        "authentication", username=user_name, password=user_password
    ) and registered_email_check(username=user_name):
        password_salt = generate_salt()
        password_hash = generate_hash(user_password, password_salt)
        mydb = create_connection()
        lastrowid = db_write(mydb, 
            """INSERT INTO users (username, email, password_salt, password_hash, role) VALUES (%s, %s, %s, %s, %s)""",
            (user_name, user_email, password_salt, password_hash, user_role))
        
        if lastrowid is not None:
        
            # Registration Successful
            return Response(str(lastrowid), status=201)
        else:
            # Registration Failed
            return Response(status=409)
    elif user_password != user_confirm_password:
        return Response("Password does not match", status=401)
    elif validate_user_input(
        "authentication", username=user_name, password=user_password
    ) is False:
        return Response("Input is not valid", status=401)
    elif registered_email_check(username=user_name) is False:
        return Response("Username is already registered", status=401)

    else:
        # Registration Failed
        return Response(status=400)

@app.route("/login", methods=["POST"])
@cross_origin()
def login_user():
    user_name = request.json["username"]
    user_password = request.json["password"]

    user_token = validate_user(user_name, user_password)
    print("USER_TOKEN "+ str(user_token))
    if user_token != 1 and user_token != 2 :
        return jsonify({"jwt_token": user_token[0], "role": user_token[1], "user_id": user_token[2]})
    elif user_token == 1:
        return Response("Username is not registered", status=401)
    elif user_token == 2:
        return Response("Wrong Password", status=401)
        
# Get all users
@app.route("/api/users", methods=['GET'])
@cross_origin()
def getUsers():
    mydb = create_connection()
    users = get_users(mydb)
    result = []
    for user in users:
        _ = User(user[0], user[1], user[2], user[3], user[4], user[5])
        result.append(_)
    result = tuple(result)
    return json.dumps(result, cls = ComplexEncoder)

# Remove a user by id
@app.route("/api/users/<int:user_id>", methods= ['DELETE'])
@cross_origin()
def removeUser(user_id):
    mydb = create_connection()
    lastid = remove_user(mydb, (user_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

# Edit a user by id, accepts username and email
@app.route("/api/users/<int:user_id>", methods=["PUT"])
@cross_origin()
def editUser(user_id):
    mydb = create_connection() 

    username = request.json['username']
    email = request.json['email']

    data = [username, email, user_id]

    lastid = edit_user(mydb, data)
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)
 

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

