/** @format */

import React, { useState } from "react";
import Container from "./Container";
import SwitchTabs from "./SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./Carousel";

const Popular = () => {
  const [endpoint, setendpoint] = useState("movie");
  const { data, loading } = useFetch(`${endpoint}/popular`);
  const tabOnChange = (tab) => {
    setendpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <section className='carouselSection'>
      <Container>
        <div className='carousel_sec'>
          {endpoint === "movie" ? (
            <span className='carouselTitle'>Popular Movies</span>
          ) : (
            <span className='carouselTitle'>Popular Tv Shows</span>
          )}

          <SwitchTabs data={["Movies", "Tv Shows"]} tabOnChange={tabOnChange} />
        </div>
        <Carousel endpoint={endpoint} data={data?.results} loading={loading} />
      </Container>
    </section>
  );
};

export default Popular;
