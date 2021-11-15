import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

export const REACT_APP_BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

type randomData = {
  data: {
    name: string;
    value: number;
  }
};

const getData = async () => {
  const raw = await axios.get(`/api/data`, { baseURL: REACT_APP_BACKEND_BASE_URL });
  return raw.data;
}

interface sample {
  timestamp_ms: number;
  value: number;
}

const saveSample = async (sample: sample | undefined) => {
  const raw = await axios.post(`/api/samples`, sample, { baseURL: REACT_APP_BACKEND_BASE_URL });
  return raw.data;
}

const listSavedSamples = async () => {
  const raw = await axios.get(`/api/samples`, { baseURL: REACT_APP_BACKEND_BASE_URL });
  return raw.data;
}

function App() {
  const [data, setData] = useState<randomData | undefined>();
  const [samples, setSamples] = useState<sample[] | undefined>();

  useEffect(() => {
    getData().then(data => setData(data));
    listSavedSamples().then(samples => setSamples(samples));

    const dataInterval = setInterval(async () => {
      setData(await getData());
    }, 3000);

    const samplesInterval = setInterval(async () => {
      setSamples(await listSavedSamples());
    }, 3000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(samplesInterval);
    }
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <h4>
          New Random Data Every 3 Seconds
        </h4>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
        <button disabled={data === undefined} onClick={() => {
          if (data !== undefined) {
            saveSample({
              timestamp_ms: Date.now(),
              value: data.data.value,
            })
            .then(res => {
              console.log(res);
              listSavedSamples().then(samples => setSamples(samples));
            })
            .catch(console.error)
          }
        }}>
          Save Sample
        </button>
        <p>Saved Samples:</p>
        <pre>
          {JSON.stringify(samples?.sort((a, b) => b.timestamp_ms - a.timestamp_ms), null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
