'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadiologyTestSchema = new _mongoose2.default.Schema({
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
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    prediction: {
        type: Number
    },
    comments: {
        type: String
    }
}); /**
     * id
     * patientId
     * staffId
     * date/time
     * image_path
     * prediction
     * comments
     */

exports.default = _mongoose2.default.model('RadiologyTest', RadiologyTestSchema, 'radiology_tests');