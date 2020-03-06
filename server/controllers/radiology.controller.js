/**
 * Sends image to ML model for prediction
 * Gets back the prediction as percentage of certainty
 * and class activation map/heatmap
 * 
 * After radiologist has reviewed results then can save
 * report to database
 */
import fs from 'fs'

const assessImage = (req, res) => {
    res.json({
        prediction: 60,
        heatmap: base64_encode( __dirname + '/random_mri_heatmap.jpg')     
    })
}

function base64_encode(image) {
    var bitmap = fs.readFileSync(image, 'base64')
    return "data:image/jpg;base64," + bitmap
}

export default { assessImage }