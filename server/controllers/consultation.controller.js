import Consultation from '../models/consultation.models'
import dbErrorHandler from '../helpers/dbErrorHandler'

//Saves consultation
//saves the first time when lab tests and prediction are not yet done
//after a lab tests and prediction it updates the consultation
const saveConsultation = (req, res) => {
    const consultation = new Consultation(req.body)

    if ( !req.body.prediction )
        consultation.save((err, result) => {
            if(err)
                return res.status(400).json({
                    error: dbErrorHandler.getErrorMessage(err)
                })
            res.status(200).json({
                message: "Successfully saved the report."
            })
        })
    
    if ( req.body.prediction )
        Consultation.findByIdAndUpdate({_id: req.body.consultation_ID}, req.body)
            .exec( (err, consultation) => {
                if (err || !consultation)
                    return res.status(400).json({
                        error: dbErrorHandler.getErrorMessage(err)
                    })
                
                console.log(consultation)
                res.status(200).json({
                    message: "Successfully updated consultation."
                })
            })
        
}

//Fetches the latest record without a prediction value
const getPendingConsultation = (req, res) => {
    Consultation.findOne({ 'patient_ID': req.body.patient_ID, 'prediction': null})
    .sort({created : -1}).limit(1)
    .exec( (err, consultation) => {
        if (err || !consultation)
            return res.status(400).json({
                error: dbErrorHandler(err)
            })
        res.status(200).json(consultation)
    })
}

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

export default { saveConsultation, getPendingConsultation, findByPatientID, getHistory }