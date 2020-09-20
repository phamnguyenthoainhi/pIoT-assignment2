import globals
from flask import Flask, render_template, Response, request
from camera import VideoCamera
import time
import os
import webbrowser
from threading import Timer
import subprocess
import camera
from selenium import webdriver
from client import my_client
import sys
import threading
from sense_hat import SenseHat


app = Flask(__name__)
sense = SenseHat() 

@app.route('/', methods=['GET', 'POST'])
def debug():
    """
    Open Website for view the footage for debugging
    """
    result = ""
    if request.method == 'POST':
        return render_template('index.html', res_str=result)          
    return render_template('index.html')

def setName(match):  
    """
    Set name value to global variable
    """      
    globals.name = match 

def setPassword(pw):
    """
    Set password value to global variable
    """  
    globals.password = pw


def gen(cameraa):
    """
    Generate camera footage and scan for match
    """  
    
    while globals.result:
        while True:
            #Get image frame continously
            frame = cameraa.get_frame()

            #Get the matched username from global 
            match = globals.name 
            
            if match != "Unknown" :
                #if there is match ask for user password
                
                print("Hello " + match + ", please enter your password to access this vehicle")
                password = input()
                setName(match)
                setPassword(password)
                
                time.sleep(5)
                #AT THIS STAGE, THE CLIENT.PY HAS RETRIEVED USERNAME AND PASSWORD, AND SENT TO THE SERVER FOR VERIFICATION

                #Get the response from global
                response = globals.accessResponse
                print("Current Response status:" + response)

                #Unlock car when the response from server is "pass"
                if response == "pass":
                    globals.result = not globals.result
                    globals.run = False
                    print("Access granted: Car Unlocked")
                    sense.show_message("Car Unlocked")
                    print("Press Ctrl + C to use other sevices")
                    break
                #Continue scanning if fail
                else:
                    print("Access Denied, continue scanning...")
                    cameraa.skip_frame()
                   
            setName("Unknown")
            
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    """
    Route video feed to debugging website
    """  
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


def open_browser():
    """
    Hide the debugging website on start
    """  
      
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--disable-notifications')
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path="/usr/bin/chromedriver",options=chrome_options)
    driver.get("http://0.0.0.0:5000/")
    time.sleep(2)

def run_facial_recognition():
    """
    Start the program
    """  
    
    while globals.run:
        #Utilizing multiple threads to start various tasks
        threading.Timer(11, my_client).start()
        Timer(1, open_browser).start()
        app.run(host='0.0.0.0')
        


    

