const auth = {

    //saves credentials on successful signin
    authenticate(jwt, cb) {
        if(typeof window !== 'undefined')
            sessionStorage.setItem('c4cc_jwt', JSON.stringify(jwt))
        cb()
    },

    //retrieves credentials if signed in
    isAuthenticated() {
        if(typeof window == "undefined")
            return false
        if( sessionStorage.getItem('c4cc_jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false
    },

    //deletes credentials on signout
    signout(cb) {
        if(typeof window !== "undefined")
            sessionStorage.removeItem('c4cc_jwt')
        cb()
    }

}

export default auth