import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleMoviePage = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState();
  const fetchUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=0a483415feaf1eb0f9d53ff65ec5732c&language=en-US`;
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setSingleMovie(request.data);
      console.log(request.data);
      return request;
    }

    fetchData();
  }, []);
  return (
    <div className="singleMovie-container">
      <h1 className="singleMovie-heading" style={{ color: "white" }}>
        {singleMovie?.title}
      </h1>
      <img
        className="singleMovie-image"
        src={`${base_url}${singleMovie?.poster_path}`  }
        alt="poster"
      ></img>
      <div className="singleMovie-basicInfo">
        <p className="singleMovie-rating">IMDb: {singleMovie?.vote_average}</p>
        <p className="singleMovie-date">
          {new Date(singleMovie?.release_date).getFullYear()}
        </p>
      </div>
      <div className="singleMovie-genres">
        {singleMovie?.genres.map((genre) => (
          <p className="singleMovie-genre">{genre.name}</p>
        ))}
      </div>
      <div className="singleMovie-description">{singleMovie?.overview}</div>
    </div>
  );
};

export default SingleMoviePage;
