import { makeAutoObservable } from "mobx";
import { AsyncTask, Dictionary } from "../utils";
import { DetailResponse, SearchItemType } from "../network";

type DetailState = Partial<DetailResponse>;
type DetailStateDict = Dictionary<AsyncTask<DetailState>>;

class DetailStore {
  details: DetailStateDict = {};

  constructor() {
    makeAutoObservable(this);
  }

  detailRequested(id: string) {
    const existingData = this.details[id] || {};
    this.details[id] = {
      ...existingData,
      error: undefined,
      isInit: true,
      isLoading: true,
    };
  }

  detailSuccess(id: string, data: DetailResponse) {
    this.details[id] = {
      error: undefined,
      isInit: true,
      isLoading: false,
      result: data,
    };
  }

  detailFailed(id: string, error: string) {
    this.details[id] = {
      error,
      isInit: true,
      isLoading: false,
      result: undefined,
    };
  }

  handleSearchSuccess(searchResults: SearchItemType[]) {
    searchResults.forEach((item) => {
      const currentItem = this.details[item.imdbID] || {};
      this.details[item.imdbID] = {
        ...currentItem,
        result: { ...currentItem?.result, ...item },
      };
    });
  }
}
export const detailStore = new DetailStore();
