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
                
                print("This is :" + match)
                password = input("Hello " + match + ", please enter your password to access this vehicle.")
                if password == "duma":
                    globals.result = not globals.result
                    print(globals.result)
                    break
                else:
                    print("rip, continue scanning....")
                    cameraa.skip_frame()
                    # globals.run_cam = not globals.run_cam
            
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

if __name__ == '__main__':
    globals.init()
    Timer(1, open_browser).start();
    app.run(host='0.0.0.0', debug=True, threaded=True)
    

