import { useCallback, useMemo, useState } from "react";
import { searchSlicerActions } from "../store/reducers";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { eOMDBType, searchMovies, SearchOptionsType } from "../network";
import { generateSearchKey } from "../utils";
import { shallowEqual } from "react-redux";

export const useSearchMovie = () => {
  const dispatch = useAppDispatch();
  const lastSearchKey = useAppSelector(
    (state) => state.search.lastSearchKey,
    shallowEqual
  );

  const lastOptions = useAppSelector((state) => {
    const options = state.search.searchList[lastSearchKey ?? "-"]?.options;
    return { searchTerm: "", ...options } as SearchOptionsType;
  }, shallowEqual);
  const [options, setOptions] = useState<SearchOptionsType>({
    ...lastOptions,
  });

  const changeYear = useCallback(
    (year?: number) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, year };
        return newOptions;
      });
    },
    [setOptions]
  );

  const changeType = useCallback(
    (type?: eOMDBType) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, type };
        return newOptions;
      });
    },
    [setOptions]
  );

  const changeSearchTerm = useCallback(
    (searchTerm: string) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, searchTerm };
        return newOptions;
      });
    },
    [setOptions]
  );

  const handleSearch = useCallback(
    async (fields?: SearchOptionsType) => {
      const _options = { ...(fields || options), page: 1 };
      if (_options.searchTerm?.trim().length > 0) {
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

  const searchKey = useMemo(() => {
    return generateSearchKey(options);
  }, [options]);

  return {
    options,
    setOptions,
    handleSearch,
    changeSearchTerm,
    changeType,
    changeYear,
    searchKey,
    lastSearchKey,
  };
};
