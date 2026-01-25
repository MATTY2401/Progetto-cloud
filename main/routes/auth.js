const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const Account = require('../controllers/accountController');
const client = new OAuth2Client();


router.get('/tokenverify/:token', async (req, res) => {
  const result = await verify(req.token);

  if (result == 404)
  {
    res.json({response_code: 200, data: 'create_account'})
  }
  else if (result == 206 )
  {
    res.json({response_code: 200, data: 'fuse_account'})
  }
  else if (result == 200)
  {
    res.json({response_code: 200, data: 'login_ok'})
  }
  else
  {
    res.json({response_code: 500, data: {}})
  }

});

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "887270428298-qfflgl199gh8crne8jqlvfkimoqceiqd.apps.googleusercontent.com",  // Specify the WEB_CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  // This ID is unique to each Google Account, making it suitable for use as a primary key
  // during account lookup. Email is not a good choice because it can be changed by the user.
  const userid = payload.sub;
  const email = payload.email;

  const name = payload.given_name;
  const last_name = payload.family_name;

  //do look up of the user if not present create it
  const account = await Account.get_account(userid, email);
  if(account == undefined)
  {
    //ask for password and user name
    return 404;
  }
  else{
    const id = account.google_id
    if(id == undefined)
    {
      return 206
    }
    else
    {
      return 200
    }
  }
  
}


module.exports = router;