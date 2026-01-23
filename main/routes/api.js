const express = require('express');
const router = express.Router();

const summoner_controller = require('../controllers/summonerController');
const free_champion_controller = require('../controllers/free_championController')

router.get("/summoner/leaderboard", summoner_controller.summoner_leaderboard);

router.get('/summoner/leaderboard/:type', summoner_controller.summoner_leaderboard)

router.get("/summoner/:RiotId/:Tag", summoner_controller.summoner_detail);

router.get("/champion/free-rotation", free_champion_controller.champion_rotation);

module.exports = router;