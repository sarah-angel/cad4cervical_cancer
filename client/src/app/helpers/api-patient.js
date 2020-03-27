const url = "http://localhost:5000"

//Retrieve specific patient by ID
const read = (params) => {
    return fetch('/api/patients/' + params.patientId, {
        method: 'GET',
        headers: {
            'Accpet': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        }
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}

export { read }