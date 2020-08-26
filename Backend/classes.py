class Car(dict):
    car_id = int
    make = str
    body_type = str
    color = str
    seats = int
    location = str
    cost = float
    locked = bool

    def __init__(self, car_id, make, body_type, color, seats, location, cost, locked):
        dict.__init__(self, car_id=car_id, make=make, body_type=body_type, color=color, seats=seats, location=location, cost=cost, locked=locked)
        self.car_id = car_id
        self.make = make
        self.body_type = body_type
        self.color = color
        self.seats = seats
        self.location = location
        self.cost = cost
        self.locked = locked
        # Relationships
        self.report = None
        self.booking = None

class User(dict):
    user_id = int
    email = str
    password_salt = str
    password_hash = str
    role = str

    def __init__(self, user_id, email, password_hash, password_salt, role):
        dict.__init__(self, user_id=user_id, email=email, password_salt=password_salt, password_hash=password_hash, role=role)
        self.user_id = user_id
        self.email = email
        self.password_salt = password_salt
        self.password_hash = password_hash
        self.role = role
        # Relationships
        self.booking = None
        self.report = None


class Report(dict):
    report_id = int
    car_id = int
    user_id = int
    content = str
    report_date = str

    def __init__(self, report_id, car_id, content, report_date):
        dict.__init__(self, report_id=report_id, car_id=car_id, content=content, report_date=report_date)
        self.report_id = report_id
        self.car_id = car_id
        self.content = content
        self.report_date = report_date
      


class Booking(dict):
    booking_id = int
    car_id = int
    user_id = int
    status = str
    booking_date = str
    return_date = str

    def __init__(self, booking_id, car_id, user_id, status, booking_date, return_date):
        dict.__init__(self, booking_id=booking_id, car_id=car_id, user_id=user_id, status=status, booking_date=booking_date, return_date=return_date)
        self.booking_id = booking_id
        self.car_id = car_id
        self.user_id = user_id
        self.status = status
        self.booking_date = booking_date
        self.return_date = return_date