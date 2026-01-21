require('dotenv').config();

const express = require('express');
const axios = require('axios');
const apiRouter = require("./routes/apis.js");

const api_key = process.env.API_KEY;

const port = 1515;
const app = express();

app.use('/api', apiRouter);

if ((process.env.NODE_ENV || '').trim() !== 'test') {
    app.listen(port, () => {
        console.log(`Server API in ascolto sull'indirizzo http://localhost:${port}`);
    });
}