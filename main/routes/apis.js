const express = require("express");

//Controllers used
const account_controller = require("../controllers/accountController");
const summoner_controller = require("../controllers/summonerController");
const game_controller = require("../controllers/gameController");
const free_champion_controller = require('../controllers/free_championController');


const router = express.Router({ mergeParams: true });


//ROUTES

router.get("/summoner/leaderboard", summoner_controller.summoner_leaderboard);

router.get('/summoner/leaderboard/:type', summoner_controller.summoner_leaderboard)

router.get("/summoner/create/:RiotId/:Tag", summoner_controller.summoner_create_get)

router.get("/summoner/:RiotId/:Tag", summoner_controller.summoner_detail);

router.get("/champion/free-rotation", free_champion_controller.champion_rotation);



module.exports = router;