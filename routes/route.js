const express  = require('express')
const { send_tracker  , gets_tracker , getInfo } = require('../controller/controller.js')

const router = express.Router()


router.post('/send/:deviceid' , send_tracker)


router.get('/getnoficiation/:deviceid' , gets_tracker)

router.get('/getinformations/:deviceid' , getInfo)



module.exports = router;