from gcloud_db import *
from db_functions import *
import json
import requests

from flask import Flask, request, Response
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Index'

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
        booking_date = request.json['booking_date']
        return_date = request.json['return_date']

        data = [car_id, user_id, booking_date, return_date]

        lastid = add_booking(mydb,data)
        if (lastid is not None):
            return "Success"

        return "Please try again, data has not been inserted"
    except KeyError:
        return Response("Record missing, please add full record", status=400)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')