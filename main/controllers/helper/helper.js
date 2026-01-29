

exports.add_games_helper = async (Ppuid) => {
    const game_controller = require("../gameController");
    return await game_controller.create_10_latest_games(Ppuid);
}