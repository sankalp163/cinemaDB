import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import axios from "../axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const RowItem = ({ movie, isLargeRow = false, index }) => {
  const [moreClicked, setMoreClicked] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original/";

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div
      className={`rowitem ${isLargeRow && "large"}`}
      // style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          key={movie.id}
          src={`${base_url}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt={movie.name}
        ></img>
      </Link>
      <div className="rowitem_name">{movie?.title}</div>
      {!isLargeRow && (
        <div className="more_button">
          <div className="rowitem-rating">
            <MovieFilterIcon /> <span>{movie.vote_average}</span>
          </div>
          {truncate(movie?.overview, 100)}
        </div>
      )}
    </div>
  );
};

export default RowItem;
