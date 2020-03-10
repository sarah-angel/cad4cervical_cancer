/**
 * Sends image to ML model for prediction
 * Gets back the prediction as percentage of certainty
 * and class activation map/heatmap
 * 
 * After radiologist has reviewed results then can save
 * report to database
 */
import fs from 'fs'
import { Curl } from 'node-libcurl'
import RadiologyTest from '../models/radiology.model'
import dbErrorHandler from '../helpers/dbErrorHandler'


const assessImage = (req, res) => {
    
    // const curl = new Curl()
    
    // var data = { "input": [10.5]}
    
    // curl.setOpt('URL', 'http://localhost:1337/hello-world/predict')
    // curl.setOpt('CUSTOMREQUEST', 'POST')
    // curl.setOpt(Curl.option.HTTPHEADER, ['Content-Type: application/json'])
    // curl.setOpt('POSTFIELDS', JSON.stringify(data))
    
    
    // curl.on('end', (status, body) => {
    //     console.log(body)
    
    //     curl.close()
    // })
    
    // curl.on('error', curl.close.bind(curl))
    
    // curl.perform()
        
    res.json({
        prediction: 60,
        heatmap: base64_encode( __dirname + '/random_mri_heatmap.jpg')     
    })
}

function base64_encode(image) {
    var bitmap = fs.readFileSync(image, 'base64')
    return "data:image/jpg;base64," + bitmap
}

//Saves radiology assessment results in the database
const saveReport = (req, res) => {
    const radiologyTest = new RadiologyTest(req.body)
    radiologyTest.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successfully saved the report"
        })
    })
}

//Fetches all records in the Radiology tests database that match the patient ID
const reportByPatientId = (req, res, next, id) => {
    RadiologyTest.find({patient_ID: id }).exec((err, records) => {
        if(err || !records)
            return res.status(400).json({
                error: "No records found."
            })
        req.history = records
        next()
    })
}

//Takes a patient ID and returns all radiology reports linked to it
//sorts from latest to oldest
const getHistory = (req, res) => {
    return res.json(req.history)
}

export default { assessImage, saveReport, getHistory, reportByPatientId }