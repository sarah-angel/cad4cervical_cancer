const url = "http://localhost:5000"

//verifies a user who signs in
//server returns a JWT if succesful
const signin = (user) => {
    return fetch(url + '/auth/signin/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //credentials: 'include',
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}

//takes user data from view component and makes request to create new user
//returns response to the component as a promise
const create = (user) => {
    return fetch(url + '/api/users', {
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

export { signin, create }