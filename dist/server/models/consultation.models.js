'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Add age and gender when making predictions

/**Consultation Schema
 * patient_ID
 * staff_ID
 * created
 * symptoms []
 * weight
 * height
 * temperature
 * smokes (yes/no)
 * alcohol (yes/no)
 * region
 * children
 * family_history
 * prediction
 * comments
 */

var ConsultationSchema = new _mongoose2.default.Schema({
    patient_ID: {
        type: String,
        required: [true, 'Patient ID is required']
    },
    staff_ID: {
        type: String,
        required: [true, 'Staff ID is required']
    },
    created: {
        type: Date,
        default: Date.now
    },
    symptoms: {
        type: [String],
        trim: true
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    temperature: {
        type: Number
    },
    smokes: {
        type: Boolean
    },
    alcohol: {
        type: Boolean
    },
    region: {
        type: String,
        trim: true
    },
    children: {
        type: String
    },
    family_history: {
        type: String
    },
    prediction: {
        type: Number
    },
    comments: {
        type: String
    }
});

exports.default = _mongoose2.default.model('Consultation', ConsultationSchema, 'consultations');