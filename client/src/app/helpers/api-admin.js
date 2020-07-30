//register staff
export const registerStaff = (user) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}

export const registerPatient = (patient) => {
    return fetch('/api/patients', {
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
    .catch((err) => console.log(err))
}