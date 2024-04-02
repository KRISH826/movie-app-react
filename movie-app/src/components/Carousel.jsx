/** @format */

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PosterFallBack from "../assets/images/no-poster.png";
import useFetch from "../hooks/useFetch";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Container from "./Container";
import LazyImage from "./LazyImage";
import dayjs from "dayjs";
import Rating from "./Rating";

const Carousel = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const carouselRef = useRef();

  const navigation = (dir) => {};

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
    <div className='carousel' ref={carouselRef}>
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
            <div className='carouselItems'>
              {data?.map((item) => {
                const postUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallBack;
                return (
                  <div key={item.id} className='carouselItem'>
                    <div className='posterBlock'>
                      <LazyImage background={postUrl} />
                      <Rating rating={item.vote_average.toFixed(1)} />
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
