/**
 * id
 * patientId
 * staffId
 * date/time
 * image_path
 * prediction
 * comments
 */

import mongoose from 'mongoose'

const RadiologyTestSchema = new mongoose.Schema({
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
    diagnosis: {
        type: Object,
    },
    notes: {
        type: String,
    }
})

export default mongoose.model('RadiologyTest', RadiologyTestSchema, 'radiology_tests')