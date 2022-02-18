import axios from "../axios";
import React, { useEffect, useState, useRef } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RowItem from "./RowItem";

const Row = ({ title, fetchUrl, isLargeRow = false, id }) => {
  const [movies, setMovies] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const posterRef = useRef();

  // Handling the row slider

  const carousel = document.getElementById(id);

  const MouseWheelHandler = (dist, element) => {
    element.scrollLeft -= dist;
  };
  const handleClickLeft = () => {
    const width = window.innerWidth;
    setSlideNumber(slideNumber - 4);
    MouseWheelHandler(
      `${isLargeRow ? 4 * 0.2 * width : 4.5 * 0.22 * width}`,
      carousel
    );
  };
  const handleClickRight = () => {
    const width = window.innerWidth;
    setSlideNumber(slideNumber + 4);
    MouseWheelHandler(
      `${isLargeRow ? -4 * 0.2 * width : -4.5 * 0.2 * width}`,
      carousel
    );
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

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="circle-end"></div>
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
                <RowItem
                  movie={movie}
                  isLargeRow={isLargeRow}
                  index={movie.index}
                />
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
