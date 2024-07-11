const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Here you would normally check the email and password against your database.
  // For simplicity, we'll just return a dummy user object.
  res.json({ id: 1, email });
});

app.listen(3000, () => console.log('Server running on port 3000'));
