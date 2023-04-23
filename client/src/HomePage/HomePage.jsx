import React, { useState } from "react";
import "./HomePage.css";

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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">URL Shortener</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your long URL"
                  aria-label="Enter your long URL"
                  aria-describedby="button-addon2"
                  value={longUrl}
                  onChange={handleLongUrlChange}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  id="button-addon2"
                >
                  Shorten URL
                </button>
              </div>
            </form>
            {shortUrl && (
              <div className="alert alert-success" role="alert">
                <p>Here is your shortened URL:</p>
                <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
