import express from 'express'
import consultationCtrl from '../controllers/consultation.controller'
import labCtrl from '../controllers/lab.controller'

const router = express.Router()

router.route('/api/consultation/save')
    .post(consultationCtrl.saveConsultation)

router.route('/api/consultation/pending')
    .post(consultationCtrl.getPendingConsultation)

router.route('/api/consultation/predict')
    .post(consultationCtrl.getPrediction)
   
router.route('/api/consultation/history/:patientID')
    .get(consultationCtrl.getHistory)

//Save lab test
router.route('/api/lab/save')
    .post(labCtrl.saveTest)

//Check if consultation done befor lab
router.route('/api/lab/checkConsultation')
    .post(labCtrl.checkConsultationExists)

//Get lab test
router.route('/api/lab/getLabTest/:consultationID')
    .get(labCtrl.readTest)

router.param('consultationID', labCtrl.readByConsultationID)
router.param('patientID', consultationCtrl.findByPatientID)

export default router