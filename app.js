const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const keys = require('./config/keys');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Map global promises
mongoose.Promise = global.Promise;

// Load User Model
require('./models/users');

// Auth URL
const auth = require('./routes/auth');
const passport = require('passport');

// Google Strategy Configuration
require('./config/passport')(passport);

// Mongoose connect DB connection
mongoose.connect(keys.mongoURI).then(res => console.log('MongoDB connected successfully..'))
                               .catch(err => console.log(err));

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/auth', auth);

app.listen(port, (res) => {
    console.log(`Listening on ${port}`);
});
