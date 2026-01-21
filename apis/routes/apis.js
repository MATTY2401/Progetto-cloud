const express = require("express");

const router = express.Router({ mergeParams: true });
const summoner_controller = require("../controllers/summonerController");

//ROUTES

//router.get("/summoner/leaderboard", summoner_controller.summoner_leaderboard);

//router.get('/summoner/leaderboard/:type', summoner_controller.summoner_leaderboard)

router.get("/summoner/:RiotId/:Tag", summoner_controller.summoner_detail);

//router.get("/champion/free-rotation", free_champion_controller.champion_rotation);



module.exports = router;