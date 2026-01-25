const express = require('express');
const router = express.Router();

const summoner_controller = require('../controllers/summonerController');
const free_champion_controller = require('../controllers/free_championController');
const account_controller = require('../controllers/accountController');

router.post("/account/create", account_controller.account_create_post);

router.post("/account/delete", account_controller.account_delete_post);

router.get("/summoner/leaderboard", summoner_controller.summoner_leaderboard);

router.get('/summoner/leaderboard/:type', summoner_controller.summoner_leaderboard);

router.get("/summoner/:RiotId/:Tag", summoner_controller.summoner_detail);

router.get("/champion/free-rotation", free_champion_controller.champion_rotation);

module.exports = router;