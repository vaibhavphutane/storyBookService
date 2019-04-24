const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./routes/auth');
const passport = require('passport');
require('./config/passport')(passport);

app.use(express.json());
app.get('/', (req, res) => {
    res.send('It Works!');
});

app.use('/auth', auth);

app.listen(port, (res) => {
    console.log(`Listening on ${port}`);
});
