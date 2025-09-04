import React from 'react';

const VideoPlayer = ({ src, title }) => {
  return (
    <div className="video-player">
      <h3>{title}</h3>
      <video controls width="100%">
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;