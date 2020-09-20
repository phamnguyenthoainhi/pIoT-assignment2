import face_recognition
import globals
import cv2
import numpy as np
import os
face_cascade=cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")
ds_factor=0.6

#Store objects in array

user_name=[] #Name of person string
user_image=[] #Image object
user_face_encodings=[] #Encoding object

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []

process_current_frame = True

def setName(match):   
    """
    Set name value to global variable
    """        
    globals.name = match 

#Loop to load the image profile
for file in os.listdir("/home/pi/Desktop/Assignment_2/FaceRecognitionEngine/profiles"):
    try:
        #Parse the username from the image name
        user_name.append(file.replace(".jpg", ""))
        file=os.path.join("/home/pi/Desktop/Assignment_2/FaceRecognitionEngine/profiles/", file)
        user_image = face_recognition.load_image_file(file)
        
        user_face_encodings.append(face_recognition.face_encodings(user_image)[0])
      

    except Exception as e:
        pass
    
    
class VideoCamera(object):
    def __init__(self):
        """
        initiate video capture 
        """    
        self.video = cv2.VideoCapture(0)
    
    def __del__(self):
        """
        delete current frame
        """ 
        self.video.release()

    def skip_frame(self):
        """
        skip frame to compensate for slow OS
        """ 
        for i in range(5):
            self.get_frame()
      
    def get_frame(self):
        """
        get the current frame and scan for matches
        """ 
        #save current image file from video feed
        success, image = self.video.read()
        
        process_current_frame = True
        
        # Resize video frame for faster facial processing
        small_frame = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)

        # Convert facial image color from OpenCV's BGR to facial_recognition's RGB
        rgb_small_frame = small_frame[:, :, ::-1]
        
       # process a selection of frame for faster processing
        if process_current_frame:
            # detect face in the current frame
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            
            global name_gui;
            
            for face_encoding in face_encodings:
                # Check if face in current frame is match
                matches = face_recognition.compare_faces(user_face_encodings, face_encoding)
                
                # print(matches)

                face_distances = face_recognition.face_distance(user_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                #If name matches, set name to globals for client to send data
                if matches[best_match_index]:
                    name = user_name[best_match_index]
                    setName(name)
                    face_names.append(name)
                    name_gui = name    
        process_current_frame = not process_current_frame
        
            
        # Display results of the used frame for debugging website
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # reframe current image scale for clarity
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw square on detected face
            cv2.rectangle(image, (left, top), (right, bottom), (255, 255, 255), 2)

            # display name under the drawn square
            cv2.rectangle(image, (left, bottom - 35), (right, bottom), (255, 255, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(image, name_gui, (left + 10, bottom - 10), font, 1.0, (0, 0, 0), 1)

        
        ret, jpeg = cv2.imencode('.jpg', image)
        
        return jpeg.tobytes()
