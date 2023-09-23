import exp from 'constants'
import express from 'express'
import { getCategory } from '../controllers/categoryController.js'

const router = express.Router()


router.route('/:categoryID') .get(getCategory)
export default router
