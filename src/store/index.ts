import { configureStore } from "@reduxjs/toolkit";
import { rickMortyRestApi } from "./modules/api-slice";
import charactersSliceReducer from "./modules/characters-slice";

export const store = configureStore({
  reducer: {
    [rickMortyRestApi.reducerPath]: rickMortyRestApi.reducer,

    characters: charactersSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickMortyRestApi.middleware),
});
