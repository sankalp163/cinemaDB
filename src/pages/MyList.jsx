import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import MyListMovie from "../components/MyListMovie";

const MyList = () => {
  const user = useSelector(selectUser);
  const [watchlist, setWatchlist] = useState([]);

  // Getting our watchlist
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setWatchlist(doc.data().movieList);
        } else {
          console.log("No such document");
        }
      })
      .catch(function (err) {
        console.log("Error getting document", err);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="myList">
        <div className="myList-title">My Watchlist</div>
        <div className="myList-movies">
          {watchlist.map((movie) => {
            return <MyListMovie movie={movie} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyList;
