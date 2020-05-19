import mongoose from 'mongoose'
//Add age and gender when making predictions

/**Consultation Schema
 * patient_ID
 * staff_ID
 * created
 * symptoms [] ?each be their own field
 * weight
 * height
 * temperature
 * smokes (yes/no)
 * alcohol (yes/no)
 * region
 * children
 * family_history
 * symptom_duration ?
 * existing_conditions[] ?
 * prediction
 * comments
 */

const ConsultationSchema = new mongoose.Schema({
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
        trim: true,
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
    children: { //should be Number, capped at 7 in model
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
})

export default mongoose.model('Consultation', ConsultationSchema, 'consultations')
