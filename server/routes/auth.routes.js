import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

//POST request to Authenticate user with username and password
router.route('/auth/signin')
    .post(authCtrl.signin)

export default router