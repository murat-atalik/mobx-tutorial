import { useCallback, useMemo, useState } from "react";
import { eOMDBType, searchMovies, SearchOptionsType } from "../network";
import { generateSearchKey } from "../utils";
import { useMobxStore } from "../mobx";

export const useSearchMovie = () => {
  const { searchStore } = useMobxStore();

  const lastSearchKey = searchStore.lastSearchKey;

  const lastOptions = {
    searchTerm: "",
    ...searchStore.searchList[lastSearchKey ?? "-"]?.options,
  };
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
        searchStore.searchRequested(_options);

        try {
          const data = await searchMovies(_options);
          searchStore.searchSuccess(_options, data);
        } catch (error: Error | any) {
          searchStore.searchSuccess(_options, error);
        }
      }
    },
    [options, searchStore]
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
