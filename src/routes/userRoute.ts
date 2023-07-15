import express from 'express'
import { getUser, getUsers } from '../controllers/userController.js'
import { signUpUser } from '../controllers/authController.js'
import { protectRoute } from '../middlewares/protectRoute.js'




const router = express.Router()


router.route('/').get(protectRoute,  getUsers)
router.route('/:userID').get(getUser)

export default router