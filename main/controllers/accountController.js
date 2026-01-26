require('dotenv').config();

const { auth } = require('google-auth-library');
const Account = require('../models/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Uuid = require('uuid');
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');
const client = new OAuth2Client();

// Display Summoner page for a specific Author.
exports.account_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Account detail: ${req.params.id}`);
};

// Handle Summoner create on CREATE.
exports.account_create = async (req, res, next) => {

  const req_body = req.body;
  console.log(req_body);
  const username = req_body.username;
  const email = req_body.email;
  const first_name = req_body.first_name;
  const last_name = req_body.last_name;
  const google_id = req_body.google_id;
  const password = req_body.password;

  try {
    if(!username || !email || !password)
    {
      return res.status(400).json({message: 'All fields are required'});
    }
    
    const userExist = await Account.query().findById({email: email});
    if(userExist)
    {
      return res.status(400).json({message: 'User already exists'});
    }
    
    const saltRounds = 10; 

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
          console.log('encryption failed')
          return res.status(500).json({message: 'Server Error'});
      }
      const account = await Account.query().insert({
                                          username: username,
                                          name: first_name,
                                          last_name: last_name,
                                          email: email,
                                          google_id: google_id,
                                          password: hash,
      })
    res.status(200).json({message: 'Successfuly created account'}); 
    });
  }
  catch(err){
    res.status(500).json({message: 'Server Error'});
  }
};

exports.account_login = async (req, res, next) => {
  const req_body = req.body;
  const email = req_body.email;
  const token = req_body.token;
  const password = req_body.password;

  if(token)
  {
      const result = await verify(token);

      if (result == {})
      {
        res.status(200).json({message: 'create_account'})
      }
      else if (result.google_id)
      {
        res.status(200).json({message: 'fuse_account'})
      }
      else
      { 
        const token = jwt.sign({ email: result.email, google_id: result.google_id }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({data: {message: 'login_ok', token: token} })
      }
  }
  else
  {
    try
    {
      const user = await Account.query().findById(email);
      if(!user)
      {
        return res.status(400).json({message: 'Invalid Credentials'});
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch)
      {
        return res.status(400).json({message: 'Invalid Credentials'});
      }
      const token = jwt.sign({ email: user.email, google_id: user.google_id }, process.env.JWT_SECRET, { expiresIn: '12h' });
      res.status(200).json({data: {message: 'login_ok', token: token} })
    }
    catch(err)
    {
      res.status(500).json({ message: 'Server error' });
    }
  }

}

// Handle Summoner update on PATCH.
exports.account_patch = async (req, res, next) => {
  const req_body = req.body;
  const token = req_body.token;
  var query = {}
  if(req_body.username)
  {
    query.username = req_body.username
  }
  if(req_body.password)
  {
    const passhash = await bcrypt.hash(req_body.password, 10);
    query.password = passhash;
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(query == {})
    {
      res.status(400).json({message: 'Nothing to update'});
    }
    const affectedRows = await Account.query().findById(decoded.email).patch(decoded.email,query);
    console.log(affectedRows);
    if(affectedRows == 0)
    {
      res.status(400).json({message: "User Don't exists"});
    }
    res.status(200).json({message: 'Account Updated'});
  } catch(err) {
    res.status(500).json({message: 'Server Error'});
  }


}

// Handle Summoner delete on DELETE.
exports.account_delete = async (req, res, next) => {
  const req_body = req.body;
  const token = req_body.token;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Account.query().deleteById(decoded.email);
    res.status(200).json({message: 'Account deleted'});
  } catch(err) {
    res.status(500).json({message: 'Server Error'});
  }
    
};

exports.get_account = async (email) => {
  return await Account.query().findById(email);
};

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "887270428298-qfflgl199gh8crne8jqlvfkimoqceiqd.apps.googleusercontent.com",  // Specify the WEB_CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  // This ID is unique to each Google Account, making it suitable for use as a primary key
  // during account lookup. Email is not a good choice because it can be changed by the user.
  const google_id = payload.sub;
  
  const email = payload.email;
  const name = payload.given_name;
  const last_name = payload.family_name;

  //do look up of the user if not present create it
  const account = await Account.get_account(email);
  if(account)
  {
    return {}
  }
  else{
    const id = account.google_id
    if(id)
    {
      return {email: email, google_id: undefined};
    }
    else
    {
      return {email: email, google_id: google_id, name: name, last_name: last_name};
    }
  }
  
}