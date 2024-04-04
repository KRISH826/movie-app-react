/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import SpinnerLoader from "../../components/SpinnerLoader";
import { DatafromAPi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/MovieCard";
import useFetch from "../../hooks/useFetch";

const Explore = () => {
  const [data, setData] = useState(null);
  const [num, setnum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  // const { data: genresData } = useFetch(`genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    DatafromAPi(`discover/${mediaType}`).then((res) => {
      setData(res);
      console.log(res);
      setnum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    DatafromAPi(`discover/${mediaType}?page=${num}`).then((res) => {
      if (data.results) {
        setData({
          ...data,
          results: [...data?.results, ...res?.results],
        });
      } else {
        setData(res);
      }
      setnum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setnum(1);
    fetchInitialData();
  }, [mediaType]);

  return (
    <div className='explorePage'>
      <Container>
        <div className='pageHeader'>
          <div className='pageTitle'>
            {mediaType === "tv" ? "Explore Tv Shows" : "Explore Movies"}
          </div>
        </div>
        {loading && <SpinnerLoader initial={true} />}
        {!loading &&
          (data?.results?.length > 0 ? (
            <>
              <InfiniteScroll
                next={fetchNextPageData}
                loader={<SpinnerLoader />}
                dataLength={data?.results?.length || []}
                hasMore={num <= data?.total_pages}
                className='content'>
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return false;
                  return (
                    <MovieCard data={item} key={index} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>Sorry, Results not found!</span>
          ))}
      </Container>
    </div>
  );
};

export default Explore;
