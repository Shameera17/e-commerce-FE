import { configureStore } from "@reduxjs/toolkit";

import { api } from "./slices/api.slice";
import authReducer from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
