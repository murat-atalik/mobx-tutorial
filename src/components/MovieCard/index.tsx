import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./movieCard.scss";
import { eOMDBType, SearchItemType } from "../../network";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaultImage from "../../assets/images/default-movie.jpg";

export const MovieCard = (props: SearchItemType) => {
  const { Poster, Title, Type, Year, imdbID } = props;

  const icon = useMemo(() => {
    switch (Type) {
      case eOMDBType.MOVIE:
        return "🎬";
      case eOMDBType.SERIES:
        return "📺";
      case eOMDBType.EPISODE:
        return "📖";
      default:
        return undefined;
    }
  }, [Type]);

  return (
    <Link to={`/detail/${imdbID}`} className="card">
      <LazyLoadImage
        className="card__image"
        src={Poster}
        alt={Title}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultImage;
        }}
      />
      <div className="card__info">
        <h2 className="card__title">
          {Title} ({Year})
        </h2>
      </div>
      {icon && <div className="card__icon">{icon}</div>}
      <div className="card__imdb">
        <div className="card__imdb__gradient" />
        {imdbID}
      </div>
    </Link>
  );
};
