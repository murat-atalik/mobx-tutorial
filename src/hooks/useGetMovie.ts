import { useCallback } from "react";
import { getMovie } from "../network";
import { useMobxStore } from "../mobx";

export const useGetMovie = () => {
  const { detailStore } = useMobxStore();
  const fetchData = useCallback(
    async (id?: string) => {
      if (id === undefined) {
        return;
      }
      detailStore.detailRequested(id);
      getMovie(id ?? "")
        .then((data) => {
          detailStore.detailSuccess(id, data);
        })
        .catch((error) => {
          detailStore.detailFailed(id, error.message);
        });
    },
    [detailStore]
  );

  return { fetchData };
};
