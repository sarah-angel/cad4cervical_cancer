'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PatientSchema = new _mongoose2.default.Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    middlename: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true,
        required: [true, 'Surname is required']
    },
    date_of_birth: {
        type: Date,
        trim: true,
        required: [true, 'Date is required']
    },
    gender: {
        type: String,
        trim: true,
        required: [true, 'Gender is required']
    },
    blood_type: {
        type: String,
        trim: true
    },
    occupation: {
        type: String,
        trim: true
    },
    nationality: {
        type: String,
        trim: true
    },
    residence: {
        type: String,
        trim: true
    },
    marital_status: {
        type: String,
        trim: true
    }
}); /**
     * Patient details
     * 
     * patientId -PK
     * firstname
     * middlename
     * surname
     * date_of_birth
     * gender
     * blood_type
     * occupation
     * nationality
     * residence
     * maritial_status
     */

exports.default = _mongoose2.default.model('Patient', PatientSchema, 'patients');