
const express = require('express');

const dbSetup = require('./db/db-setup');

const summonerRouter = require("./routes/summoners.js");

dbSetup();

const app = express();
const port = process.env.PORT || 3000;

app.use('/summoner', summonerRouter);

app.get('/', (req, res) => {
  res.send("home page")
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
