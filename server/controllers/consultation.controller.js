import fs from 'fs'
import { Curl } from 'node-libcurl'

import Consultation from '../models/consultation.models'
import dbErrorHandler from '../helpers/dbErrorHandler'

//Saves consultation
//saves the first time when lab tests and prediction are not yet done
//after a lab tests and prediction it updates the consultation
const saveConsultation = (req, res) => {
    const consultation = new Consultation(req.body)
    //consultation_ID is given
    if ( req.body.consultation_ID )
        Consultation.findByIdAndUpdate({_id: req.body.consultation_ID}, req.body)
            .exec( (err, consultation) => {
                if (err || !consultation)
                    return res.status(400).json({
                        error: dbErrorHandler.getErrorMessage(err)
                    })
                
                res.status(200).json({
                    message: "Successfully updated consultation."
                })
            })
    else
        consultation.save((err, result) => {
            if(err)
                return res.status(400).json({
                    error: dbErrorHandler.getErrorMessage(err)
                })
            res.status(200).json({
                message: "Successfully saved the report."
            })
        })    
}

//Fetches the latest record if there is no prediction value
const getPendingConsultation = (req, res) => {
    Consultation.findOne({ 'patient_ID': req.body.patient_ID})
    .sort({created : -1}).limit(1)
    .exec( (err, consultation) => {
        if (err || !consultation)
            return res.status(400).json({
                error: dbErrorHandler(err)
            })

        if ( consultation.prediction == null )
            res.status(200).json(consultation)
        else    
            res.status(200).json({})
    })
}

//Fetch all consultations for patient
const findByPatientID = (req, res, next, id) => {
    Consultation.find({patient_ID: id})
        .exec( (err, results) => {
            if (err || !results)
                return res.status(400).json({
                    error: dbErrorHandler.getErrorMessage(err)
                })
            req.history = results
            next()
        })
}

const getHistory = (req, res) => {
    return res.json(req.history)
}

const getPrediction = (req, res) => {
    const curl = new Curl()
    console.log(req.body)
    var data = { "input": "" + req.body }
    
    curl.setOpt('URL', 'http://localhost:1337/consultation/predict')
    curl.setOpt('CUSTOMREQUEST', 'POST')
    curl.setOpt(Curl.option.HTTPHEADER, ['Content-Type: application/json'])
    curl.setOpt('POSTFIELDS', JSON.stringify(data))
    
    
    curl.on('end', (status, body) => {
        console.log(body)
    
        curl.close()
    })
    
    curl.on('error', curl.close.bind(curl))
    
    curl.perform()

    return res.json({
        prediction: 73
    })
}

export default { saveConsultation, getPendingConsultation, findByPatientID, getHistory, getPrediction }