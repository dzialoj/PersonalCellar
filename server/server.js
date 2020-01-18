const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const cors = require('cors')
const app = express()
const PORT = 8080

const user = require('./routes/user')
app.use(cors({credentials: true, origin: true}))
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

// Sessions
app.set('trust proxy',1)
app.use(
    session({
        secret: 'gengar',
        resave: false, 
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 20*60*60*1000
        },
        store: new MongoStore({ 
            mongooseConnection: dbConnection, 
            ttl: 24 * 60 * 60
        })
    })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})