COSC2790 - Programming Internet of Things - Group 2<br/>
Authors:<br/>
Pham Nguyen Thoai Nhi - s3695349<br/>
Le Pham Ngoc Hoai - s3636085<br/>
Tseng Chia Fu - s3634996 <br/>
Lee Ping Shan - s3635413<br/>
# Car-share System
---
## Project Structure
### Web Application
#### Frontend: Built using ReactJS/Redux framework
**Frontend Link**:  https://car-share-289705.df.r.appspot.com/
**Backend Link:**  https://iot-assignment2-286206.df.r.appspot.com/
#### Available Script
npm install: install all dependencies/packages <br/>
npm start: start the frontend <br/>
npm test: run all the unit tests <br/>
#### Available Accounts to login
**Customer:** <br/>
    username: fu <br/>
    password: 123456<br/>
**Admin:**<br/>
    username: Admin<br/>
    password: 123456<br/>
**Manager:**<br/>
    username: Manager <br/>
    password: 123456<br/>
**Engineer:**<br/>
    username: Engineer<br/>
    password: 123456<br/>

#### Backend: Built using Flask framework


### IOT(Agent Pi):
#### Available Script:
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential
sudo apt-get install cmake
sudo apt-get install gfortran
sudo apt-get install git
sudo apt-get install wget
sudo apt-get install curl
sudo apt-get install graphicsmagick
sudo apt-get install libgraphicsmagick1-dev
sudo apt-get install libatlas-base-dev
sudo apt-get install libavcodec-dev
sudo apt-get install libavformat-dev
sudo apt-get install libboost-all-dev
sudo apt-get install libgtk2.0-dev
sudo apt-get install libjpeg-dev
sudo apt-get install liblapack-dev
sudo apt-get install libswscale-dev
sudo apt-get install pkg-config
sudo apt-get install python3-dev
sudo apt-get install python3-numpy
sudo apt-get install python3-pip
sudo apt-get install zip
sudo apt-get clean

sudo apt-get install python3-picamera
sudo pip3 install --upgrade picamera[array]


pip3 install dlib

pip3 install numpy
pip3 install scikit-image
sudo apt-get install python3-scipy
sudo apt-get install libatlas-base-dev
sudo apt-get install libjasper-dev
sudo apt-get install libqtgui4
sudo apt-get install python3-pyqt5
sudo apt install libqt4-test
pip3 install opencv-python==3.4.6.27
pip3 install face_recognition 

#### QR Code Scanner:
To use the QR code scanner, press 2 in the console menu to start the application, and aim your given QR code with engineer ID to the camera to unlock the car. Any other QR codes without engineer profile ID that is recognised by the Agent Pi, will not unlock the car.

Sample Engineer QR Codes:
<img width="1440" alt="Sample 1" src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-0/p280x280/119676902_379573039870239_7551320180432845006_n.jpg?_nc_cat=109&_nc_sid=b96e70&_nc_ohc=d1TKSddKoHkAX_d0te6&_nc_ht=scontent.fsgn2-4.fna&tp=6&oh=9bb4edb1d625c87f1a701c1faf48ebb1&oe=5F893759">

<img width="1440" alt="Sample 2" src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-0/p280x280/119709349_634942190553455_8335974865124209296_n.jpg?_nc_cat=110&_nc_sid=b96e70&_nc_ohc=pyJ_33kACwUAX-wM8U7&_nc_ht=scontent.fsgn2-6.fna&tp=6&oh=3ea80812dd0ebbb0aee3068b18a131b0&oe=5F8BF0ED">

<img width="1440" alt="Sample 3" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.15752-0/p280x280/119422850_691322738132576_7643445337821270048_n.jpg?_nc_cat=111&_nc_sid=b96e70&_nc_ohc=tp7rKzAgjsoAX9hznFn&_nc_ht=scontent.fsgn2-2.fna&tp=6&oh=09937b594a68741344f7b57a4a30febf&oe=5F8BA3EB">

<img width="1440" alt="Sample 4" src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/119469970_355281458944509_7060815091840533936_n.jpg?_nc_cat=100&_nc_sid=b96e70&_nc_ohc=11V-dmeCy4EAX8JD6Sg&_nc_ht=scontent.fsgn2-6.fna&oh=6a093ee9631dd1553e84ddf3a320c997&oe=5F8A81D7">

#### Bluetooth Scanner: 
To use Bluetooth Scanner, press 1 to initiate the scanning sequence, when the engineer registered mobile device is detected in the vicinity, the car will be unlocked.

The registered mobile MAC address is stored locally in the Agent Pi.

#### Facial Recognition Unlocker:

To use facial recognition unlocker, press 4 to start the face scanning program, after the program has initiated, face towards the camera device provided and proceed the scaning.

The face recognition system works only on faces that have been registered via Car Share's website, and the registered users must have also booked the corresponding car they want to unlock.
---
## Project Management
### Github repository

<img width="907" alt="Screen Shot 2020-09-18 at 09 35 27" src="https://user-images.githubusercontent.com/40556441/93583920-c3190f00-f9ce-11ea-9188-cd87785222c6.png">


<img width="1436" alt="Screen Shot 2020-09-18 at 16 31 09" src="https://user-images.githubusercontent.com/40556441/93582255-67e61d00-f9cc-11ea-9573-913e3d1c54e9.png">


### Project

<img width="1440" alt="Screen Shot 2020-09-18 at 16 35 04" src="https://user-images.githubusercontent.com/40556441/93582856-3e79c100-f9cd-11ea-86a1-e22062bc0f56.png">

