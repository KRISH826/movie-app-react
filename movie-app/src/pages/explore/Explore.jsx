/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import SpinnerLoader from "../../components/SpinnerLoader";
import { DatafromAPi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/MovieCard";
import useFetch from "../../hooks/useFetch";
import Select from "react-select";

const Explore = () => {
  const [data, setData] = useState(null);
  const [num, setnum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  let filters = {};

  // const { data: genresData } = useFetch(`genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    DatafromAPi(`discover/${mediaType}`, filters).then((res) => {
      setData(res);
      console.log(res);
      setnum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const sortByData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  const fetchNextPageData = () => {
    DatafromAPi(`discover/${mediaType}?page=${num}`, filters).then((res) => {
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

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    setnum(1);
    fetchInitialData();
  };

  useEffect(() => {
    filters = {};
    setnum(1);
    setData(null);
    setnum(1);
    setSortby(1);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  return (
    <div className='explorePage'>
      <Container>
        <div className='pageHeader'>
          <div className='pageTitle'>
            {mediaType === "tv" ? "Explore Tv Shows" : "Explore Movies"}
          </div>
          <div className='filters'>
            <Select
              name='sortby'
              value={sortby}
              isClearable={true}
              placeholder='Sort by'
              options={sortByData}
              onChange={onChange}
              className='react-select-container genresDD'
              classNamePrefix='react-select'
            />
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
