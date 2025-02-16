/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className='genres'>
      {data?.map((g) => {
        return (
          <div key={g} className='genre'>
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
