import React, { useState } from 'react';
import Axios from 'axios';

function HomePage() {
  const [longUrl, setLongUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/url/shorten", {
      longUrl: longUrl
    })
    .then((res) => {
      console.log(res);
      setResponse(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
    <label className="label">URL Shrinker</label>
      <form onSubmit={handleSubmit} className='form-container'>
        <label>Enter Your Long URL</label>
        <input type="text" name='longUrl' value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
        <br /><br />
        <input type="submit" value="SUBMIT" />
      </form>
      {response && (
        <div className='response-container'>
          <p>URL Code     : <a href={response.data.urlCode} target="_blank" rel="noopener noreferrer">{response.data.urlCode}</a></p>
          <p>Short URL    : <a href={response.data.shortUrl} target="_blank" rel="noopener noreferrer">{response.data.shortUrl}</a></p>
          
        </div>
      )}
    </>
  );
}

export default HomePage;

