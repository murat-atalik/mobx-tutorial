import { useCallback } from "react";
import { getMovie } from "../network";
import { detailSliceActions } from "../store/reducers";
import { useAppDispatch } from "./storeHooks";

export const useGetMovie = () => {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async (id?: string) => {
      if (id === undefined) {
        return;
      }
      dispatch(detailSliceActions.detail_requested(id));
      getMovie(id ?? "")
        .then((data) => {
          dispatch(detailSliceActions.detail_success({ id, data }));
        })
        .catch((error) => {
          dispatch(
            detailSliceActions.detail_failed({ id, error: error.message })
          );
        });
    },
    [dispatch]
  );

  return { fetchData };
};
