import os
from hashlib import pbkdf2_hmac
import jwt
from db_functions import *
from gcloud_db import create_connection
import base64
import os
import pathlib


def generate_salt():
    """
    Generate salt ranromly
    """
    salt = os.urandom(16)
    print("SALT: " + str(salt.hex()))
    return salt.hex()


def generate_hash(plain_password, password_salt):
    """
    Generate hash taking plain_password and password_salt as paramters
    """
    password_hash = pbkdf2_hmac(
        "sha256",
        b"%b" % bytes(plain_password, "utf-8"),
        b"%b" % bytes(password_salt, "utf-8"),
        10000,
    )
    print("PASSWORD: " + str(password_hash.hex()))
    return password_hash.hex()


def validate_user_input(input_type, **kwargs):
    """
    Validate user input
    """
    if input_type == "authentication":
        if len(kwargs["username"]) <= 255 and len(kwargs["password"]) <= 255:
            return True
        else:
            return False


def generate_jwt_token(content):
    """
    Generate jwt token
    """
    encoded_content = jwt.encode(content, "JWT_SECRET_KEY", algorithm="HS256")
    print("ENCODED CONTENT "+ str(encoded_content))
    
    token = str(encoded_content).split("'")[1]
    print("TOKEN "+ str(token))
    return token


def registered_email_check(username):
    """
    Check if user has been registered or not
    """
    mydb = create_connection()
    input_email = db_read(mydb, """SELECT * FROM users Where username = %s""", (username,))
    print("-------------------")
    print(input_email)
    if len(input_email) == 0:
        return True
    else:
        return False


def convertPhoto(photo, username, user_id):
    """
    Convert photo from base64 string to File and then from file to binary and insert that binary to database
    """
    path = str(pathlib.Path(__file__).parent.absolute()) + "/"
    # convert b64string to File
    imgdata = base64.b64decode(photo)
    filename = path +username + '.jpg'
    with open(filename, 'wb') as f:
        # create a photo in current path
        f.write(imgdata)
    with open(filename, mode='rb') as file:
        # convert photo to binary
        photobinary = file.read()
        mydb = create_connection()
        success = insertBLOB(mydb, user_id, username, photobinary)
        if (success is not None):
            # after insert binary photo to database successfully, check if that photo is in current path
            if os.path.exists(path+username+".jpg"):
                # Remove photo
                os.remove(path+username+".jpg")
                return "Success"
            else:
                print("The file does not exist")
        

def validate_user(username, password):
    """
    Check if username and password are correct
    """
    mydb = create_connection()
    current_user = db_read(mydb, """SELECT * FROM users WHERE username = %s""", (username,))
    if len(current_user) == 1:
        
        saved_password_hash = current_user[0][4]
        saved_password_salt = current_user[0][3]
        role = current_user[0][5]
        password_hash = generate_hash(password, saved_password_salt)
        # if input password match with saved password
        if password_hash == saved_password_hash:
            user_id = current_user[0][0]
            jwt_token = generate_jwt_token({"id": user_id})
            # return token, role and userid
            return [jwt_token, role, user_id]
        else:
            # login fails
            return 2
    else:
        # input user name has not been registered
        return 1