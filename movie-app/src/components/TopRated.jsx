/** @format */

import React, { useState } from "react";
import Container from "./Container";
import SwitchTabs from "./SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./Carousel";

const TopRated = () => {
  const [endpoint, setendpoint] = useState("movie");
  const { data, loading } = useFetch(`${endpoint}/top_rated`);
  const tabOnChange = (tab) => {
    setendpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <section className='carouselSection'>
      <Container>
        <div className='carousel_sec'>
          {endpoint === "movie" ? (
            <span className='carouselTitle'>Top Rated Movies</span>
          ) : (
            <span className='carouselTitle'>Top Rated Tv Shows</span>
          )}

          <SwitchTabs data={["Movies", "Tv Shows"]} tabOnChange={tabOnChange} />
        </div>
        <Carousel data={data?.results} loading={loading} />
      </Container>
    </section>
  );
};

export default TopRated;
