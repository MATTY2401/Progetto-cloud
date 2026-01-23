const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const Account = require('../controllers/accountController');
const client = new OAuth2Client();


router.get('/tokenverify/:token', async (req, res) => {
    result = await verify(req.token);
});

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "887270428298-qfflgl199gh8crne8jqlvfkimoqceiqd.apps.googleusercontent.com",  // Specify the WEB_CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  // This ID is unique to each Google Account, making it suitable for use as a primary key
  // during account lookup. Email is not a good choice because it can be changed by the user.
  const userid = payload['sub'];

  //do look up of the user if not present create it
  const account = await Account.account_is_present(userid, email);
  if(account == undefined)
  {
    //create account
  }
  
}


module.exports = router;