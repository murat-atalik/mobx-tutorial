import { useCallback } from "react";
import { searchSlicerActions } from "../store/reducers";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { searchMovies } from "../network";
import { shallowEqual } from "react-redux";

export const useSearchChangePage = () => {
  const dispatch = useAppDispatch();
  const key = useAppSelector(
    (state) => state.search.lastSearchKey,
    shallowEqual
  );
  const options = useAppSelector(
    (state) => state.search.searchList[key ?? "-"]?.options,
    shallowEqual
  );

  const changePage = useCallback(
    async (page: number) => {
      if (!options) {
        return;
      }
      const _options = { ...options, page };
      if (_options?.searchTerm?.trim().length > 0) {
        dispatch(searchSlicerActions.search_requested(_options));

        try {
          const data = await searchMovies(_options);
          dispatch(
            searchSlicerActions.search_success({ data, options: _options })
          );
        } catch (error: Error | any) {
          dispatch(
            searchSlicerActions.search_failed({ error, options: _options })
          );
        }
      }
    },
    [dispatch, options]
  );

  return {
    changePage,
  };
};
