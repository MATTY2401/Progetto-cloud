
const express = require('express');

const dbSetup = require('./db/db-setup');
const apiRouter = require("./routes/api");

const freeChamps = require("./controllers/free_championController");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.raw({
  type: ['image/png', 'image/jpg', 'image/jpeg', 'image/*'],
  limit: '5mb'
}))

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send("home page")
});


(async() => {
  try{
  await dbSetup()
  console.log('starting cron job')
  freeChamps.startJob()
  } catch(e){
    console.log('error')
  }
})()

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

