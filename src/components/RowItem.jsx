import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import axios from "../axios";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const API_KEY = "0a483415feaf1eb0f9d53ff65ec5732c";

const RowItem = ({ movie, isLargeRow = false, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const fetchTrailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=0a483415feaf1eb0f9d53ff65ec5732c&language=en-US`;
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  useEffect(() => {
    const fetchTrailerData = async () => {
      const request = await axios.get(fetchTrailerUrl);
      setHoveredMovie(request.data.results);
      return request;
    };

    fetchTrailerData();
  }, []);

  return (
    <div
      className="rowitem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
        key={movie.id}
        src={`${base_url}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.name}
      />
      {isHovered && (
        <>
          <video src={trailer} autoplay={true} loop />
          <div className="poster_info">
            <div className="poster_icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpAltIcon className="icon" />
              <ThumbDownAltIcon className="icon" />
            </div>
            <div className="poster_info_top">
              <span>{movie.title || movie.name}</span>
              <span>IMDb Rating: {movie.vote_average}</span>
            </div>
            <div className="poster_desc">{movie.overview}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default RowItem;
