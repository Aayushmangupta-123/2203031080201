const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const urls = {}; // Store { shortcode: { longUrl, clicks } }

// POST /shorten
app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'Missing URL' });

  const code = uuidv4().slice(0, 6);
  urls[code] = { longUrl, clicks: 0 };

  res.json({ shortUrl: `http://localhost:${PORT}/${code}` });
});

// GET /:code => redirect to long URL
app.get('/:code', (req, res) => {
  const entry = urls[req.params.code];
  if (!entry) return res.status(404).send('URL not found');
  entry.clicks++;
  res.redirect(entry.longUrl);
});

// GET /data => return all short URL stats
app.get('/data', (req, res) => {
  res.json(urls);
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
