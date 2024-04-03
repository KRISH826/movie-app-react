/** @format */

import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import useFetch from "../../hooks/useFetch";
import LazyImage from "../../components/LazyImage";
import PosterFallback from "./../../assets/images/no-poster.png";
import Rating from "../../components/Rating";
import Genres from "../../components/Genres";
import PlayBtn from "../../components/PlayBtn";
import VideoPopUp from "../../components/VideoPopUp";

const BannerDetails = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setvideoId] = useState(null);
  const { id, mediaType } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`${mediaType}/${id}`);

  const _genres = data?.genres.map((g) => g.id);

  const director = crew?.filter((director) => director.job === "Director");
  const writer = crew?.filter(
    (writer) =>
      writer.job === "Writer" ||
      writer.job === "Screenplay" ||
      writer.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <div className='detailsBanner'>
      {!loading ? (
        <>
          {!!data && (
            <>
              <div>
                <div className='backdrop-img'>
                  <LazyImage background={url.backdrop + data?.backdrop_path} />
                </div>
                <div className='opacity-layer'></div>
                <Container>
                  <div className='content'>
                    <div className='left'>
                      {data.poster_path ? (
                        <LazyImage
                          className='posterImg'
                          background={url.backdrop + data.poster_path}
                        />
                      ) : (
                        <LazyImage
                          className='posterImg'
                          background={PosterFallback}
                        />
                      )}
                    </div>
                    <div className='right'>
                      <div className='title'>
                        {data?.name || data?.title} (
                        {dayjs(data.release_date || data.first_air_date).format(
                          "YYYY"
                        )}
                        )
                      </div>
                      <div className='subtitle'>{data.tagline}</div>
                      <Genres data={_genres} />
                      <div className='row'>
                        <Rating rating={data?.vote_average.toFixed(1)} />
                        <div
                          className='playbtn'
                          onClick={() => {
                            setShow(true);
                            setvideoId(video.key);
                          }}>
                          <PlayBtn />
                          <span className='text'>Watch Trailer</span>
                        </div>
                      </div>
                      <div className='overview'>
                        <div className='heading'>Overview</div>
                        <div className='description'>{data.overview}</div>
                      </div>
                      <div className='info'>
                        {data.status && (
                          <div className='infoItem'>
                            <span className='text bold'>Status: </span>
                            <span className='text'>{data.status}</span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className='infoItem'>
                            <span className='text bold'>Release Date: </span>
                            <span className='text'>
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className='infoItem'>
                            <span className='text bold'>Runtime: </span>
                            <span className='text'>
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className='info'>
                          <span className='text bold'>Director: </span>
                          <span className='text'>
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {writer?.length > 0 && (
                        <div className='info'>
                          <span className='text bold'>Writer: </span>
                          <span className='text'>
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {data?.created_by?.length > 0 && (
                        <>
                          <div className='info'>
                            <span className='text bold'>Creator:</span>
                            <span className='text'>
                              {data?.created_by?.map((d, i) => (
                                <span key={i}>
                                  {d.name}
                                  {data?.created_by?.length - 1 !== i && ", "}
                                </span>
                              ))}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Container>
              </div>
              <VideoPopUp
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setvideoId}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className='detailsBannerSkeleton'>
            <Container>
              <div className='left skeleton'></div>
              <div className='right'>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
              </div>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default BannerDetails;
