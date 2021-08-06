import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_social">
        <FacebookIcon className="social_icon" />
        <InstagramIcon className="social_icon" />
        <TwitterIcon className="social_icon" />
        <YouTubeIcon className="social_icon" />
      </div>
      <ul className="footer_links">
        <li className="footer_link">
          <p>Audio and Subtitles</p>
        </li>
        <li className="footer_link">
          <p>Audio Description</p>
        </li>
        <li className="footer_link">
          <p>Help Centre</p>
        </li>
        <li className="footer_link">
          <p>Gift Cards</p>
        </li>
        <li className="footer_link">
          <p>Media Centre</p>
        </li>
        <li className="footer_link">
          <p>Investor Relations</p>
        </li>
        <li className="footer_link">
          <p>Jobs</p>
        </li>
        <li className="footer_link">
          <p>Terms of Use</p>
        </li>
        <li className="footer_link">
          <p>Privacy</p>
        </li>
        <li className="footer_link">
          <p>Legal Notices</p>
        </li>
        <li className="footer_link">
          <p>Cookie Preferences</p>
        </li>
        <li className="footer_link">
          <p>Corporate Information</p>
        </li>
        <li className="footer_link">
          <p>Contact Us</p>
        </li>
      </ul>
      <a className="footer_button">Service Code</a>
      <div className="copyright">&#169; 1997-2021 Netflix, Inc.</div>
    </div>
  );
};

export default Footer;
