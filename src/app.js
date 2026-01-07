const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is data from the API' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});