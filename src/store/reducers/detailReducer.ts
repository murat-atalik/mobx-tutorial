import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailResponse } from "../../network";
import { AsyncTask, Dictionary } from "../../utils";
import { searchSlicerActions } from "./searchReducer";

type DetailState = Partial<DetailResponse>;

type DetailStateDict = Dictionary<AsyncTask<DetailState>>;

const initialState: DetailStateDict = {};

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    detail_requested: (state, action: PayloadAction<string>) => {
      try {
        const key = action.payload;
        const data = {
          ...state[key],
          error: undefined,
          isInit: true,
          isLoading: true,
        };
        state[key] = data;
      } catch (error) {
        console.log("error", error);
      }
    },
    detail_success: (
      state,
      action: PayloadAction<{ id: string; data: DetailResponse }>
    ) => {
      try {
        const { id, data } = action.payload;
        state[id] = {
          error: undefined,
          isInit: true,
          isLoading: false,
          result: data,
        };
      } catch (error) {
        console.log("error", error);
      }
    },
    detail_failed: (
      state,
      action: PayloadAction<{ id: string; error: string }>
    ) => {
      try {
        const { id, error } = action.payload;
        state[id] = {
          error: error,
          isInit: true,
          isLoading: false,
          result: undefined,
        };
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchSlicerActions.search_success, (state, action) => {
      try {
        const { payload } = action;
        const { data } = payload;
        const { Search } = data;
        if (Search) {
          Search.forEach((item) => {
            const currentItem = state[item.imdbID] as AsyncTask<DetailState>;
            state[item.imdbID] = {
              ...currentItem,
              result: { ...currentItem?.result, ...item },
            };
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    });
  },
});

export const detailSliceActions = detailSlice.actions;
export const detailSliceReducer = detailSlice.reducer;
