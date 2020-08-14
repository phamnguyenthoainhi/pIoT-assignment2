from gcloud_db import *
from db_functions import *
import json

from flask import Flask
app = Flask(__name__)

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')