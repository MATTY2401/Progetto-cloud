
const express = require('express');
const router = express.Router();

const dbSetup = require('./db/db-setup');

const summonerRouter = require("./routes/summoners.js");
const apiRouter = require("./routes/apis.js");

dbSetup();

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRouter);
app.use('/summoner', summonerRouter);

app.get('/', (req, res) => {
  res.send("home page")
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
