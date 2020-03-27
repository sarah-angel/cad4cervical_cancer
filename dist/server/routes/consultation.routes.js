'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _consultation = require('../controllers/consultation.controller');

var _consultation2 = _interopRequireDefault(_consultation);

var _lab = require('../controllers/lab.controller');

var _lab2 = _interopRequireDefault(_lab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/api/consultation/save').post(_consultation2.default.saveConsultation);

router.route('/api/consultation/pending').post(_consultation2.default.getPendingConsultation);

router.route('/api/consultation/predict').post(_consultation2.default.getPrediction);

router.route('/api/consultation/history/:patientID').get(_consultation2.default.getHistory);

//Save lab test
router.route('/api/lab/save').post(_lab2.default.saveTest);

//Get lab test
router.route('/api/lab/getLabTest/:consultationID').get(_lab2.default.readTest);

router.param('consultationID', _lab2.default.readByConsultationID);
router.param('patientID', _consultation2.default.findByPatientID);

exports.default = router;