'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _patient = require('../controllers/patient.controller');

var _patient2 = _interopRequireDefault(_patient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Create new patient with POST
router.route('/api/patients').post(_patient2.default.create);

//Fetch a patient with GET
router.route('/api/patients/:patientId').get(_patient2.default.read);

router.param('patientId', _patient2.default.patientById);

exports.default = router;