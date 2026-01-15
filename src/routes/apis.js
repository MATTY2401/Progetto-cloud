const express = require("express");

//Controllers used
const account_controller = require("../controllers/accountController");
const summoner_controller = require("../controllers/summonerController");
const game_controller = require("../controllers/gameController");


const router = express.Router({ mergeParams: true });


//ROUTES

// maybe make an how to page idk
//router.get("/")

router.get("/summoner/create/:RiotId/:Tag", summoner_controller.summoner_create_get)

router.get("/summoner/:RiotId/:Tag", summoner_controller.summoner_detail);

module.exports = router;