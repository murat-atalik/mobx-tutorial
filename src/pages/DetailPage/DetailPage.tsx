import React, { ReactNode, useEffect } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../hooks";
import { useGetMovie } from "../../hooks/useGetMovie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./detailPage.scss";
import image from "../../assets/backgrounds/detail.png";
import { CustomPoster } from "../../components/CustomPoster";
import { upperCaseFirstLetter } from "../../utils/upperCaseFirstLetter";
import {
  FaCalendarCheck,
  FaPenFancy,
  FaStar,
  FaTrophy,
  FaUserAlt,
} from "react-icons/fa";
import { BsCameraReelsFill } from "react-icons/bs";
import { ErrorItem } from "../../components";
import { DetailResponse } from "../../network";

type omittedDetailKeys = Omit<DetailResponse, "Ratings">;

const detailKeys: (keyof omittedDetailKeys)[] = [
  "Year",
  "Type",
  "Rated",
  "Runtime",
];

type renderDetailItemType = {
  icon: ReactNode;
  value: string | undefined;
  isLoading?: boolean;
  skeletonClass: string;
};

const renderDetailItem = (props: renderDetailItemType) => {
  const { icon, value, isLoading, skeletonClass } = props;
  if (value) {
    return (
      <div className="detail_content_body_right_item">
        {icon}
        <p>{value}</p>
      </div>
    );
  }
  if (isLoading) {
    return <div className={skeletonClass}></div>;
  }
  return null;
};

type renderConditionalTextType = {
  text: string | undefined;
};
const renderConditionalText = (props: renderConditionalTextType) => {
  const { text } = props;
  if (text) {
    return <p>{upperCaseFirstLetter(text)}</p>;
  }
  return null;
};

export const DetailPage = () => {
  const { id } = useParams();
  const { fetchData } = useGetMovie();

  const isLoading = useAppSelector(
    (state) => state.detail[id ?? "-"]?.isLoading ?? false
  );
  const isInit = useAppSelector(
    (state) => state.detail[id ?? "-"]?.isInit ?? false
  );
  const error = useAppSelector(
    (state) => state.detail[id ?? "-"]?.error ?? false
  );
  const result = useAppSelector((state) => state.detail[id ?? "-"]?.result);

  useEffect(() => {
    if (!isInit && !isLoading && !error) {
      fetchData(id);
    }
  }, [error, fetchData, id, isInit, isLoading]);

  return (
    <div className="detail">
      <div className="detail_background">
        <LazyLoadImage
          className="detail_background_image"
          alt="background"
          src={image}
        />
        <div className="detail_background_gradient" />
      </div>
      <div className="detail_content">
        {error ? (
          <ErrorItem message={error} />
        ) : (
          <>
            <div className="detail_content_header">
              <div className="detail_content_header_left">
                {result?.Title ? (
                  <>
                    <h1 className="detail_content_header_title">
                      {result?.Title}
                    </h1>
                    <div className="detail_content_header_left_bottom">
                      {detailKeys.map((key) => (
                        <React.Fragment key={key}>
                          {renderConditionalText({ text: result[key] })}
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : isLoading ? (
                  <div className="detail_content_header_skeleton_title"></div>
                ) : (
                  <></>
                )}
              </div>
              {result?.imdbRating && (
                <div className="detail_content_header_right">
                  <p>IMDb RATING</p>
                  <div className="detail_content_header_imdb_rating">
                    <FaStar
                      className="detail_content_header_imdb_rating_icon"
                      size="24px"
                    />
                    <div className="detail_content_header_imdb_rating_text">
                      <p>
                        <b>{result.imdbRating}</b>/10
                      </p>
                      <span>{result.imdbVotes}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="detail_content_body">
              <div className="detail_content_body_left">
                <CustomPoster
                  Poster={result?.Poster}
                  loading={isLoading}
                  Title={result?.Title}
                />
              </div>
              <div className="detail_content_body_right">
                {result?.Genre ? (
                  <div className="detail_content_body_right_genre">
                    {result.Genre.split(", ").map((val) => (
                      <span key={val}>{val}</span>
                    ))}
                  </div>
                ) : (
                  isLoading && (
                    <div className="detail_content_body_right_item_skeleton"></div>
                  )
                )}
                {renderDetailItem({
                  icon: (
                    <BsCameraReelsFill
                      size="20px"
                      className="detail_content_body_right_icon"
                    />
                  ),
                  value: result?.Director,
                  isLoading,
                  skeletonClass: "detail_content_body_right_item_skeleton",
                })}
                {renderDetailItem({
                  icon: (
                    <FaPenFancy
                      size="20px"
                      className="detail_content_body_right_icon"
                    />
                  ),
                  value: result?.Writer,
                  isLoading,
                  skeletonClass: "detail_content_body_right_item_skeleton",
                })}
                {renderDetailItem({
                  icon: (
                    <FaUserAlt
                      size="20px"
                      className="detail_content_body_right_icon"
                    />
                  ),
                  value: result?.Actors,
                  isLoading,
                  skeletonClass: "detail_content_body_right_item_skeleton",
                })}
                {renderDetailItem({
                  icon: (
                    <FaTrophy
                      size="20px"
                      className="detail_content_body_right_icon"
                    />
                  ),
                  value: result?.Awards,
                  isLoading,
                  skeletonClass: "detail_content_body_right_item_skeleton",
                })}
                {renderDetailItem({
                  icon: (
                    <FaCalendarCheck
                      size="20px"
                      className="detail_content_body_right_icon"
                    />
                  ),
                  value: result?.Released,
                  isLoading,
                  skeletonClass: "detail_content_body_right_item_skeleton",
                })}
                {result?.Plot ? (
                  <div className="detail_content_body_right_plot">
                    <p>{result.Plot}</p>
                  </div>
                ) : (
                  isLoading && (
                    <div className="detail_content_body_right_plot_skeleton"></div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
