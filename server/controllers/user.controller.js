import User from '../models/user.model'
import errorHandler from './../helpers/dbErrorHandler'

/**
* Creates a new user with the user JSON object in the request
* within req.body
* user.save saves the new user to database after Mongoose validates.
*/
const create = (req, res, next) => {
   const user = new User(req.body)
   user.save((err, result) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler.getErrorMessage(err)
           })
       }
       res.status(200).json({
           message: "Successfully signed up!"
       })
   })
}

export default { create }