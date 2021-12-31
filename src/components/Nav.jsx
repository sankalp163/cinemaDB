import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    // Cleanup function
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contents">
        <img
          className="nav_logo"
          onClick={() => history.push("/")}
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="logo"
        />
        <ul className={`nav_tabs ${show && "nav_tabs_disappear"}`}>
          <li className="nav_tab">Home</li>
          <li className="nav_tab">TV Shows</li>
          <li className="nav_tab">Movies</li>
          <li className="nav_tab">Search</li>
          <li className="nav_tab">My List</li>
        </ul>
        <img
          onClick={() => history.push("/profile")}
          className="nav_avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Nav;
