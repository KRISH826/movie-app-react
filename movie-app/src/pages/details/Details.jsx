/** @format */
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import BannerDetails from "./BannerDetails";
import Cast from "./Cast";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`${mediaType}/${id}/videos`);
  const { data: credits, loading: loadingCredits } = useFetch(
    `${mediaType}/${id}/credits`
  );

  console.log(credits?.cast);

  return (
    <div>
      <BannerDetails video={data?.results?.[0]} crew={credits?.crew} />\
      <Cast data={credits?.cast} loading={loadingCredits} />
    </div>
  );
};

export default Details;
