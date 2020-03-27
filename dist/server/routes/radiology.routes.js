'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _radiology = require('../controllers/radiology.controller');

var _radiology2 = _interopRequireDefault(_radiology);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Get prediction and heatmap for radiology image
//from ML models 
router.route('/api/patient/assessImage').post(_radiology2.default.assessImage);

//Save radiology report to database
router.route('/api/patient/saveReport').post(_radiology2.default.saveReport);

//Gets history of patient
router.route('/api/patient/history/:patientID').get(_radiology2.default.getHistory);

router.param('patientID', _radiology2.default.reportByPatientId);

exports.default = router;