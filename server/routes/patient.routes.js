import express from 'express'
import patientCtrl from '../controllers/patient.controller'

const router = express.Router()

//Create new patient with POST
router.route('/api/patients')
    .post(patientCtrl.create)

//Fetch a patient with GET
router.route('/api/patients/:patientId')
    .get(patientCtrl.read)

router.param('patientId', patientCtrl.patientById)

export default router