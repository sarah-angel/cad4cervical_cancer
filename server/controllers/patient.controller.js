import Patient from '../models/patient.model'
import errorHandler from '../helpers/dbErrorHandler'

//Registers new patient
const create = (req, res, next) => {
    const patient = new Patient(req.body)
    patient.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successfully  registered patient!"
        })
    })
}

//Retrieves patient details using value of :patientId param
//if patient is found, user obj added to req.profile
const patientById = (req, res, next, id) => {
    Patient.findById(id).exec( (err, patient) => {
        if (err || !patient)
            return res.status(400).json({
                error: "Patient not found"
            })
        req.profile = patient
        next()
    })
}

//Gets patient details from req.profile and sends as res
const read = (req, res) => {
    return res.json(req.profile)
}


export default { create, patientById, read }