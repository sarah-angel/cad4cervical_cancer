'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lab = require('../models/lab.model');

var _lab2 = _interopRequireDefault(_lab);

var _consultation = require('../models/consultation.models');

var _consultation2 = _interopRequireDefault(_consultation);

var _dbErrorHandler = require('../helpers/dbErrorHandler');

var _dbErrorHandler2 = _interopRequireDefault(_dbErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveTest = async function saveTest(req, res) {

    //Set consultation_ID to the latest consultation in the database
    //for this patient_ID
    var consultation = await _consultation2.default.find({ 'patient_ID': req.body.patient_ID }).sort({ created: -1 }).limit(1).exec();

    req.body.consultation_ID = consultation[0]._id;

    var labTest = new _lab2.default(req.body);

    labTest.save(function (err, result) {
        if (err) return res.status(400).json({
            error: _dbErrorHandler2.default.getErrorMessage(err)
        });
        res.status(200).json({
            message: "Successfully saved lab test results."
        });
    });
};

var readByConsultationID = function readByConsultationID(req, res, next, id) {
    _lab2.default.findOne({ 'consultation_ID': id }).exec(function (err, result) {
        if (err) return res.status(400).json({
            error: _dbErrorHandler2.default.getErrorMessage(err)
        });
        req.labTest = result;
        next();
    });
};

//Returns lab test or empty json
var readTest = function readTest(req, res) {
    return res.json(req.labTest);
};

exports.default = { saveTest: saveTest, readByConsultationID: readByConsultationID, readTest: readTest };