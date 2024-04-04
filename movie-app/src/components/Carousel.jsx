/** @format */

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PosterFallBack from "../assets/images/no-poster.png";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import LazyImage from "./LazyImage";
import dayjs from "dayjs";
import Rating from "./Rating";
import Genres from "./Genres";

const Carousel = ({ data, loading, endpoint }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const carouselRef = useRef();

  const navigation = (dir) => {
    const container = carouselRef.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className='skeletonItem'>
        <div className='posterBlock skeleton'></div>
        <div className='textBlock'>
          <div className='title skeleton'></div>
          <div className='date skeleton'></div>
        </div>
      </div>
    );
  };

  return (
    <div className='carousel'>
      <div className='carousel_part'>
        <BsFillArrowLeftCircleFill
          className='carouselLeftNav arrow'
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className='carouselRighttNav arrow'
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <>
            <div className='carouselItems' ref={carouselRef}>
              {data?.map((item) => {
                const postUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallBack;
                return (
                  <div
                    key={item.id}
                    className='carouselItem'
                    onClick={() =>
                      navigate(`/${item?.media_type || endpoint}/${item.id}`)
                    }>
                    <div className='posterBlock'>
                      <LazyImage background={postUrl} />
                      <Rating rating={item.vote_average.toFixed(1)} />
                      <Genres data={item.genre_ids} />
                    </div>
                    <div className='textBlock'>
                      <span className='title'>{item?.title || item?.name}</span>
                      <span className='date'>
                        {dayjs(item.release_date || item.first_air_date).format(
                          "MMM D, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className='loadingSkeleton'>
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
