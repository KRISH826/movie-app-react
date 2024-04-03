/** @format */

import React, { useState } from "react";
import Container from "../../components/Container";
import LazyImage from "../../components/LazyImage";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayBtn from "../../components/PlayBtn";
import VideoPopUp from "../../components/VideoPopUp";

const OfficialVideos = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const loadingSkeleton = () => {
    return (
      <div className='skItem'>
        <div className='thumb skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    );
  };
  return (
    <div className='videosSection'>
      <Container>
        <div className='sectionHeading'>Official Videos</div>
        {!loading ? (
          <>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1.5,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                "@1.50": {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className='mySwiper2 videos'>
              {data?.results?.map((video) => (
                <SwiperSlide
                  key={video.id}
                  className='videoItem'
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}>
                  <div className='videoThumbnail'>
                    <LazyImage
                      background={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayBtn />
                  </div>
                  <div className='videoTitle'>{video.name}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <>
            <div className='videoSkeleton'>
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
            </div>
          </>
        )}
      </Container>
      <VideoPopUp
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default OfficialVideos;
