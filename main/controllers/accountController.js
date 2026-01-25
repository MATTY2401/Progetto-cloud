const Account = require('../models/account')

// Display Summoner page for a specific Author.
exports.account_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Account detail: ${req.params.id}`);
};

// Handle Summoner create on POST.
exports.account_create_post = async (req, res, next) => {
  const req_body = req.body;
  const username = req_body.username;
  const email = req_body.email;
  const first_name = req_body.first_name;
  const last_name = req_body.last_name;
  const google_id = req_body.google_id;

  const account = await Account.query().insert({
                                          username: username,
                                          name: first_name,
                                          last_name: last_name,
                                          email: email,
                                          google_id: google_id,
  })
  res.json({respone_code:203, data:{}});
};


// Handle Summoner update on PUT.
exports.account_put = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account PUT");
}

// Handle Summoner delete on POST.
exports.account_delete_post = async (req, res, next) => {
  const req_body = req.body;
  const email = req_body.email;
  const deleted_rows = await Account.query().deleteById(email);
  if(deleted_rows > 0)
  {
    res.json({respone_code:204, data:{}});
  }
  else{
    res.json({respone_code:404, data:{}});
  }
  
};

exports.get_account = async (googleId, email) => {
  return await Account.query().findById(email);
};