import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SingleMoviePage from "./pages/SingleMoviePage";
import MyList from "./pages/MyList";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // UseEffect keeps track if a user is already logged in
  // to ensure that we do not have to login again and again.
  useEffect(() => {
    //onAuthStateChanged works like listener to check if user is logged in or not.
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //Logged In
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //Logged Out
        dispatch(logout());
      }
    });

    //Cleanup
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/movie/:id">
              <SingleMoviePage />
            </Route>
            <Route exact path="/myList">
              <MyList />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
