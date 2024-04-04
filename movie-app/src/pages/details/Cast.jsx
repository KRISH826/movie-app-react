/** @format */

import React from "react";
import profileFallBack from "../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import Container from "../../components/Container";
import LazyImage from "../../components/LazyImage";
import { Swiper, SwiperSlide } from "swiper/react";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const skeleton = () => {
    return (
      <div className='skItem'>
        <div className='circle skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    );
  };
  return (
    <div className='castSection'>
      <Container>
        {!loading ? (
          <>
            <div className='listItems'>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 1,
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
                    slidesPerView: 5.3,
                    spaceBetween: 10,
                  },
                }}
                className='mySwiper'>
                {data?.map((item) => {
                  let imgUrl = item.profile_path
                    ? url.profile + item.profile_path
                    : profileFallBack;
                  return (
                    <SwiperSlide className='listItem' key={item.id}>
                      <div className='profileImg'>
                        <LazyImage background={imgUrl} />
                      </div>
                      <div className='name'>{item.name}</div>
                      <div className='character'>{item.character}</div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {/* {data?.map((item) => {
                let imgUrl = item.profile_path
                  ? url.profile + item.profile_path
                  : profileFallBack;
                return (
                  <div key={item.id} className='listItem'>
                    <div className='profileImg'>
                      <LazyImage background={imgUrl} />
                    </div>
                    <div className='name'>{item.name}</div>
                    <div className='character'>{item.character}</div>
                  </div>
                );
              })} */}
            </div>
          </>
        ) : (
          <>
            <div className='castSkeleton'>
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Cast;
