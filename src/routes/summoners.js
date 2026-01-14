require('dotenv').config();
const express = require("express");
const axios = require('axios');
const router = express.Router({ mergeParams: true });

const api_key = process.env.API_KEY;

// Home page route.
router.get("/", (req, res) => {
  res.send("Error");
});

// Profile Route route. //change this to use our apis for the call so it's more streamlined
router.get("/:RiotId/:Tag", (req, res) => {
  var url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${req.params.RiotId}/${req.params.Tag}`  
  axios.get(url,{headers:{'X-Riot-Token': process.env.API_KEY}}
    )
    .then(response => {
      console.log(response.data.puuid);
      res.send(`Puuid of account ${response.data.gameName}#${response.data.tagLine} is: ${response.data.puuid}`);
    })
    .catch(error => {
      console.log("error");
    })
});

module.exports = router;