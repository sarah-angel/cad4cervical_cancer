import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

/**
 * Authenticates a user 
 * Retrieves user with matching email from the database
 * Verifies password and if successful,
 * Generates JWT signed with secret key and user's _id
 * Returns signed JWT and user details in res
 */
const signin = (req, res) => {
    User.findOne({
        "username": req.body.username
    }, (err, user) => {
        if (err || !user)
            return res.status(401).json({
                error: 'User not found'
            })
        if (!user.authenticate(req.body.password)){
            return res.status(401).send({
                error: 'Authentication failed.'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)

        return res.json({
            token,
            user: {_id: user._id, username: user.username, department: user.department}
        })
    })
}

/**
 * Verifies that incoming requests have valid JWT in 
 * Authorization header
 * If token is valid, it appends user's ID in auth key
 */
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

export default { signin, requireSignin }