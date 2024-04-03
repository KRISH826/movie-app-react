/** @format */

import React from "react";
import useFetch from "../../hooks/useFetch";
import Container from "../../components/Container";
import Carousel from "../../components/Carousel";

const SimilarVidoes = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`${mediaType}/${id}/similar`);

  return (
    <section className='carouselSection'>
      <Container>
        <div className='carousel_sec'>
          <span className='carouselTitle'>Similar Videos</span>
        </div>
        <Carousel endpoint={mediaType} loading={loading} data={data?.results} />
      </Container>
    </section>
  );
};

export default SimilarVidoes;
