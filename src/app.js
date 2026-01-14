
const express = require('express');
const router = express.Router()

const summoner = require("./routes/summoners.js")

const app = express();
const port = process.env.PORT || 3000;

app.use('/summoner', summoner)

app.get('/', (req, res) => {
  res.send("home page")
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
