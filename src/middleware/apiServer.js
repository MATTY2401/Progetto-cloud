require('dotenv').config();

const axios = require('axios');

const api_key = process.env.API_KEY;

async function get_riot_account_info(RiotId, Tag){
    var res;
    var url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${RiotId}/${Tag}`  
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call for account_info succeded');
                console.log(response.data);
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
            res = error;
    });
    return res;
}

async function get_summoner_info(Puuid){
    var res;
    var url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${Puuid}`
    await axios.get(url,{headers:{'X-Riot-Token': api_key}})
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call succeded')
                console.log(response.data)
                res = response.data
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
                res = error
        });
    return res;
}

async function get_summoner_region(Puuid){
    //TODO: implement
}

async function get_summoner_rank_info(Puuid, region="euw1"){
    var res
    var url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${Puuid}`
    await axios.get(url,{headers:{'X-Riot-Token': api_key}})
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call succeded')
                console.log(response.data)
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
                res = error;
        });
    return res;
}

async function get_games_id(Puuid){
    var res;
    var url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${Puuid}/ids?start=0&count=10`;
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call for games_id succeded');
                console.log(response.data);
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
            res = error;
    });
    return res;
}

async function get_game_info(game_id){
    var res;
    var url = `https://europe.api.riotgames.com/lol/match/v5/matches/${game_id}`;
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call for game_info succeded');
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
            res = error;
    });
    return res;
}

module.exports = {
    get_summoner_rank_info,
    get_summoner_info,
    get_riot_account_info,
    get_summoner_region,
    get_games_id,
    get_game_info}