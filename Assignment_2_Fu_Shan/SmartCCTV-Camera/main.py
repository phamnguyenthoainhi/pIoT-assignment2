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
from client import my_client, start_client
import sys
import threading
import signal

app = Flask(__name__)
#app = Flask(__name__, template_folder='/var/www/html/templates')

@app.route('/', methods=['GET', 'POST'])
def move():
    result = ""
    if request.method == 'POST':
        
        return render_template('index.html', res_str=result)
                        
    return render_template('index.html')

def setName(match):        
    globals.name = match 

def setPassword(pw):
    globals.password = pw

def signal_handler(signal, frame):
  sys.exit(0)



def gen(cameraa):
    
    while globals.result:
        while True:
            
            frame = cameraa.get_frame()
            match = globals.name 
            # print("test: " + match)
        # name = cameraa.get_frame.person
        # print(name)
            if match != "Unknown" :
                # globals.run_cam = not globals.run_cam
                
                print("Hello " + match + ", please enter your password to access this vehicle")
                password = input()
                # for i in range(15,0,-1):
                #     sys.stdout.write( ".(Timeout:15 seconds)" + str(i))
                #     sys.stdout.flush()
                #     time.sleep(1)
                setName(match)
            
                setPassword(password)
                

                time.sleep(5)
                

                response = globals.accessResponse
                print("Current Response status:" + response)
                if response == "pass":
                    globals.result = not globals.result
                    globals.run = False
                    print("Access granted: Car Unlocked")
                    print("Press Ctrl + C to use other sevices")
                    break
                    
                else:
                    print("Access Denied, continue scanning...")
                    cameraa.skip_frame()
                   
                # if password == "duma":
                #     globals.result = not globals.result
                #     print(globals.result)
                #     break
                # else:
                #     print("rip, continue scanning....")
                #     cameraa.skip_frame()
                #     # globals.run_cam = not globals.run_cam
            
            setName("Unknown")
            
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


def open_browser():
    # webbrowser.open('http://0.0.0.0:5000/', autoraise=False)
    # subprocess.check_output(['open', 'http://0.0.0.0:5000/', '--hide'])
    
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--disable-notifications')
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path="/usr/bin/chromedriver",options=chrome_options)
    driver.get("http://0.0.0.0:5000/")
    time.sleep(2)

def run_facial_recognition():
    
    while globals.run:
        
        threading.Timer(11, my_client).start()
        Timer(1, open_browser).start()
        app.run(host='0.0.0.0')
        

# globals.init()
# if __name__ == '__main__':
#     while globals.run:
#         threading.Timer(11, my_client).start()
#         print("con2")
#         Timer(1, open_browser).start();
#         app.run(host='0.0.0.0', debug=True, threaded=True)
    

