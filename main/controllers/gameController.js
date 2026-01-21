const Game = require('../models/game')
const apiServer = require('../middleware/apiServer')

// Display Game page for a specific Author.
exports.game_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Game detail: ${req.params.id}`);
};

// Display Game create form on GET.
exports.game_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game create GET");
};

// Handle Game create on POST.
exports.game_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game create POST");
};

// Display Game delete form on GET.
exports.game_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game delete GET");
};

// Handle Game delete on POST.
exports.game_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game delete POST");
};

exports.create_10_latest_games = async (Puuid) => {
  const games_array = await apiServer.get_games_id(Puuid);
  await Promise.all(games_array.map(async (game) => {
    await game_create(game);
  }))
  return games_array
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
      if(player.teamId == 100)
      {
        //maybe use name+riotid so you can search them, probably better
        team1.push(player.puuid)
      }
      else    
      {
        team2.push(player.puuid)
      }
    })
    
    await Game.query().insert(
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