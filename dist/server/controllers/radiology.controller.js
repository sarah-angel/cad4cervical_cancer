'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeLibcurl = require('node-libcurl');

var _radiology = require('../models/radiology.model');

var _radiology2 = _interopRequireDefault(_radiology);

var _dbErrorHandler = require('../helpers/dbErrorHandler');

var _dbErrorHandler2 = _interopRequireDefault(_dbErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sends image to ML model for prediction
 * Gets back the prediction as percentage of certainty
 * and class activation map/heatmap
 * 
 * After radiologist has reviewed results then can save
 * report to database
 */
var assessImage = function assessImage(req, res) {

    var curl = new _nodeLibcurl.Curl();

    var data = { "input": req.body.image };

    curl.setOpt('URL', 'http://localhost:1337/test1/predict');
    curl.setOpt('CUSTOMREQUEST', 'POST');
    curl.setOpt(_nodeLibcurl.Curl.option.HTTPHEADER, ['Content-Type: application/json']);
    curl.setOpt('POSTFIELDS', JSON.stringify(data));

    curl.on('end', function (status, body) {
        console.log(body);

        curl.close();
    });

    curl.on('error', curl.close.bind(curl));

    curl.perform();

    res.json({
        prediction: 60,
        heatmap: base64_encode(__dirname + '/random_mri_heatmap.jpg')
    });
};

function base64_encode(image) {
    var bitmap = _fs2.default.readFileSync(image, 'base64');
    return "data:image/jpg;base64," + bitmap;
}

//Saves radiology assessment results in the database
var saveReport = function saveReport(req, res) {
    var radiologyTest = new _radiology2.default(req.body);
    radiologyTest.save(function (err, result) {
        if (err) {
            return res.status(400).json({
                error: _dbErrorHandler2.default.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: "Successfully saved the report"
        });
    });
};

//Fetches all records in the Radiology tests database that match the patient ID
var reportByPatientId = function reportByPatientId(req, res, next, id) {
    _radiology2.default.find({ patient_ID: id }).exec(function (err, records) {
        if (err || !records) return res.status(400).json({
            error: "No records found."
        });
        req.history = records;
        next();
    });
};

//Takes a patient ID and returns all radiology reports linked to it
//sorts from latest to oldest
var getHistory = function getHistory(req, res) {
    return res.json(req.history);
};

exports.default = { assessImage: assessImage, saveReport: saveReport, getHistory: getHistory, reportByPatientId: reportByPatientId };