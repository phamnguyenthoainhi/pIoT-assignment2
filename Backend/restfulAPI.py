from gcloud_db import *
from db_functions import *
from classes import *
import json
import requests

from flask import Flask, request, Response
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Index'


# Sign up
@app.route("/api/users/sign_up", methods=['POST'])
def signUp():
    mydb = create_connection()
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    role = request.json['role']

    data = [username, password, email, role]

    lastid = sign_up(mydb,data)
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)
  

# View user's rental history
@app.route("/api/users/<int:user_id>/bookings", methods=['GET'])
def rentalHistoryUser(user_id):
    mydb = create_connection()
    bookings = bookings_history_u(mydb, (user_id,))
    result = []
    for x in bookings:
            result.append(x)
    print(result)
    return json.dumps(result) 


# Get all cars
@app.route("/api/cars", methods=['GET'])
def getCars():
    mydb = create_connection()
    cars = get_cars(mydb)
    result = []
    for car in cars:
        _ = Car(car[0], car[1], car[2], car[3], car[4], car[5], car[6])
        result.append(_)
    result = tuple(result)
    return json.dumps(result)
 

#Add a car
@app.route("/api/cars", methods=['POST'])
def addCar():
    mydb = create_connection()
    make = request.json['make']
    body_type = request.json['body_type']
    color = request.json['color']
    seats = request.json['seats']
    location = request.json['location']
    cost = request.json['cost']

    data = [make, body_type, color, seats, location, cost]

    lastid = add_car(mydb,data)
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please add full record", status=400)

# Edit a car, accepts all 6 features of car and the car_id in the URL
@app.route("/api/cars/<int:car_id>", methods = ['PUT'])
def editCar(car_id):
    mydb = create_connection()

    make = request.json['make']
    body_type = request.json['body_type']
    color = request.json['color']
    seats = request.json['seats']
    location = request.json['location']
    cost = request.json['cost']

    data = [make, body_type, color, seats, location, cost, car_id]
    
    lastid = edit_car(mydb, data)
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please try again", status=400)

#Remove a car, accepts car_id in request
@app.route("/api/cars/<int:car_id>", methods= ['DELETE'])
def removeCar(car_id):
    mydb = create_connection()
    lastid = remove_car(mydb, (car_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)
           

#Add a booking
@app.route("/api/bookings", methods=['POST'])
def addBooking():
    mydb = create_connection()
    car_id = request.json['car_id']
    user_id = request.json['user_id']
    status = request.json['status']
    booking_date = request.json['booking_date']
    return_date = request.json['return_date']

    data = [car_id, user_id, status, booking_date, return_date]

    lastid = add_booking(mydb,data)
    if (lastid is not None):
        return "Success"
    return Response("Record missing, please add full record", status=400)

#Remove a booking
@app.route("/api/bookings/<int:booking_id>", methods=['DELETE'])
def rmBooking(booking_id):
    mydb = create_connection()
    lastid = remove_booking(mydb, (booking_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

#Edit a booking, accepts status, booking_date, return_date and finally booking id
@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
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
def rentalHistory(car_id):
    mydb = create_connection()
    bookings = bookings_history(mydb, (car_id,))
    result = []
    for x in bookings:
            result.append(x)
    return json.dumps(result) 

# View reports
@app.route("/api/reports", methods=['GET'])
def getReports():
    mydb = create_connection()
    reports = view_reports(mydb)
    result = []
    for x in reports:
        result.append(x)
    return json.dumps(result)

# Add a report
@app.route("/api/reports", methods=['POST'])
def addReport():
    mydb = create_connection()

    car_id = request.json['car_id']
    user_id = request.json['user_id']
    content = request.json['content']
    report_date = request.json['report_date']

    data = [car_id, user_id, content, report_date]

    lastid = add_report(mydb,data)
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

#Edit a report with id, accepts content
@app.route("/api/reports/<int:report_id>", methods=["PUT"])
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
def rmReport(report_id):
    mydb = create_connection()
    lastid = remove_report(mydb, (report_id,))
    if (lastid is not None):
        return "Success"
    return Response("Bad request", status=400)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')