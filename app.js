const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const keys = require('./config/keys');

// Auth URL
const auth = require('./routes/auth');
const passport = require('passport');

// Google Strategy Configuration
require('./config/passport')(passport);

// Mongoose connect DB connection
mongoose.connect(keys.mongoURI).then(res => console.log('MongoDB connected successfully..'))
                               .catch(err => console.log(err));

app.use(express.json());
app.get('/', (req, res) => {
    res.send('It Works!');
});
app.use('/auth', auth);

app.listen(port, (res) => {
    console.log(`Listening on ${port}`);
});
