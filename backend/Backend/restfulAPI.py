from gcloud_db import *
from db_functions import *
import json
from flask import Blueprint, request, Response, jsonify
from db_functions import db_write
from gcloud_db import create_connection
from utils import generate_salt, generate_hash, validate_user_input, validate_user, registered_email_check
from flask_cors import CORS, cross_origin
from flask import Flask
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/')
def hello_world():
    return 'Index'


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

@app.route("/api/cars", methods=['POST'])
def addCar():
    mydb = create_connection()
    data = ""
    add_car(mydb,data)
    return

@app.route("/register", methods=["POST"])
@cross_origin()
def register_user():
    user_email = request.json["email"]
    
    user_password = request.json["password"]
    user_confirm_password = request.json["confirm_password"]
    user_role = request.json["role"]
    if user_password == user_confirm_password and validate_user_input(
        "authentication", email=user_email, password=user_password
    ) and registered_email_check(email=user_email):
        password_salt = generate_salt()
        password_hash = generate_hash(user_password, password_salt)
        mydb = create_connection()
        if db_write(mydb, 
            """INSERT INTO users (email, password_salt, password_hash, role) VALUES (%s, %s, %s, %s)""",
            (user_email, password_salt, password_hash, user_role)
        ):
            # Registration Successful
            return Response(status=201)
        else:
            # Registration Failed
            return Response(status=409)
    elif user_password != user_confirm_password:
        return Response("Password does not match", status=401)
    elif validate_user_input(
        "authentication", email=user_email, password=user_password
    ) is False:
        return Response("Input is not valid", status=401)
    elif registered_email_check(email=user_email) is False:
        return Response("Email is already registered", status=401)

    else:
        # Registration Failed
        return Response(status=400)

@app.route("/login", methods=["POST"])
def login_user():
    user_email = request.json["email"]
    user_password = request.json["password"]

    user_token = validate_user(user_email, user_password)
    print("USER_TOKEN "+ str(user_token))
    if user_token != 1 and user_token != 2 :
        return jsonify({"jwt_token": user_token[0], "role": user_token[1], "user_id": user_token[2]})
    elif user_token == 1:
        return Response("Email is not registered", status=401)
    elif user_token == 2:
        return Response("Wrong Password", status=401)
        

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

