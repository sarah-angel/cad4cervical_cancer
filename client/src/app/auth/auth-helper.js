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
            return JSON.parse(sessionStorage.getItem('c4cc_jwt'))
        else
            return false
    },

    //returns department of authenticated user
    getDepartment() {
        var token = JSON.parse(sessionStorage.getItem('c4cc_jwt'))
        return token.user.department
    },

    //deletes credentials on signout
    signout(cb) {
        if(typeof window !== "undefined")
            sessionStorage.removeItem('c4cc_jwt')
        cb()
    }

}

export default auth