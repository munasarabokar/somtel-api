import express from 'express'
import ApiRouter from './routes/api.js'
import AuthRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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