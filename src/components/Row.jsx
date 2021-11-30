import axios from "../axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import RowItem from "./RowItem";

const Row = ({ title, fetchUrl, isLargeRow = false, id }) => {
  const [movies, setMovies] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const posterRef = useRef();
  const base_url = "https://image.tmdb.org/t/p/original/";

  // Handling the row slider

  const carousel = document.getElementById(id);

  const MouseWheelHandler = (dist, element) => {
    element.scrollLeft -= dist;
  };
  const handleClickLeft = () => {
    setSlideNumber(slideNumber - 5);
    MouseWheelHandler(`${isLargeRow ? 5 * 176.663 : 5 * 187.75}`, carousel);
  };
  const handleClickRight = () => {
    setSlideNumber(slideNumber + 5);
    MouseWheelHandler(`${isLargeRow ? -5 * 176.663 : -5 * 187.775}`, carousel);
  };

  const goToMoviePage = (movieid) => {
    const currentUrl = window.location.href;
    window.location.href = currentUrl + `movie/${movieid}`;
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  // console.log(movies);

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="wrapper">
        <ArrowBackIosIcon
          className="arrow left"
          onClick={() => handleClickLeft()}
          style={{ display: `${slideNumber <= 0 ? "none" : "block"}` }}
        />
        <div className="row_posters" id={id} ref={posterRef}>
          {movies.map(
            (movie, index) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  onClick={() => goToMoviePage(movie.id)}
                ></img>
              )
          )}
        </div>
        <ArrowForwardIosIcon
          className="arrow right"
          onClick={() => handleClickRight()}
          style={{ display: `${slideNumber >= 13 ? "none" : "block"}` }}
        />
      </div>
    </div>
  );
};

export default Row;
