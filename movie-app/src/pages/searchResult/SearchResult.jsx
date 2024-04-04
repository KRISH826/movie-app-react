/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { DatafromAPi } from "../../utils/api";
import Container from "../../components/Container";
import SpinnerLoader from "../../components/SpinnerLoader";
import MovieCard from "../../components/MovieCard";

const SearchResult = () => {
  const { searchQuery } = useParams();
  const [loading, setloading] = useState(false);
  const [num, setnum] = useState(1);
  const [data, setData] = useState(null);
  const fetchInitialData = () => {
    setloading(true);
    DatafromAPi(`/search/multi?query=${searchQuery}&page=${num}`).then(
      (res) => {
        setData(res);
        console.log(res);
        setnum((prev) => prev + 1);
        setloading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    DatafromAPi(`/search/multi?query=${searchQuery}&page=${num}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setnum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    setnum(1);
    fetchInitialData();
  }, [searchQuery]);

  return (
    <div className='searchResultsPage'>
      {loading && (
        <>
          <SpinnerLoader initial={true} />
        </>
      )}
      {!loading && (
        <>
          <Container>
            {data?.results.length > 0 ? (
              <>
                <div className='pageTitle'>
                  {`Search ${data?.total_results} ${
                    data?.total_results > 1 ? "results" : "result"
                  } of ${searchQuery}`}
                </div>
                <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  hasMore={num <= data?.total_pages}
                  loader={<SpinnerLoader />}
                  next={fetchNextPageData}>
                  {data?.results?.map((item, index) => {
                    if (item.media_type === "person") return false;
                    return <MovieCard data={item} key={index} />;
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <>
                <span className='resultNotFound'>Sorry,Result Not Found</span>
              </>
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default SearchResult;
