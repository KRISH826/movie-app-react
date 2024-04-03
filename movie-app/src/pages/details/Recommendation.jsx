/** @format */

import React from "react";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";
import Container from "../../components/Container";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  console.log(data);

  return (
    <section className='carouselSection'>
      <Container>
        <div className='carousel_sec'>
          <span className='carouselTitle'>Trending</span>
        </div>
        <Carousel endpoint={mediaType} data={data?.results} loading={loading} />
      </Container>
    </section>
  );
};

export default Recommendation;
