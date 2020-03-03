import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise //use ES6 promises
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database')
})

app.listen(config.port, function onStart(err) {
    if (err) {
        console.log(err)
    }

    console.info("Server started on port " + config.port)
})