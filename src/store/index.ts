import { configureStore } from "@reduxjs/toolkit";
import { detailSliceReducer, searchSlicerReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    search: searchSlicerReducer,
    detail: detailSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
