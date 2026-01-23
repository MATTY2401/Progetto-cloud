const Summoner = require('../models/summoner')
const Helper = require('./helper/helper')
const apiServer = require('../middleware/apiServer')


//Sends information for a specific summoner.
exports.summoner_detail = async (req, res, next) => {
    const RiotId = req.params.RiotId;
    const Tag = req.params.Tag;
    const fullRiotId = RiotId.concat("#",Tag);
    var summoner = await Summoner.query()
                        .where('nome', `${fullRiotId}`);
    console.log(summoner.length);
    if (summoner.length == 0)
    {
        console.log('No such summoner');
        summoner = await summoner_create(RiotId, Tag);
        var games_array = await Helper.add_games_helper(summoner.user_id)
        summoner = await Summoner.query().findById(summoner.user_id).patch({games: games_array}).returning('*');
        
    }
    summoner = summoner[0].to_JSON();
    console.log(summoner);
    res.json({response_code: 200, data: summoner});
};

exports.summoner_update = async (req, res, next) => {
  
  const RiotId = req.params.RiotId;
  const Tag = req.params.Tag;
  var summoner = await summoner_patch(RiotId, Tag);
  summoner = summoner.to_JSON();
  console.log(summoner);
  res.json({response_code: 200, data: summoner});
}

exports.summoner_leaderboard = async (req, res, next) => {
  const type = req.params.type;
  console.log(`value of type is : ${type}`);
  var queue;
  if(type === undefined)
  {
    queue = "RANKED_SOLO_5x5";
  }
  else
  {
    switch (type) 
    {
      case "soloq":
        queue = "RANKED_SOLO_5x5";
        break;
      case "flex":
        queue = "RANKED_FLEX_SR";
        break;
      default:
        queue = "NOT_FOUND";
        break;
    }
  }
  if (queue == "NOT_FOUND")
  {
    res.json({response_code: 404, data: {}}); // modify all res information to be like this
  }

  const leaderboard = await apiServer.get_leaderboard(queue);
  var response = [];
  await Promise.all(leaderboard.entries.slice(0,20).map(async (entry) => {
    const riot_account_info = await apiServer.get_riot_account_info_by_puuid(entry.puuid);
    response.push(riot_account_info.gameName.concat('#', riot_account_info.tagLine));
  }))
  res.json({response_code: 200, data: response});
}

summoner_create = async (RiotId, Tag) => {
  console.log("calling riot account api");
  const riot_account_info = await apiServer.get_riot_account_info(RiotId, Tag);
  const puuid = riot_account_info.puuid;
  const riot_full_id = RiotId.concat("#",Tag);
  console.log("calling riot summoner info");
  const summoner_info = await apiServer.get_summoner_info(puuid);
  const summoner_lvl = summoner_info.summonerLevel;
  const profile_icon_id = summoner_info.profileIconId;
  console.log("calling summoner rank info");
  const ranked_info = await apiServer.get_summoner_rank_info(puuid);
  var sq_rank = 'unranked';
  var f_rank = 'unranked';
  console.log("retrieving rank")
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
  console.log("Inserting into database")
  const summoner = await Summoner.query()
                        .insert({
                          user_id: puuid,
                          nome: riot_full_id,
                          soloq_rank: sq_rank,
                          flex_rank: f_rank,
                          games: [],
                          summoner_level: summoner_lvl,
                          profile_icon_id: profile_icon_id,
                        }).returning('*');
  return summoner;
};

summoner_patch = async (RiotId, Tag) =>{
  console.log("calling riot account api");
  const riot_account_info = await apiServer.get_riot_account_info(RiotId, Tag);
  const puuid = riot_account_info.puuid;
  const riot_full_id = RiotId.concat("#",Tag);
  console.log("calling riot summoner info");
  const summoner_info = await apiServer.get_summoner_info(puuid);
  const summoner_lvl = summoner_info.summonerLevel;
  const profile_icon_id = summoner_info.profileIconId;
  console.log("calling summoner rank info");
  const ranked_info = await apiServer.get_summoner_rank_info(puuid);
  var sq_rank = 'unranked';
  var f_rank = 'unranked';
  console.log("retrieving rank")
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
  console.log("Updating database")
  const summoner = await Summoner.query()
                        .patchAndFetchById(puuid,{
                          nome: riot_full_id,
                          soloq_rank: sq_rank,
                          flex_rank: f_rank,
                          summoner_level: summoner_lvl,
                          profile_icon_id: profile_icon_id,
                        });
  return summoner;
}