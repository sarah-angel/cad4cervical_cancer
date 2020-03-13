const url = "http://localhost:5000"

const getPending = async (patient) => {
    return fetch( url + '/api/consultation/pending', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient) 
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
    
}

const getPrediction = (consultation) => {
    return fetch( url + '/api/consultation/predict', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consultation)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
}

const save = (consultation) => {
    return fetch( url + '/api/consultation/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consultation)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
}

const getHistory = (patient_ID) => {
    return fetch( url + '/api/consultation/history/' + patient_ID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
}

export { getPending, getPrediction, save, getHistory }