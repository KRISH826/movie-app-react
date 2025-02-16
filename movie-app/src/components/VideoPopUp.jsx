/** @format */

import React from "react";
import ReactPlayer from "react-player";
import { RxCross2 } from "react-icons/rx";

const VideoPopUp = ({ setShow, show, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className='opacityLayer' onClick={hidePopup}></div>

      <div className='videoPlayer'>
        <span className='closeBtn' onClick={hidePopup}>
          <RxCross2 color='white' size='30' />
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width='100%'
          height='100%'
        />
      </div>
    </div>
  );
};

export default VideoPopUp;
