// server/server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis le backend Express!' });
});

// exemple POST
app.post('/api/echo', (req, res) => {
  res.json({ youSent: req.body });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
