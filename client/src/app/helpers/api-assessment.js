const url = "http://localhost:5000"

const assessImage = async (image) => {
    return fetch( url + '/api/patient/assessImage', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)

    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })

}

const saveReport = async (report) => {
    return fetch( url + '/api/patient/saveReport', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report) 
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
    
}

export { assessImage, saveReport }