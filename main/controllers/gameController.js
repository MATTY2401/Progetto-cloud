const Game = require('../models/game')
const apiServer = require('../middleware/apiServer')


exports.get_games_info = async (req, res, next) => {
  const req_body = req.body;
  const games = req_body.games;
  const info = await this.get_games_details(games);
  res.status(200).json(info);

}
exports.create_10_latest_games = async (Puuid) => {
  const games_array = await apiServer.get_games_id(Puuid);
  console.log(games_array);
  const games_existing = await Game.query().findByIds(games_array);
  console.log(games_existing);
  const existing_ids = games_existing.map(elem => elem.game_id);
  const games_to_insert = games_array.filter(x => !existing_ids.includes(x));
  console.log(games_to_insert);
  await Promise.all(games_to_insert.map(async (game) => {
    await game_create(game);
  }))
  return games_array
}

exports.get_game_details = async (game_id) => {
  var game = await Game.query().findById(game_id);
  if(!game)
  {
    game = await game_create(game);
  }
  return game;
}

exports.get_games_details = async (game_ids) => {
  var games_existing = await Game.query().findByIds(game_ids).orderBy("date", "DESC");
  const existing_ids = games_existing.map(elem => elem.game_id) 
  const games_to_get = game_ids.filter(x => !existing_ids.includes(x));
  if(games_to_get.length > 0)
  {
    console.log("getting games")
    await Promise.all(games_to_get.map(async (game) => {
      game = await game_create(game);
      games_existing.push(game);
    }))
  }
  return games_existing;

}

game_create = async (game_id) => {
  const game = await Game.query().findById(game_id);
  if(game == undefined)
  {
    console.log(`Inserting game with id: ${game_id}`);
    const game_info = await apiServer.get_game_info(game_id);
    //translated the unix time into date time
    const timestamp = new Date(game_info.info.gameCreation + game_info.info.gameDuration);
    const isostring = timestamp.toISOString()
    const gamemode = game_info.info.gameMode;
    var game_winner = 0;
    console.log(`has team 2 won: ${game_info.info.teams[1].win}`)
    if(game_info.info.teams[1].win == true)
    {
      game_winner = 1;
    }
    let team1 = [];
    let team2 = [];
    game_info.info.participants.forEach(player => {
      
      player_info = {};
      player_info.championName = player.championName;
      player_info.championId = player.championId;
      const riotName = player.riotIdGameName;
      const riotTag = player.riotIdTagline;
      const riotId = riotName.concat("#",riotTag);
      player_info.playerId = riotId;


      if(player.teamId == 100)
      {
        team1.push(player_info);
      }
      else    
      {
        team2.push(player_info);
      }
    })
    
    return await Game.query().insert(
                  {
                    game_id: game_id,
                    gamemode: gamemode,
                    team_1: team1,
                    team_2: team2,
                    date: isostring,
                    winner: game_winner,
                  });
    
  }
};


getCurrentTimeFromStamp = function(timestamp) {
    var d = new Date(timestamp);
    const timeStampCon = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':';
    console.log(timeStampCon)
    return timeStampCon;
};