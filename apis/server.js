require('dotenv').config();

const express = require('express');
const cron = require('cron');
const axios = require('axios');
const redis = require('redis');
const apiRouter = require("./routes/apis.js");


const Versionjob = cron.CronJob.from({
        cronTime: '0 12 * * WED', //execute this job every tuesday at 12
        onTick: check_new_version,
        start: true,
        runOnInit: true,
        waitForCompletion: true
});


var isVersionNew = false;

const api_key = process.env.API_KEY;

const port = 1515;
const app = express();

async function check_new_version() {
    // check if there is a new version.json entry 
    
    console.log('Getting new version.json and comparing it')
    var res
    var url = "https://ddragon.leagueoflegends.com/api/versions.json"
    await axios.get(url)
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully feteched version.json informations')
                res = response.data;
                console.log(res)
            }
        })
        .catch(error => {
                if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log('Error', error.message);
                }
                res = {};
        });
    if(res == {})
    {
        console.log('failed to fetch data, check logs');
    }

    // take the file from redis and compare first element with the new one
    const client = redis.createClient({
        url: "redis://redis:6379",
        });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    const value = await client.get('patch-version');
    console.log(`latest patch version: ${value}`); // >>> value
    if(value === null)
    {
        console.log('inserting into the redis cache');
        await client.set('patch-version', res[0]);
        isVersionNew = true;
    }
    else 
    {
        if (value == res[0])
        {
            isVersionNew = false;
        }
        else
        {
            isVersionNew = true;
        }
    }
    await client.quit();
}

if ((process.env.NODE_ENV || '').trim() !== 'test') {
    app.listen(port, () => {
        console.log(`Server API in ascolto sull'indirizzo http://localhost:${port}`);
    });
}