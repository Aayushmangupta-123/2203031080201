import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/data').then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>URL Statistics</h2>
      <ul>
        {Object.entries(data).map(([code, entry]) => (
          <li key={code}>
            <strong>{code}</strong>: {entry.longUrl} → {entry.clicks} clicks
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;
