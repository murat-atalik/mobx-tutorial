import { useCallback } from "react";
import { searchMovies } from "../network";
import { useMobxStore } from "../mobx";

export const useSearchChangePage = () => {
  const { searchStore } = useMobxStore();
  const key = searchStore.lastSearchKey;
  const options = searchStore.searchList[key ?? "-"]?.options;

  const changePage = useCallback(
    async (page: number) => {
      if (!options) {
        return;
      }
      const _options = { ...options, page };
      if (_options?.searchTerm?.trim().length > 0) {
        searchStore.searchRequested(_options);

        try {
          const data = await searchMovies(_options);
          searchStore.searchSuccess(_options, data);
        } catch (error: Error | any) {
          searchStore.searchFailed(error, error);
        }
      }
    },
    [options, searchStore]
  );

  return {
    changePage,
  };
};
