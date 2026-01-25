
const express = require('express');

const dbSetup = require('./db/db-setup');

const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

dbSetup();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send("home page")
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
