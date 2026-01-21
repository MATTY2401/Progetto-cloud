//Get specific Summoner informations
exports.summoner_detail = async (req, res, next) => {
    const RiotId = req.params.RiotId;
    const Tag = req.params.Tag;
    var sq_rank = 'unranked';
    var f_rank = 'unranked';
    const riot_full_id = RiotId.concat("#",Tag);
    const account_info = await get_riot_account_info(RiotId, Tag);
    if(account_info == {})
    {
        res.json({response_code: 404, data: {}});
    }
    const puuid = account_info.puuid;
    const summoner_info = await get_summoner_info(puuid);

    if(summoner_info == {})
    {
        res.json({response_code: 404, data: {}});
    }
    const summoner_lvl = summoner_info.summonerLevel;
    const profile_icon_id = summoner_info.profileIconId;
    const ranked_info = await get_summoner_rank_info(puuid);
    for(let i = 0; i < ranked_info.length; i++)
    {
    if (ranked_info[i].queueType == "RANKED_SOLO_5x5")
    {
      sq_rank = (ranked_info[i].tier).concat(" ",ranked_info[i].rank);
    }
    else if(ranked_info[i].queueType == "RANKED_FLEX_SR")
    {
      f_rank = (ranked_info[i].tier).concat(" ",ranked_info[i].rank);
    }
    }
    res.json({response_code: 200, data:{
                                       user_id: puuid,
                                       name: riot_full_id,
                                       soloq_rank: sq_rank,
                                       flex_rank: f_rank,
                                       games: [],
                                       summoner_level: summoner_lvl,
                                       profile_icon_id: profile_icon_id,
                                        }});
};


async function get_riot_account_info(RiotId, Tag){
    var res;
    var url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${RiotId}/${Tag}`  
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call for account_info succeded');
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

async function get_summoner_info(Puuid){
    var res;
    var url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${Puuid}`
    await axios.get(url,{headers:{'X-Riot-Token': api_key}})
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call succeded')
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

async function get_summoner_rank_info(Puuid, region="euw1"){
    var res
    var url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${Puuid}`
    await axios.get(url,{headers:{'X-Riot-Token': api_key}})
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call succeded')
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

async function get_free_champions() {
    var res;
    var url = `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`  
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
                console.log('Riot api call for free champion rotation succeded');
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

async function get_leaderboard(queue_type){
    var res;
    var url = `https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue_type}`  
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
                console.log(`Riot api call for ${queue_type} leaderboard succeded`);
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

async function get_riot_account_info_by_puuid(puuid){
    var res;
    var url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`  
    await axios.get(url,{headers:{'X-Riot-Token': api_key}}
        )
        .then(response => {
            if(response.status == 200) {
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