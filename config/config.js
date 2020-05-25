import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET || 'mysecret',
    mongoUri: process.env.MONGODB_URI ||
            process.env.MONGO_HOST ||
            'mongodb://' + (process.env.IP || 'localhost') + ':' +
            (process.env.MONGO_PORT || '27017') +
            '/cad4cervical_cancer'
}

export default config