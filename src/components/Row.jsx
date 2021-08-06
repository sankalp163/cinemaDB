import axios from "../axios";
import React, { useEffect, useState, useRef } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RowItem from "./RowItem";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const posterRef = useRef();

  // Handling the row slider
  const handleClick = (direction) => {
    let distance = posterRef.current.getBoundingClientRect().x - 50;
    // console.log(distance);
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      posterRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 14) {
      setSlideNumber(slideNumber + 1);
      posterRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, []);

  // console.log(movies);

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="wrapper">
        <ArrowBackIosIcon
          className="arrow left"
          onClick={() => handleClick("left")}
          style={{ display: slideNumber == 0 && "none" }}
        />
        <div className="row_posters" ref={posterRef}>
          {movies.map(
            (movie, index) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <RowItem movie={movie} index={index} />
              )
          )}
        </div>
        <ArrowForwardIosIcon
          className="arrow right"
          onClick={() => handleClick("right")}
          style={{ display: slideNumber == movies.length - 6 && "none" }}
        />
      </div>
    </div>
  );
};

export default Row;
