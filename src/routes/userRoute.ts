import express from 'express'
import { getUser, getUsers } from '../controllers/userController.js'
import { signUpUser } from '../controllers/authController.js'




const router = express.Router()


router.route('/').get(getUsers)
router.route('/:userID').get(getUser)

export default router