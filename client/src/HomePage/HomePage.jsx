import React, { useState } from "react";
import './HomePage.css'

function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleLongUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can implement your URL shortening logic here
    // For now, we'll just set the short URL to be the same as the long URL
    setShortUrl(longUrl);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">URL Shortener</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="longUrl">Enter a long URL:</label>
              <input
                type="text"
                className="form-control"
                id="longUrl"
                value={longUrl}
                onChange={handleLongUrlChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Shorten URL
            </button>
          </form>
          {shortUrl && (
            <div className="mt-4">
              <h4>Short URL:</h4>
              <a href={shortUrl}>{shortUrl}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

