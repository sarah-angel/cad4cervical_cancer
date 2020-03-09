import express from 'express'
import radiologyCtrl from '../controllers/radiology.controller'

const router = express.Router()

//Get prediction and heatmap for radiology image
//from ML models 
router.route('/api/patient/assessImage')
    .post(radiologyCtrl.assessImage)

//Save radiology report to database
router.route('/api/patient/saveReport')
    .post(radiologyCtrl.saveReport)

//Gets history of patient
router.route('/api/patient/history/:patientID')
    .get(radiologyCtrl.getHistory)

router.param('patientID', radiologyCtrl.reportByPatientId)

export default router