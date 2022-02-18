import React from "react";

const Trailers = ({ videos }) => {

  return (
    <div className="trailers">
      <div className="wrapper">
        {/* <ArrowBackIosIcon className="arrow left" /> */}
        <div className="videos-container" id="abc">
          {videos?.map((video) => (
            <div className="video-container">
              <iframe
                className="video-styles"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="5"
                width="600px"
                height="400px"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          ))}
        </div>
        {/* <ArrowForwardIosIcon className="arrow right" /> */}
      </div>
    </div>
  );
};

export default Trailers;
