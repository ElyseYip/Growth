import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "../reducer/fileUploadSlice";

export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
