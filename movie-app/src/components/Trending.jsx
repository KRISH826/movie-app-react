/** @format */

import React, { useState } from "react";
import Container from "./Container";
import SwitchTabs from "./SwitchTabs";
import useFetch from "../hooks/useFetch";

const Trending = () => {
  const [endpoint, setendpoint] = useState("day");
  const { data, loading } = useFetch(`trending/all/${endpoint}`);
  console.log(data);
  const tabOnChange = (tab) => {
    setendpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <section className='carouselSection'>
      <Container>
        <div className='carousel_sec'>
          <span className='carouselTitle'>Trending</span>
          <SwitchTabs data={["Day", "Week"]} tabOnChange={tabOnChange} />
        </div>
      </Container>
    </section>
  );
};

export default Trending;
