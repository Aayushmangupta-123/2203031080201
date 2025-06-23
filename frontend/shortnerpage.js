import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

function ShortenerPage() {
  const [urls, setUrls] = useState([{ url: '', validity: 30, shortcode: '' }]);
  const [results, setResults] = useState([]);

  const updateInput = (index, key, value) => {
    const updated = [...urls];
    updated[index][key] = value;
    setUrls(updated);
  };

  const shortenAll = async () => {
    const res = [];
    for (let u of urls) {
      try {
        const r = await axios.post('http://localhost:5000/shorturls', u);
        res.push(r.data);
      } catch (e) {
        res.push({ error: e.response?.data?.error || 'Error' });
      }
    }
    setResults(res);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Shorten URLs</Typography>
      {urls.map((item, idx) => (
        <Box key={idx} display="flex" gap={2} mb={2}>
          <TextField label="Long URL" fullWidth value={item.url} onChange={e => updateInput(idx, 'url', e.target.value)} />
          <TextField label="Validity (mins)" type="number" value={item.validity} onChange={e => updateInput(idx, 'validity', e.target.value)} />
          <TextField label="Custom Code" value={item.shortcode} onChange={e => updateInput(idx, 'shortcode', e.target.value)} />
        </Box>
      ))}
      <Button variant="contained" onClick={shortenAll}>Shorten</Button>
      <Box mt={3}>
        {results.map((r, i) => (
          <Typography key={i}>{r.short || r.error}</Typography>
        ))}
      </Box>
    </Box>
  );
}

export default ShortenerPage;
