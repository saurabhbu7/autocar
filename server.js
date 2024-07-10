const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST /api/login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Here you would typically check the provided email and password against your database
  // For simplicity, we're just going to accept any email/password combination
  if (email && password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log('Server started on port 5000'));
