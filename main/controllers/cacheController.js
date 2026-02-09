const Cache = require('../models/cache');
const apiServer = require('../middleware/apiServer');

exports.checkCache = async () => {
  const time = await Cache.query().select('created_at').limit(1);
  if(!time[0])
  {
    return true;
  }
  const timestamp = (new Date(time[0].created_at)).getTime();
  const current_timeStamp = Date.now();
  const difference = current_timeStamp - timestamp;
  const day_diff =  (difference/ (1000 * 3600 * 24)).toFixed(0)

  console.log(day_diff);

  if(day_diff > 0)
  {
    return true
  }
  else
  {
    return false
  }
}

exports.summoner_leaderboard = async (req, res, next) => {
  
  var queue = "RANKED_SOLO_5x5";

  const toUpdate = await this.checkCache(); 
  console.log(toUpdate);
  if(toUpdate)
  {
    try
    {
        await Cache.query().delete();
        const leaderboard = await apiServer.get_leaderboard(queue);   
        const top20leaderboard = leaderboard.entries.slice(0,20);
        await Promise.all(top20leaderboard.map(async (entry) => {
            const riot_account_info = await apiServer.get_riot_account_info_by_puuid(entry.puuid);
            await Cache.query().insert({
                nome: riot_account_info.gameName.concat('#', riot_account_info.tagLine),
                puuid: entry.puuid, 
                lp: entry.leaguePoints
            })
        }))


        players = await Cache.query().select('nome','puuid','lp').orderBy('lp','desc','last');
        res.status(200).json({players: players});
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Internal Server Error'});
    }

  }
  else{
    try{
      players = await Cache.query().select('nome','puuid','lp').orderBy('lp','desc','last');
      res.status(200).json({players: players});
    }catch(err){
      res.status(500).json({message:'Internal Server Error'});
    }
  }
}
