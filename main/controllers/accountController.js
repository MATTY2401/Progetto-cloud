const Account = require('../models/account')

// Display Summoner page for a specific Author.
exports.account_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Account detail: ${req.params.id}`);
};

// Display Summoner create form on GET.
exports.account_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account create GET");
};

// Handle Summoner create on POST.
exports.account_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account create POST");
};

// Display Summoner delete form on GET.
exports.account_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account delete GET");
};

// Handle Summoner delete on POST.
exports.account_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account delete POST");
};