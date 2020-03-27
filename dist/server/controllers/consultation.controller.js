'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _consultation = require('../models/consultation.models');

var _consultation2 = _interopRequireDefault(_consultation);

var _dbErrorHandler = require('../helpers/dbErrorHandler');

var _dbErrorHandler2 = _interopRequireDefault(_dbErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Saves consultation
//saves the first time when lab tests and prediction are not yet done
//after a lab tests and prediction it updates the consultation
var saveConsultation = function saveConsultation(req, res) {
    var consultation = new _consultation2.default(req.body);

    //consultation_ID is given
    if (req.body.consultation_ID) _consultation2.default.findByIdAndUpdate({ _id: req.body.consultation_ID }, req.body).exec(function (err, consultation) {
        if (err || !consultation) return res.status(400).json({
            error: _dbErrorHandler2.default.getErrorMessage(err)
        });

        res.status(200).json({
            message: "Successfully updated consultation."
        });
    });else consultation.save(function (err, result) {
        if (err) return res.status(400).json({
            error: _dbErrorHandler2.default.getErrorMessage(err)
        });
        res.status(200).json({
            message: "Successfully saved the report."
        });
    });
};

//Fetches the latest record if there is no prediction value
var getPendingConsultation = function getPendingConsultation(req, res) {
    _consultation2.default.findOne({ 'patient_ID': req.body.patient_ID }).sort({ created: -1 }).limit(1).exec(function (err, consultation) {
        if (err || !consultation) return res.status(400).json({
            error: (0, _dbErrorHandler2.default)(err)
        });

        if (consultation.prediction == null) res.status(200).json(consultation);else res.status(200).json({});
    });
};

//Fetch all consultations for patient
var findByPatientID = function findByPatientID(req, res, next, id) {
    _consultation2.default.find({ patient_ID: id }).exec(function (err, results) {
        if (err || !results) return res.status(400).json({
            error: _dbErrorHandler2.default.getErrorMessage(err)
        });
        req.history = results;
        next();
    });
};

var getHistory = function getHistory(req, res) {
    return res.json(req.history);
};

var getPrediction = function getPrediction(req, res) {
    return res.json({
        prediction: 73
    });
};

exports.default = { saveConsultation: saveConsultation, getPendingConsultation: getPendingConsultation, findByPatientID: findByPatientID, getHistory: getHistory, getPrediction: getPrediction };