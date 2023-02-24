import express from 'express'
import ApiRouter from './routes/api.js'
import AuthRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'



var whitelist = ['https://www.munasar.co.uk', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const app = express();
app.use(cookieParser())
app.use(express.json())
const ports = 3003;

app.use('/api', cors(corsOptions) , ApiRouter)
app.use('/auth', cors(corsOptions) , AuthRouter)

app.listen(ports , ()=> {
    console.log('Ports on '+ports+'....');
})