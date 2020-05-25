from flask import Flask
from flask import request, jsonify
import pandas as pd 
import numpy as np
import pickle

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
def hello():
    return "hello world"

@app.route('/model', methods=['POST'])
def model():

    #transform symptoms array to dict/json
    req = request.json
    symptoms = dict.fromkeys(req["symptoms"], True)

    data = request.json.copy()
    data.update(symptoms)
    data.update(req['fbp'])
    data.update(req['urinalysis'])
    
    del data['symptoms']
    del data['fbp']
    del data['urinalysis']

    df = pd.DataFrame.from_dict(data, orient="index")
    
    #Changing true/false to yes/no
    df.loc['smokes'].replace([True, False], ['yes', 'no'], inplace=True)
    df.loc['alcohol'].replace([True, False], ['yes', 'no'], inplace=True)
    df.loc['family_history'].replace([True, False], ['yes', 'no'], inplace=True)
    
    #Impute missing columns with NaN
    features = ['hb','neutrophil','prolonged vaginal bleeding','abdominal pain','abnormal bleeding','lower abdominal pain',
        'post menopausal bleeding','prolonged vaginal watery discharge','waist pain','foul smelling discharge','post coital bleeding']
    df = df.reindex(features, fill_value=np.NaN)
    df = df.transpose()

    baso_mean = 3.792950784593478
    eos_mean = 9.989089807555185
    hb_mean = 19.298032670454962
    lymphocyte_mean = 21.586946996466786
    mch_mean = 23.997804532577543
    mcv_mean = 75.3983038869256
    neutrophil_mean = 65.5616284074612
    plt_mean = 347.2233215046129
    rbc_mean = 4.204703257790314
    wbc_mean = 8.390056697377588

    temperature_mean = 36.23
    age_mean = 52.68
    gender_mean = "Female"
    children_mean = 4.75
    smokes_mean = 'unknown' #no/yes/unknown ?
    alcohol_mean = 'unknown'
    family_history_mean = 'unknown'
    symptom_duration_mean = 'unknown'
    hiv_mean = False
    chest_x_ray_mean = False
    ultrasound_mean = False
    #weight_mean =
    #height_mean = 
    region_mean = 'Dar Es Salaam'

    #bilirubin_mean =
    #creatinine_mean =
    #epithelial_mean =
    #ph_mean =
    #protein_mean =
    #urea_mean =
    #uric_acid_mean =
    
    all_symptoms = [
        "prolonged vaginal bleeding",    
        "back pain",                         
        "weight loss",                       
        "nausea",                            
        "pain during sexual intercourse",    
        "abdominal pain",                    
        "vaginal discharge",                 
        "vomiting",                          
        "abnormal bleeding",                 
        "lower abdominal pain",              
        "post menopausal bleeding",          
        "prolonged vaginal watery discharge",
        "difficulty passing stool",          
        "fever",                             
        "cough",                             
        "difficulty micturation",            
        "chest pain",                        
        "lower back pain",                   
        "frequent micturation",              
        "waist pain",                        
        "pelvic pain",                       
        "lower limbs swelling",              
        "fatigue",                           
        "swelling",                          
        "yellowish vaginal discharge",       
        "foul smelling discharge",           
        "post coital bleeding",              
        "rectal bleeding",                   
        "constipation",                      
        "difficulty in breathing",           
        "occasional painful defecation",     
        "blood in urine",                    
        "headache",                          
        "palpitations",                      
        "vulva itching",            
        "vaginal pain",                
        "spot bleeding",                 
        "metromenorrhagia"
    ]

    #Imputing missing values
    for feature in features:
        if feature in all_symptoms:
            df[feature].fillna(False, inplace=True)
        else:
            df[feature].fillna(eval(feature + '_mean'), inplace=True)
    
    #print(df.isna().sum())
        
    #Feature encoding
    df.replace([True, False], [1, 0], inplace=True)
    query = pd.get_dummies(df)
    #print(query)

    model = pickle.load(open('randomforestmodel.pkl', 'rb'))
    [false_proba, true_proba] = model.predict_proba(query)[0]
    #print(model.predict_proba(query))

    threshold = 0.5

    if true_proba > threshold:
        response = {
            "diagnosis": True,
            "confidence": true_proba * 100
        }
    else:
        response = {
            "diagnosis": False,
            "confidence": false_proba * 100
        }

    return jsonify(response)

if __name__ == '__main__':
    app.run()