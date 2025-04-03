import React, { useCallback, useMemo } from "react";
import { MovieCard } from "../MovieCard";
import { useSearchChangePage } from "../../hooks/useSearchChangePage";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { SkeletonLoader } from "./SkeletonPaginatedList";
import { ErrorItem } from "../ErrorItem";
import "./paginatedList.scss";
import { useMobxStore } from "../../mobx";
import { observer } from "mobx-react-lite";

export const PaginatedList = observer(() => {
  const { searchStore } = useMobxStore();
  const { changePage } = useSearchChangePage();
  const searchKey = searchStore.lastSearchKey;
  const currentPage =
    searchStore.searchList?.[searchKey ?? "-"]?.options.page ?? 1;

  const movies =
    searchStore.searchList?.[searchKey ?? "-"]?.data.result?.Search ?? [];

  const totalResults =
    searchStore.searchList?.[searchKey ?? "-"]?.data.result?.totalResults ??
    "0";
  const totalPages = Math.ceil(parseInt(totalResults) / 10);

  const { error, isLoading } =
    searchStore.searchList?.[searchKey ?? "-"]?.data ?? {};

  const handlePageChange = useCallback(
    (page: number) => {
      changePage(page);
    },
    [changePage]
  );

  const renderPageNumbers = useMemo(() => {
    if (isLoading || movies.length === 0) return [];

    const pageNumbers = [];
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);

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
});
