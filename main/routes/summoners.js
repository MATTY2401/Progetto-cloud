require('dotenv').config();

const express = require("express");
const router = express.Router({ mergeParams: true });

const axios = require('axios');

const api_key = process.env.API_KEY;

// Home page route.
router.get("/", (req, res) => {
  res.send("Error");
});

// Profile Route route. //change this to use our apis for the call so it's more streamlined
router.get("/:RiotId/:Tag", (req, res) => {
  res.send("not yet implemented use the apis uri for the call");
});

module.exports = router;