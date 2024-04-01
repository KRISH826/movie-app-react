/** @format */

import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import LazyImage from "./LazyImage";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);
  const [background, setbackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("/movie/upcoming");

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const bg =
      "https://image.tmdb.org/t/p/original" +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbackground(bg);
    console.log(bg);
  }, [data]);

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backdrop-img'>
          <LazyImage background={background} />
        </div>
      )}
      <div className='opacity-layer'></div>
      <Container>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for a movie or tv show....'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
