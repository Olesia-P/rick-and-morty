import { configureStore } from "@reduxjs/toolkit";
import { rickMortyRestApi } from "./modules/api-slice";

export const store = configureStore({
  reducer: {
    // openings: openingsReducer,
    [rickMortyRestApi.reducerPath]: rickMortyRestApi.reducer,
    // [localFakeShopApi.reducerPath]: localFakeShopApi.reducer,
    // catalog: catalogReducer,
    // mixedPurpose: mixedPurposeSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickMortyRestApi.middleware),
  //   .concat(localFakeShopApi.middleware),
});
