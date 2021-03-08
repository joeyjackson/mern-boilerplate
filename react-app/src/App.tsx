import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

const BASE_URL = "http://localhost:3001";

const getData = async () => {
  const raw = await axios.get(`/api/data`, { baseURL: BASE_URL });
  return raw.data;
}

function App() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    getData().then(data => setData(data));

    const interval = setInterval(async () => {
      setData(await getData());
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <h4>
          New Data Every 5 Seconds
        </h4>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      
    </div>
  );
}

export default App;
