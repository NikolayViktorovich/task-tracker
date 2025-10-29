const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/github-auth', async (req, res) => {
  try {
    const { code, client_id, client_secret, redirect_uri } = req.body;

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
        redirect_uri,
      })
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to exchange code for token',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Auth proxy server running on http://localhost:${PORT}`);
});