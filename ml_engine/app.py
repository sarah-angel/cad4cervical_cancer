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
    arr = req["arr"]
    sym = dict.fromkeys(arr, True)

    data = request.json.copy()
    data.update(sym)
    df = pd.DataFrame.from_dict(data, orient="index")
    #model = pickle.load(open('model.pkl', 'rb'))
    #model.predict(df.transpose())
    
    #Impute missing columns with NaN
    columns = ["name", "category", "userId", "bla bla", "nausea", "whatis"]
    df = df.reindex(columns, fill_value=np.NaN)
    
    query = df.transpose()
    print(query)
    
    print(df)
    return "got it"

if __name__ == '__main__':
    app.run()