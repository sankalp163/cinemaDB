import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../components/Nav";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile-image"
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <p>Renewal date: 01/01/2021</p>
              <div className="plans">
                <div className="plan">
                  <div className="plan-name">
                    <h5>Standard</h5>
                    <h6>1080p</h6>
                  </div>
                  <button className="plan-button">Subscribe</button>
                </div>
                <div className="plan">
                  <div className="plan-name">
                    <h5>Basic</h5>
                    <h6>480p</h6>
                  </div>
                  <button className="plan-button">Subscribe</button>
                </div>
                <div className="plan">
                  <div className="plan-name">
                    <h5>Premium</h5>
                    <h6>4K+ HDR</h6>
                  </div>
                  <button className="plan-button">Subscribe</button>
                </div>
              </div>
              <button
                onClick={() => auth.signOut()}
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
