/**Lab Test Schema
 * consultation_ID - FK
 * created
 * hiv (true/false)
 * chest-x-ray (true/false)
 * ultrasound (true/false)
 * fbp: 
 *      baso
 *      eos
 *      hb
 *      lymphocyte
 *      mch
 *      mcv
 *      neutrophil
 *      plt
 *      rbc
 *      wbc
 * urinalysis:
 *      bilirubin
 *      creatinine
 *      epithelial
 *      ph
 *      protein
 *      urea
 *      uric-acid
 *
 */

import mongoose from 'mongoose'

const LabTestSchema = new mongoose.Schema({
    patient_ID: {
        type: String,
        required: [true, 'Patient ID is required']
    },
    consultation_ID: {
        type: String,
        unique: true,
        required: [true, 'Consultation ID is required']
    },
    created: {
        type: Date,
        default: Date.now
    },
    hiv: {
        type: Boolean
    },
    chest_x_ray: {
        type: Boolean
    },
    ultrasound: {
        type: Boolean
    },
    fbp: {
        baso: {
            type: Number
        },
        eos: {
            type: Number
        },
        hb: {
            type: Number
        },
        lymphocyte: {
            type: Number
        },
        mch: {
            type: Number
        },
        mcv: {
            type: Number
        },
        neutrophil: {
            type: Number
        },
        plt: {
            type: Number
        },
        rbc: {
            type: Number
        },
        wbc: {
            type: Number
        },
    },
    urinalysis: {
        bilirubin: {
            type: Number
        },
        creatinine: {
            type: Number
        },
        epithelial: {
            type: Number
        },
        ph: { 
            type: Number
        },
        protein: { 
            type: Number 
        },
        urea: { 
            type: Number 
        },
        uric_acid: { 
            type: Number 
        },
    }
})


export default mongoose.model('LabTest', LabTestSchema, 'lab_tests')