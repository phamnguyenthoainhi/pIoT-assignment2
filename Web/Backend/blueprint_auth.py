# blueprint_auth.py
from flask import Blueprint, request, Response, jsonify
from db_functions import db_write
from gcloud_db import create_connection
from utils import generate_salt, generate_hash, validate_user_input, validate_user
authentication = Blueprint("authentication", __name__)

# Register a user with username and password
@authentication.route("/register", methods=["POST"])
def register_user():
    user_email = request.json["email"]
    user_password = request.json["password"]
    user_confirm_password = request.json["confirm_password"]

    if user_password == user_confirm_password and validate_user_input(
        "authentication", email=user_email, password=user_password
    ):
        password_salt = generate_salt()
        password_hash = generate_hash(user_password, password_salt)
        mydb = create_connection()
        if db_write(mydb, 
            """INSERT INTO users (email, password_salt, password_hash, ) VALUES (%s, %s, %s)""",
            (user_email, password_salt, password_hash)
        ):
            # Registration Successful
            return Response(status=201)
        else:
            # Registration Failed
            return Response(status=409)
    else:
        # Registration Failed
        return Response(status=400)

# Login user with username and password
@authentication.route("/login", methods=["POST"])
def login_user():
    user_email = request.json["email"]
    user_password = request.json["password"]
    user_token = validate_user(user_email, user_password)
    # Login Successful
    if user_token:
        return jsonify({"jwt_token": user_token})
    # Login Failed
    else:
        Response(status=401)


