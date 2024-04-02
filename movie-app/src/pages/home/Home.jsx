/** @format */

import React from "react";
import HeroBanner from "../../components/HeroBanner";
import Trending from "../../components/Trending";
import Popular from "../../components/Popular";
import TopRated from "../../components/TopRated";

const Home = () => {
  return (
    <section className='home_page'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </section>
  );
};

export default Home;
