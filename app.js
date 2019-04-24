const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('It Works!');
});

app.listen(port, (res) => {
    console.log(`Listening on ${port}`);
});
