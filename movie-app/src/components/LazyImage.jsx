/** @format */

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({ background, className }) => {
  return (
    <LazyLoadImage effect='blur' className={className || ""} src={background} />
  );
};

export default LazyImage;
