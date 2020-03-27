'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _patient = require('../models/patient.model');

var _patient2 = _interopRequireDefault(_patient);

var _dbErrorHandler = require('../helpers/dbErrorHandler');

var _dbErrorHandler2 = _interopRequireDefault(_dbErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Registers new patient
var create = function create(req, res, next) {
    var patient = new _patient2.default(req.body);
    patient.save(function (err, result) {
        if (err) {
            return res.status(400).json({
                error: _dbErrorHandler2.default.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: "Successfully  registered patient!"
        });
    });
};

//Retrieves patient details using value of :patientId param
//if patient is found, user obj added to req.profile
var patientById = function patientById(req, res, next, id) {
    _patient2.default.findById(id).exec(function (err, patient) {
        if (err || !patient) return res.status(400).json({
            error: "Patient not found"
        });
        req.profile = patient;
        next();
    });
};

//Gets patient details from req.profile and sends as res
var read = function read(req, res) {
    return res.json(req.profile);
};

exports.default = { create: create, patientById: patientById, read: read };