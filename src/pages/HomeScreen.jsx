import React from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Footer from "../components/Footer";
import requests from "../Requests";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Nav />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        id="0"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row title="Trending Now" id="1" fetchUrl={requests.fetchTrending} />
      <Row title="Action Movies" id="2" fetchUrl={requests.fetchActionMovies} />
      <Row title="Top Rated" id="3" fetchUrl={requests.fetchTopRated} />
      <Row title="Comedy Movies" id="4" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" id="5" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" id="6" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" id="7" fetchUrl={requests.fetchDocumentaries} />

      <Footer />
    </div>
  );
};

export default HomeScreen;
