import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../Requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );

      return request;
    }

    fetchData();
  }, []);

  const goToMoviePage = (movieid) => {
    const currentUrl = window.location.href;
    window.location.href = currentUrl + `movie/${movieid}`;
  };

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-dark-shade">
        <div className="banner_contents">
          <div>Welcome to</div>
          <h1 className="banner_title">
            {/* {movie?.title || movie?.name || movie?.original_name} */}
            The CinemaDB
          </h1>
          {/* <div className="banner_buttons">
            A Cinephile's 
            <button
              className="banner_button"
              onClick={() => goToMoviePage(movie.id)}
            >
              Movie Info
            </button>
            <button className="banner_button">My List</button>
          </div> */}
          <h1 className="banner_description">
            A Cinephile's one-stop destination for
            <ul className="dynamic-texts">
              <li>
                <span>MOVIE SUMMARIES</span>
              </li>
              <li>
                <span>MOVIE RATINGS</span>
              </li>
              <li>
                <span>MOVIE TRAILERS</span>
              </li>
            </ul>
            {/* {truncate(movie?.overview, 150)} */}
          </h1>
        </div>
        <div className="banner_fadeBottom" />
      </div>
    </header>
  );
};

export default Banner;
