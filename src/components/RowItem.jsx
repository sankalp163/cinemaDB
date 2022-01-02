import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import db from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import truncate from "../components/utility";

const RowItem = ({ movie, isLargeRow = false, index }) => {
  const [moreClicked, setMoreClicked] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const user = useSelector(selectUser);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    //getting list of movies in watchlist to keep track if current movie is in watchlist
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setWatchlist(doc.data());
        } else {
          console.log("No Such Document !");
        }
      })
      .catch(function (err) {
        console.log("Error getting document", err);
      });
  }, []);

  //Checking if our movie already exits in the watchlist
  const checkTitle = (obj) => obj?.title === movie?.title;
  const added = watchlist.movieList?.some(checkTitle);

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
      <div className="rowitem_name">
        <div>{movie?.title}</div>
        {added && <DoneOutlineIcon className="add" />}
      </div>
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
