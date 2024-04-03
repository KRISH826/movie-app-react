/** @format */

import React from "react";
import profileFallBack from "../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import Container from "../../components/Container";
import LazyImage from "../../components/LazyImage";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const skeleton = () => {
    return (
      <div className='skItem'>
        <div className='circle skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    );
  };
  return (
    <div className='castSection'>
      <Container>
        {!loading ? (
          <>
            <div className='listItems'>
              {data?.map((item) => {
                let imgUrl = item.profile_path
                  ? url.profile + item.profile_path
                  : profileFallBack;
                return (
                  <div key={item.id} className='listItem'>
                    <div className='profileImg'>
                      <LazyImage background={imgUrl} />
                    </div>
                    <div className='name'>{item.name}</div>
                    <div className='character'>{item.character}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className='castSkeleton'>
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Cast;
