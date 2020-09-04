# cad4cervical_cancer
## Computer Aided Detection/Diagnosis for Cervical Cancer

## Installation
1. In the project root directory run `npm install` to install server dependencies
2. Change to the client directory with `cd client` and run `npm install` to install client dependencies
3. For ml server dependencies install;
    - python 3.6
    - flask
    - pandas
    - numpy
    - opencv-python
    - pickle
    - tensorflow 2.1
    
## Usage
Open a separate terminal for each of the following and run simultaneously

### App Server
In project root folder run `npm start`
The server connects to a cloud database, if a local database is to be used, change the db connection in config file

### ML Server
Change to ml directory `cd ml_engine` then run `python app.py` to start the server

### Client
Change to client directory `cd client` then run `npm start` 
This will open a browser tab with a login screen
Note: patient IDs can be retrieved from the database
      if using existing private cloud database use existing patients;
        PatientID 1: 5e5ffc4d64acde42e7517f4f
        PatientID 2: 5f22827f0697006bbd4819c7


For admin;
  1. Login with credentials
    username: admin
    password: password
  2. Register new staff or patient 

For consultation;
  1. Login with credentials 
    username: kangel 
    password: password
  2. Search for a patient with ID: 5e5ffc4d64acde42e7517f4f
  3. Fill in consultation form (if patient has pending consulation it will open it)
  4. Save then go to lab
  5. After getting lab results search for patient again and get diagnosis (button)
  6. Diagnosis can be seen in diagnosis tab.
  7. Save
  
For lab;
  1. Login with credentials
    username: kalice
    password: password
  2. Search for patient with ID: 5e5ffc4d64acde42e7517f4f (same as for consultation)
  3. Fill in lab results and save
  
For pap-smear test;
  1. Login with credentials
    username: ksarah
    password: password
  2. Search for a patient with ID: 5e5ffc4d64acde42e7517f4f
  3. Upload pap-smear image, diagnosis is automatically retrieved
  4. Save
  

