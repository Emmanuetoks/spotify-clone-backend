import express from 'express'
import { createPlayList, getPlayList } from '../controllers/playListController.js'



const router = express.Router()

router.route('/').post(createPlayList)

router.route('/:playlistID').get(getPlayList)
export default router