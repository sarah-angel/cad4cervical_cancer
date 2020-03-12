const url = "http://localhost:5000"

const save = async (report) => {
    return fetch( url + '/api/lab/save', {
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

export { save }