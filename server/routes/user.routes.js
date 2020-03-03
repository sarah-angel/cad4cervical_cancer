import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

//create new user with POST
router.route('/api/users')
    .post(userCtrl.create)

export default router
