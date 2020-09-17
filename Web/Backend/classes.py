import json

class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj,'reprJSON'):
            return obj.reprJSON()
        else:
            return json.JSONEncoder.default(self, obj)

class Car():
    car_id = int
    make = str
    body_type = str
    color = str
    seats = int
    location = str
    cost = float
    locked = bool
    latitude = float
    longitude = float

    def __init__(self, car_id = 0, make = "", body_type = "", color = "", seats = 0, location = "", cost = 0, locked = 1, latitude = 0, longitude = 0):
        self.car_id = car_id
        self.make = make
        self.body_type = body_type
        self.color = color
        self.seats = seats
        self.location = location
        self.cost = cost
        self.locked = locked
        self.latitude = latitude
        self.longitude = longitude
        # Relationships

    def reprJSON(self):
        return dict(car_id=self.car_id, make=self.make, body_type=self.body_type, color=self.color, seats=self.seats, location=self.location, cost=self.cost, locked=self.locked, latitude=self.latitude, longitude=self.longitude)


class User():
    user_id = int
    username = str
    email = str
    password_salt = str
    password_hash = str
    role = str

    def __init__(self, user_id, username = "", email = "", password_hash = "", password_salt = "", role = ""):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.password_salt = password_salt
        self.password_hash = password_hash
        self.role = role

    # alternative way to represent json that also includes password and role
    def reprJSONAlt(self):
        return dict(user_id=self.user_id, username= self.username, email=self.email, password_salt=self.password_salt, password_hash=self.password_hash, role=self.role)

    def reprJSON(self):
        return dict(user_id = self.user_id, username = self.username, email= self.email)

class Report():
    report_id = int
    car_id = int
    user_id = int
    content = str
    report_date = str

    def __init__(self, report_id, car_id, user_id, content, report_date):
        self.report_id = report_id
        self.car_id = car_id
        self.user_id = user_id
        self.content = content
        self.report_date = report_date
        # Relationship
        self.car = None

    def reprJSON(self):
        return dict(report_id=self.report_id, car_id=self.car_id, user_id=self.user_id, content=self.content, report_date=self.report_date, car = self.car)
      


class Booking():
    booking_id = int
    car_id = int
    user_id = int
    status = str
    booking_date = str
    return_date = str
    price = int


    car = Car
    user = User
    

    def __init__(self, booking_id, car_id, user_id, status, booking_date, return_date, price):
        self.booking_id = booking_id
        self.car_id = car_id
        self.user_id = user_id
        self.status = status
        self.booking_date = booking_date
        self.return_date = return_date
        self.price = price
        
        # Relationship
        self.car = Car()
        self.user = None
    def reprJSON(self):
        return dict(booking_id=self.booking_id, car_id=self.car_id, user_id=self.user_id, status=self.status, booking_date=self.booking_date, return_date=self.return_date, car=self.car, user=self.user, price=self.price)
        


# car = Car(1,"make", "body type", "color", 4, "location", 100)
# print(car.reprJSON())
# report = Report(1, 1, 1, "a", "a")
# report.car = car
# print(json.dumps(report.reprJSON(), cls=ComplexEncoder))

# booking = Booking(1,1,1,"Pending","date","return")
# booking.car = report
# print(type(booking.car))
# print(json.dumps(booking.reprJSON(), cls=ComplexEncoder))
