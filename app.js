'use strict';
const express = require('express')
const ApiRouter = require('./routes/route.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
 const responseTime = require('response-time')


var whitelist = ['https://www.munasar.co.uk', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const app = express();
 app.use(responseTime())
app.use(cookieParser())
app.use(express.json())
const ports = 3000;

app.use('/api', cors(corsOptions) , ApiRouter)

app.listen(ports , ()=> {
    console.log('Ports on '+ports+'....');
})