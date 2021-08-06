import React, { useState } from "react";
import netflixLogo from "../assets/netflixLogo.png";
import SignUpScreen from "./SignUpScreen";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <img className="loginScreen_logo" src={netflixLogo} alt="logo" />
        <button className="loginScreen_button" onClick="">
          Sign In
        </button>
        <div className="loginScreen_gradient" />
      </div>
      <div className="loginScreen_body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginScreen_input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button className="loginScreen_getStarted">GET STARTED</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
