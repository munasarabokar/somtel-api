import express from 'express'
import { add_tracker, update_tracking , delete_tracking, get_tracker , send_tracker , get_data } from '../controller/apiController.js'

const router = express.Router()

router.get('/getAll/:hex' , get_tracker)



router.get('/getData/:hex' , get_data)

router.get('/delete/:id/:link' , delete_tracking)

router.post('/upDate/:id/:link' , update_tracking)

router.post('/add/:link' , add_tracker)

router.post('/send/:link' , send_tracker)


export default router