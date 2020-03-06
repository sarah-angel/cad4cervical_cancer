import express from 'express'
import radiologyCtrl from '../controllers/radiology.controller'

const router = express.Router()

//Get prediction and heatmap for radiology image
//from ML models 
router.route('/api/patient/assessImage')
    .post(radiologyCtrl.assessImage)

export default router