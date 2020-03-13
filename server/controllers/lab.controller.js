import LabTest from '../models/lab.model'
import Consultation from '../models/consultation.models'
import dbErrorHandler from '../helpers/dbErrorHandler'


const saveTest = async (req, res) => {
   
    //Set consultation_ID to the latest consultation in the database
    //for this patient_ID
    var consultation = await Consultation.find({ 'patient_ID': req.body.patient_ID})
    .sort({created : -1}).limit(1)
    .exec()

    req.body.consultation_ID = consultation[0]._id
    
    var labTest = new LabTest(req.body)

    labTest.save((err, result) => {
        if (err) 
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        res.status(200).json({
            message: "Successfully saved lab test results."
        })
    })
}

const readByConsultationID = (req, res, next, id) => {
    LabTest.findOne({'consultation_ID': id})
        .exec( (err, result) => {
            if (err)
                return res.status(400).json({
                    error: dbErrorHandler.getErrorMessage(err)
                })
            req.labTest = result
            next()
        })
}

//Returns lab test or empty json
const readTest = (req, res) => {
    return res.json(req.labTest)
}

export default { saveTest, readByConsultationID, readTest }