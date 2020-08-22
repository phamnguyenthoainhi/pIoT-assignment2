import os
from hashlib import pbkdf2_hmac
import jwt
from db_functions import db_write, db_read
from gcloud_db import create_connection

def generate_salt():
    salt = os.urandom(16)
    print("SALT: " + str(salt.hex()))
    return salt.hex()


def generate_hash(plain_password, password_salt):
    password_hash = pbkdf2_hmac(
        "sha256",
        b"%b" % bytes(plain_password, "utf-8"),
        b"%b" % bytes(password_salt, "utf-8"),
        10000,
    )
    print("PASSWORD: " + str(password_hash.hex()))
    return password_hash.hex()


def validate_user_input(input_type, **kwargs):
    if input_type == "authentication":
        if len(kwargs["email"]) <= 255 and len(kwargs["password"]) <= 255:
            return True
        else:
            return False


def generate_jwt_token(content):
    encoded_content = jwt.encode(content, "JWT_SECRET_KEY", algorithm="HS256")
    print("ENCODED CONTENT "+ str(encoded_content))
    
    token = str(encoded_content).split("'")[1]
    print("TOKEN "+ str(token))
    return token

def registered_email_check(email):
    mydb = create_connection()
    input_email = db_read(mydb, """SELECT * FROM users Where email = %s""", (email,))
    print("-------------------")
    print(input_email)
    if len(input_email) == 0:
        return True
    else:
        return False


def validate_user(email, password):
    mydb = create_connection()
    current_user = db_read(mydb, """SELECT * FROM users WHERE email = %s""", (email,))
    
    if len(current_user) == 1:
        
        saved_password_hash = current_user[0][3]
        saved_password_salt = current_user[0][2]
        role = current_user[0][4]
        password_hash = generate_hash(password, saved_password_salt)

        if password_hash == saved_password_hash:
            user_id = current_user[0][0]
            jwt_token = generate_jwt_token({"id": user_id})
            return [jwt_token, role, user_id]
        else:
            return 2

    else:
        return 1