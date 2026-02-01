require('dotenv').config();

const axios = require('axios');

const api_key = process.env.API_KEY;

async function get_free_champions() {
    // check if there is a new version.json entry 
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

async function get_games_id(puuid) {
    // check if there is a new version.json entry 
    var res
    var url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=400&type=normal&start=0&count=10`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got the 10 most recent games');
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

async function get_game_info(game_id) {
    // check if there is a new version.json entry 
    var res
    var url = `https://europe.api.riotgames.com/lol/match/v5/matches/${game_id}`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got the game information');
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

async function get_riot_account_info(RiotId, Tag) {
    var res
    var url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${RiotId}/${Tag}`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got riot account info');
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

async function get_riot_account_info_by_puuid(puuid) {
    var res
    var url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got riot account info');
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

async function get_summoner_info(puuid) {
    var res
    var url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got riot account info');
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

async function get_summoner_rank_info(puuid) {
    var res
    var url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got riot account rank');
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

async function get_leaderboard(queue) {
    var res
    var url = `https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}`
    await axios.get(url, {headers: {'X-Riot-Token': api_key }})
        .then(response => {
            if(response.status == 200) {
                console.log('Successfully got leaderboard');
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

module.exports = {
    get_free_champions,
    get_games_id,
    get_game_info,
    get_riot_account_info,
    get_riot_account_info_by_puuid,
    get_summoner_info,
    get_summoner_rank_info,
    get_leaderboard,
}