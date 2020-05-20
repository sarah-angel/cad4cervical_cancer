
const assessImage = async (image) => {
    return fetch('/api/patient/assessImage', {
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
    return fetch('/api/patient/saveReport', {
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

const getHistory = async (patientId) => {
    return fetch('/api/patient/history/' + patientId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
}

export { assessImage, saveReport, getHistory }