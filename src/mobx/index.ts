import { createContext, useContext } from "react";
import { searchStore } from "./searchStore";
import { detailStore } from "./detailStore";
import { injectStores } from "@mobx-devtools/tools";

class RootStore {
  detailStore = detailStore;
  searchStore = searchStore;
}

const rootStore = new RootStore();

injectStores({
  searchStore: rootStore.searchStore,
  detailStore: rootStore.detailStore,
});

const StoreContext = createContext(rootStore);

export const useMobxStore = () => useContext(StoreContext);

export default rootStore;
