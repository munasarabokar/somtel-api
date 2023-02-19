import express from 'express'
import { Postcheck,add_tracker, update_tracking , delete_tracking, get_tracker , send_tracker, check } from '../controller/api.js'

const router = express.Router()

router.get('/all' , get_tracker)

router.get('/check' , check)
router.post('/check' , Postcheck)

router.get('/delete/:id/:link' , delete_tracking)

router.post('/update/:id/:link' , update_tracking)

router.post('/add/:link' , add_tracker)
router.post('/send/:link' , send_tracker)


export default router