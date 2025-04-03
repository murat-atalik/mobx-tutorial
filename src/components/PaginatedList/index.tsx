import React, { useCallback, useMemo } from "react";
import { MovieCard } from "../MovieCard";
import { useAppSelector } from "../../hooks";
import { shallowEqual } from "react-redux";
import { useSearchChangePage } from "../../hooks/useSearchChangePage";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { SkeletonLoader } from "./SkeletonPaginatedList";
import { ErrorItem } from "../ErrorItem";
import "./paginatedList.scss";

export const PaginatedList = () => {
  const { changePage } = useSearchChangePage();
  const searchKey = useAppSelector(
    (s) => s.search?.lastSearchKey,
    shallowEqual
  );
  const currentPage = useAppSelector(
    (s) => s.search.searchList?.[searchKey ?? "-"]?.options.page ?? 1
  );

  const movies = useAppSelector(
    (s) => s.search.searchList?.[searchKey ?? "-"]?.data.result?.Search ?? [],
    shallowEqual
  );
  const totalResults = useAppSelector(
    (s) =>
      s.search.searchList?.[searchKey ?? "-"]?.data.result?.totalResults ?? "0",
    shallowEqual
  );
  const totalPages = Math.ceil(parseInt(totalResults) / 10);

  const { error, isLoading } = useAppSelector(
    (s) => s.search.searchList?.[searchKey ?? "-"]?.data ?? {},
    shallowEqual
  );

  const handlePageChange = useCallback(
    (page: number) => {
      changePage(page);
    },
    [changePage]
  );

  const renderPageNumbers = useMemo(() => {
    if (isLoading || movies.length === 0) return [];

    let pageNumbers = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    if (currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) pageNumbers.push("...");
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }, [currentPage, totalPages, isLoading, movies.length]);

  const PaginationView = useMemo(() => {
    if (isLoading || movies.length === 0) return null;

    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="pagination__arrow"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <IoChevronBack />
            <span>Prev</span>
          </button>
        )}

        {renderPageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="pagination__ellipsis">...</span>
            ) : (
              <button
                className={`pagination__button ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {currentPage < totalPages && (
          <button
            className="pagination__arrow"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span>Next</span>
            <IoChevronForward />
          </button>
        )}
      </div>
    );
  }, [
    currentPage,
    renderPageNumbers,
    totalPages,
    handlePageChange,
    isLoading,
    movies.length,
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <ErrorItem message={error} />
      ) : (
        <>
          <div className="paginated-list__movies">
            {movies.map((item, index) => (
              <MovieCard key={item.imdbID} {...item} />
            ))}
          </div>
          {PaginationView}
        </>
      )}
    </>
  );
};
