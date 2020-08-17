from gcloud_db import *
from db_functions import *
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
    try:
        mydb = create_connection()
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        role = request.json['role']

        data = [username, password, email, role]

        lastid = sign_up(mydb,data)
        if (lastid is not None):
            return "Success"
        return "Please try again, data has not been inserted"
    except KeyError:
        return Response("Record missing, please add full record", status=400)


# Get all cars
@app.route("/api/cars", methods=['GET'])
def getCars():
    try: 
        mydb = create_connection()
        cars = get_cars(mydb)
        result = []
        for x in cars:
            result.append(x)
        return json.dumps(result) 
    except TypeError as e:
        print(e)

#Add a car
@app.route("/api/cars", methods=['POST'])
def addCar():
    try: 
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

        return "Please try again, data has not been inserted"
    except KeyError:
        return Response("Record missing, please add full record", status=400)

#Remove a car, accepts car_id in request
@app.route("/api/cars/<int:car_id>", methods= ['DELETE'])
def removeCar(car_id):
    mydb = create_connection()
    lastid = remove_car(mydb, (car_id,))
    if (lastid is not None):
        return "Success"
    return "Please try again, record has not been deleted"
           

#Add a booking
@app.route("/api/bookings", methods=['POST'])
def addBooking():
    try: 
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

        return "Please try again, booking has not been inserted"
    except KeyError:
        return Response("Record missing, please add full record", status=400)

#Remove a booking
@app.route("/api/bookings/<int:booking_id>", methods=['DELETE'])
def rmBooking(booking_id):
    mydb = create_connection()
    lastid = remove_booking(mydb, (booking_id,))
    if (lastid is not None):
        return "Success"
    return "Please try again, record has not been deleted"

# View car's rental history
@app.route("/api/cars/<int:car_id>/bookings", methods=['GET'])
def rentalHistory(car_id):
    mydb = create_connection()
    bookings = bookings_history(mydb, (car_id,))
    result = []
    for x in bookings:
            result.append(x)
    print(result)
    return json.dumps(result) 

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')