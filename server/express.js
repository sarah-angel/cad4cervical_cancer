import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import patientRoutes from './routes/patient.routes'
import radiologyRoutes from './routes/radiology.routes'
import consultationRoutes from './routes/consultation.routes'

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json({
    limit: 500000
}))

app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())
app.use(compress())
app.use(helmet())

//Catch UnauthorizedError thrown by express-jwt when
//can't validate token
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({
            error: err.name + ": " + err.message
        })
    }

    next()
})

app.use(express.static(__dirname + 'public'))

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', patientRoutes)
app.use('/', radiologyRoutes)
app.use('/', consultationRoutes)

export default app