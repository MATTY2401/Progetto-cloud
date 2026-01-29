const express = require('express');
const router = express.Router();

const summoner_controller = require('../controllers/summonerController');
const free_champion_controller = require('../controllers/free_championController');
const account_controller = require('../controllers/accountController');
const cache_controller = require('../controllers/cacheController');

router.post("/register", account_controller.account_create);

router.post('/login', account_controller.account_login);

router.patch("/account", account_controller.account_patch);

router.delete("/account/delete", account_controller.account_delete);

//get profile image
router.get("/account/image", account_controller.get_profile_icon);

//update profile image
router.patch("/account/image", account_controller.update_profile_icon);

//top 20 solo q player
router.get("/summoner/leaderboard", cache_controller.summoner_leaderboard);

//update summoner info from riot servers
router.patch('/summoner',summoner_controller.summoner_update);

//search player info
router.get("/summoner/:RiotId/:Tag", summoner_controller.summoner_detail);

//give free champions
router.get("/champion/free-rotation", free_champion_controller.champion_rotation);


module.exports = router;