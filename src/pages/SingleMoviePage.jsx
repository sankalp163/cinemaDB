import axios from "axios";
import firebase from "firebase";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Trailers from "../components/Trailers";
import Nav from "../components/Nav";
import Rating from "@mui/material/Rating";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { addToUserList } from "../features/userSlice";
import Footer from "../components/Footer";

const SingleMoviePage = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState();
  const [videos, setVideos] = useState([]);
  const user = useSelector(selectUser);
  const [click, setClick] = useState(false);

  const fetchUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=0a483415feaf1eb0f9d53ff65ec5732c&language=en-US`;
  const base_url = "https://image.tmdb.org/t/p/original/";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0a483415feaf1eb0f9d53ff65ec5732c&language=en-US`;

  // Setting background image of our singleMovie page
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${singleMovie?.backdrop_path}`;

  // AddToWatchlist function
  const addToWatchlist = (singleMovie) => {
    const movies = db.collection("users").doc(user.uid);

    movies.update({
      movieList: firebase.firestore.FieldValue.arrayUnion(singleMovie),
    });
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setSingleMovie(request.data);
      console.log(request.data);
      return request;
    }

    async function fetchVideoData() {
      const videoRequest = await axios.get(videoUrl);
      setVideos(videoRequest.data.results);
      console.log(videoRequest.data.results);
      return videoRequest;
    }

    fetchData();
    fetchVideoData();
  }, []);

  const verdictCalculator = (revenue, budget) => {
    if (revenue === 0 || budget === 0) {
      return <p>Stats not available</p>;
    }
    if (revenue > 4 * budget) {
      return <p>Blockbuster</p>;
    } else if (revenue > 2 * budget) {
      return <p>Super-hit</p>;
    } else if (revenue > budget) {
      return <p>Hit</p>;
    } else {
      return <p>Flop</p>;
    }
  };

  return (
    <>
      <div className="singleMovie">
        <Nav />
        <div className="singleMovie-container">
          <div className="singleMovie_fadeTop"></div>
          <div
            className="singleMovie-background"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className="cols">
              <div className="left-col">
                <img
                  className="singleMovie-image"
                  src={`${base_url}${singleMovie?.poster_path}`}
                  alt="poster"
                ></img>
              </div>

              <div className="right-col">
                <h2 className="singleMovie-heading">{singleMovie?.title}</h2>
                <div className="singleMovie-basicInfo">
                  <span className="singleMovie-rating">
                    <MovieFilterIcon /> <span>{singleMovie?.vote_average}</span>
                  </span>
                  <span className="singleMovie-date">
                    {new Date(singleMovie?.release_date).getFullYear()}
                  </span>
                </div>
                <div className="singleMovie-genres">
                  {singleMovie?.genres.map((genre) => (
                    <span className="singleMovie-genre">{genre.name}</span>
                  ))}
                </div>
                <h3>Overview</h3>
                <div className="singleMovie-description">
                  {singleMovie?.overview}
                </div>
                {/* <div className="user-rating">
              <h3>User Rating : </h3>
              <Rating
                name="simple-controlled"
                className="rating-stars"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div> */}
                <div
                  className="add-to-watchlist"
                  onClick={() => addToWatchlist(singleMovie)}
                >
                  <h3>Add To WatchList</h3>
                  <AddCircleOutline />
                </div>
                <div className="singleMovie-performance">
                  <h3>Box-Office Verdict : </h3>
                  {verdictCalculator(singleMovie?.revenue, singleMovie?.budget)}
                  {/* {click ? (
                    <ul className="performance-criteria">
                      <li>{`Blockbuster: revenue > 4 times budget`}</li>
                      <li>{`Super Hit: revenue > 2 times budget`}</li>
                      <li>{`Hit: revenue > budget`}</li>
                      <li>{`Flop: revenue < budget`}</li>
                      <ArrowDropUpIcon
                        onClick={() => setClick(!click)}
                      ></ArrowDropUpIcon>
                    </ul>
                  ) : (
                    <div onClick={() => setClick(!click)}>verdict criteria</div>
                  )} */}
                  <ul className="performance-criteria">
                    <li>{`Blockbuster: revenue > 4 times budget`}</li>
                    <li>{`Super Hit: revenue > 2 times budget`}</li>
                    <li>{`Hit: revenue > budget`}</li>
                    <li>{`Flop: revenue < budget`}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="singleMovie_fadeBottom"></div>
          <div className="singleMovie-videos">
            <h2 className="trailers-heading">Trailers and Videos</h2>
            <Trailers videos={videos} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleMoviePage;
