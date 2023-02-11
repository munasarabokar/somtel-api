import express from 'express'
import ApiRouter from './routes/api.js'
import cookieParser from 'cookie-parser'
const app = express();
app.use(cookieParser())
app.use(express.json())
const ports = 3003;

app.use('/api' , ApiRouter)

app.listen(ports , ()=> {
    console.log('Ports on 3003');
})