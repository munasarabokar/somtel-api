import express from 'express'
import { add_tracker, update_tracking , delete_tracking, get_tracker } from '../controller/api.js'

const router = express.Router()

router.get('/all/:link' , get_tracker)

router.get('/delete/:id/:link' , delete_tracking)

router.post('/update/:id/:link' , update_tracking)

router.post('/add/:link' , add_tracker)


export default router