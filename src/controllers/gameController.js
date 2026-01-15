const Game = require('../models/game')

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