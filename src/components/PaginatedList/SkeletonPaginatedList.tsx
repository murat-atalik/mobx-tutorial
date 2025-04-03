import React from "react";
import "./paginatedList.scss";

export const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="skeleton-loader__card">
          <div className="skeleton-loader__thumbnail" />
          <div className="skeleton-loader__title" />
          <div className="skeleton-loader__details" />
        </div>
      ))}
    </div>
  );
};
