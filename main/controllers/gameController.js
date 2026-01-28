const Game = require('../models/game')
const apiServer = require('../middleware/apiServer')

exports.create_10_latest_games = async (Puuid) => {
  const games_array = await apiServer.get_games_id(Puuid);
  const games_existing = await Game.query().findByIds(games_array);
  const games_to_insert = games_array.filter(x => !games_existing.includes(x));
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
  var games_existing = await Game.query().findByIds(game_ids);
  const games_to_get = games_ids.filter(x => !games_existing.includes(x));
  if(games_to_get.length > 0)
  {
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
    const game_date = getCurrentTimeFromStamp(game_info.info.gameCreation + game_info.info.gameDuration);
    const gamemode = game_info.info.gameMode;
    var game_winner = 0;
    if(game_info.info.teams[1].wins == "true")
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
                    date: game_date,
                    winner: game_winner,
                  });
    
  }
};


getCurrentTimeFromStamp = function(timestamp) {
    var d = new Date(timestamp);
    const timeStampCon = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
    console.log(timeStampCon)
    return timeStampCon;
};