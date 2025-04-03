import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaultImage from "../../assets/images/default-movie.jpg";
import "./poster.scss";
type PosterProps = {
  Poster?: string;
  Title?: string;
  loading?: boolean;
};

export const CustomPoster = (props: PosterProps) => {
  const { Poster, Title, loading } = props;
  if ((loading && !Poster) || !Poster) {
    return <div className="skeleton_poster"></div>;
  }
  return (
    <LazyLoadImage
      className="custom_poster"
      src={Poster}
      alt={Title}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = defaultImage;
      }}
    />
  );
};
