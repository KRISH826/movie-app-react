/** @format */

import React from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import Genres from "./Genres";
import LazyImage from "./LazyImage";
import PosterFallBack from "../assets/images/no-poster.png";

const MovieCard = ({ data, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallBack;
  return (
    <>
      <div
        className='movieCard'
        onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
        <div className='posterBlock'>
          <LazyImage className='posterImg' background={posterUrl} />
          <Rating rating={data.vote_average.toFixed(1)} />
          <Genres data={data.genre_ids.slice(0, 2)} />
        </div>
        <div className='textBlock'>
          <span className='title'>{data.title || data.name}</span>
          <span className='date'>
            {dayjs(data.release_date).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
