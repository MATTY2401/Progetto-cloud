require('dotenv').config();

const express = require('express');
const axios = require('axios');

const api_key = process.env.API_KEY;

async function get_free_champions() {
    // check if there is a new version.json entry 
    
    console.log('Getting new version.json and comparing it')
    var res
    var url = "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations"
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully feteched new champ rotation')
                res = response.data;
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
    return res;
}

module.exports = {get_free_champions}