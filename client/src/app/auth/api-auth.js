const url = "http://localhost:3001"

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

export { signin }