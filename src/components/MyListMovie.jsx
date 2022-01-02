import React, { useState } from "react";
import truncate from "./utility";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import db from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyListMovie = ({ movie }) => {
  const [click, setClick] = useState(false);
  const user = useSelector(selectUser);
  const base_url = "https://image.tmdb.org/t/p/original/";
  var watchlist = db.collection("users").doc(user.uid);

  const removeFromWatchlist = (movie) => {
    setClick(true);
    watchlist.update({
      movieList: firebase.firestore.FieldValue.arrayRemove(movie),
    });
  };
  return (
    <div to={`/movie/${movie.id}`} className="myList-movie">
      <img
        src={`${base_url}${movie?.poster_path || movie?.backdrop_path}`}
        className="myList-movie-image"
      ></img>
      <div className="myList-movie-right-col">
        <div className="myList-movie-title">{movie?.title}</div>
        <div className="myList-movie-rating">
          <MovieFilterIcon /> <span>{movie.vote_average}</span>
        </div>
        <div className="myList-movie-description">
          {truncate(movie.overview, 250)}
        </div>
        <Link className="myList-movie-link" to={`/movie/${movie.id}`}>
          <div>Go to movie page</div>
          <ArrowForwardIcon className="arrow-forward" />
        </Link>
        {!click ? (
          <div
            className="remove-from-watchlist"
            onClick={() => removeFromWatchlist(movie)}
          >
            <h3>Remove from WatchList</h3>
            <RemoveCircleOutlineIcon />
          </div>
        ) : (
          <div className="remove-from-watchlist">
            <h3>Removed !</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListMovie;
