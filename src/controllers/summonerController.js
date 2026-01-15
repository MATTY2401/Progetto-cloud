const Summoner = require('../models/summoner')
const Helper = require('./helper/helper')
const apiServer = require('../middleware/apiServer')


// Display Summoner page for a specific Author.
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
    summoner = summoner.to_JSON();
    console.log(summoner);
    res.json(summoner);

};

// Display Summoner create form on GET.
exports.summoner_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Summoner create GET");
};

exports.summoner_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Summoner create GET");
};

// Display Summoner delete form on GET.
exports.summoner_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Summoner delete GET");
};

// Handle Summoner delete on POST.
exports.summoner_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Summoner delete POST");
};

summoner_create = async (RiotId, Tag) => {
  //api call
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

