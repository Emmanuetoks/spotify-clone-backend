import express from 'express'
import { createPlayList, getPlayLists } from '../controllers/playListController.js'



const router = express.Router()

router.route('/').get(getPlayLists).post(createPlayList)


export default router