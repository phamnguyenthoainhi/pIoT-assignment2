# import smtplib, ssl
# port = 587  # For starttls
# smtp_server = "smtp.gmail.com"
# sender_email = "carsharepIoT@gmail.com"
# receiver_email = "phamnguyenthoainhi@gmail.com"
# password = "a123456789!"
# message = """\
# Subject: Hi there

# This message is sent from Python."""
# context = ssl.create_default_context()

# # with smtplib.SMTP(smtp_server, port) as server:
# #     server.ehlo()  # Can be omitted
# #     server.starttls(context=context)
# #     server.ehlo()  # Can be omitted
# #     server.login(sender_email, password)
# #     server.sendmail(sender_email, receiver_email, message)

# # Try to log in to server and send email
# try:
#     server = smtplib.SMTP(smtp_server,port)
#     server.ehlo() # Can be omitted
#     server.starttls(context=context) # Secure the connection
#     server.ehlo() # Can be omitted
#     server.login(sender_email, password)
#     # TODO: Send email here
# except Exception as e:
#     # Print any error messages to stdout
#     print(e)
# finally:
#     server.quit() 

from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'carsharepIoT@gmail.com'
app.config['MAIL_PASSWORD'] = 'a123456789!'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

users = ['phamnguyenthoainhi@gmail.com', 's3695349@rmit.edu.vn']
with app.app_context():
    with mail.connect() as conn:
        for user in users:
            message = 'A new car report has been added. Please check your dashboard for more information!'
            subject = "Hello Engineer, %s" % user
            msg = Message(recipients=[user],
                        body=message,
                        subject=subject, sender = 'carsharepIoT@gmail.com')

            conn.send(msg)
