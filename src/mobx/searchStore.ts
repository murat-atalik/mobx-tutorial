import { makeAutoObservable, reaction, runInAction } from "mobx";
import { AsyncTask, Dictionary, generateSearchKey } from "../utils";
import { SearchOptionsType, searchResponseType } from "../network";
import { detailStore } from "./detailStore";

export type SearchItemResponse = {
  data: AsyncTask<searchResponseType>;
  options: SearchOptionsType;
};

class SearchStore {
  searchList: Dictionary<SearchItemResponse> = {};
  lastSearchKey?: string = "";

  constructor() {
    makeAutoObservable(this);

    reaction(
      () =>
        this.lastSearchKey &&
        this.searchList[this.lastSearchKey]?.data.result?.Search,
      (lastData) => {
        if (lastData) {
          detailStore.handleSearchSuccess(lastData);
        }
      }
    );
  }

  searchRequested(options: SearchOptionsType) {
    const key = generateSearchKey(options);

    runInAction(() => {
      this.searchList[key] = {
        data: {
          error: undefined,
          isInit: true,
          isLoading: true,
          result: undefined,
        },
        options: options,
      };
      this.lastSearchKey = key;
    });
  }

  searchSuccess(options: SearchOptionsType, data: searchResponseType) {
    const key = generateSearchKey(options);

    runInAction(() => {
      this.searchList[key] = {
        data: {
          error: undefined,
          isLoading: false,
          isInit: true,
          result: data,
        },
        options: options,
      };
      this.lastSearchKey = key;
    });
  }

  searchFailed(options: SearchOptionsType, error: Error) {
    const key = generateSearchKey(options);

    runInAction(() => {
      this.searchList[key] = {
        data: {
          error: error.message,
          isLoading: false,
          isInit: true,
          result: undefined,
        },
        options: options,
      };
      this.lastSearchKey = key;
    });
  }
}

export const searchStore = new SearchStore();
