/** @format */
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import BannerDetails from "./BannerDetails";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`${mediaType}/${id}/videos`);
  const { data: credits, loading: loadingCredits } = useFetch(
    `${mediaType}/${id}/credits`
  );

  return (
    <div>
      <BannerDetails video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  );
};

export default Details;
