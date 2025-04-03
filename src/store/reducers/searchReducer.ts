import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncTask, Dictionary } from "../../utils";
import { SearchOptionsType, searchResponseType } from "../../network";
import { generateSearchKey } from "../../utils";

export type SearchItemResponse = {
  data: AsyncTask<searchResponseType>;
  options: SearchOptionsType;
};

export type SearchItemModelDict = {
  searchList: Dictionary<SearchItemResponse>;
  lastSearchKey?: string;
};

const initialState = {
  searchList: {},
  lastSearchKey: "",
} as SearchItemModelDict;

export const searchSlicer = createSlice({
  name: "search",
  initialState,
  reducers: {
    search_requested: (state, action: PayloadAction<SearchOptionsType>) => {
      try {
        const options = action.payload;
        const key = generateSearchKey(options);
        state.searchList[key] = {
          data: {
            error: undefined,
            isInit: true,
            isLoading: true,
            result: undefined,
          },
          options: options,
        };
        state.lastSearchKey = key;
      } catch (error) {
        console.log("error", error);
      }
    },
    search_success: (
      state,
      action: PayloadAction<{
        options: SearchOptionsType;
        data: searchResponseType;
      }>
    ) => {
      try {
        const { options, data } = action.payload;
        const key = generateSearchKey(options);

        state.searchList[key] = {
          data: {
            error: undefined,
            isLoading: false,
            isInit: true,
            result: data,
          },
          options: options,
        };
        state.lastSearchKey = key;
      } catch (error) {
        console.log("error", error);
      }
    },
    search_failed: (
      state,
      action: PayloadAction<{ options: SearchOptionsType; error: Error }>
    ) => {
      try {
        const { options, error } = action.payload;
        const key = generateSearchKey(options);

        state.searchList[key] = {
          data: {
            error: error.message,
            isInit: true,
            isLoading: false,
            result: undefined,
          },
          options: options,
        };
        state.lastSearchKey = key;
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});

export const searchSlicerReducer = searchSlicer.reducer;
export const searchSlicerActions = searchSlicer.actions;
