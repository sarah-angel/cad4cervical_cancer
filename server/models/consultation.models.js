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
 * family_history (yes/no)
 * symptom_duration 
 * existing_conditions[] 
 * prediction
 * notes
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
        type: Object,
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
    children: { 
        type: Number
    },
    family_history: {
        type: Boolean
    },
    existing_conditions: {
        type: [String],
        trim: true
    },
    symptom_duration: {
        type: String
    },
    prediction: {
        type: Number
    },
    notes: {
        type: String
    }
})

export default mongoose.model('Consultation', ConsultationSchema, 'consultations')
