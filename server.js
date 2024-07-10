const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Here you should implement the authentication logic.
  // For simplicity, we are just returning a success response.

  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
