/** @format */

import React from "react";
import HeroBanner from "../../components/HeroBanner";
import Trending from "../../components/Trending";

const Home = () => {
  return (
    <section className='home_page'>
      <HeroBanner />
      <Trending />
    </section>
  );
};

export default Home;
