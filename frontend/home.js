import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');

  const handleShorten = async () => {
    try {
      const res = await axios.post('http://localhost:5000/shorten', { longUrl: url });
      setShort(res.data.shortUrl);
    } catch (err) {
      setShort('Error shortening URL');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple URL Shortener</h2>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Enter long URL"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleShorten}>Shorten</button>
      <p>{short}</p>
    </div>
  );
}

export default Home;