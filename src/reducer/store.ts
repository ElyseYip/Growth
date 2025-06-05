import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "../reducer/fileUploadSlice";
import budgetPlanningReducer from "../reducer/budgetPlanningSlice";

export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
    budgetPlanning: budgetPlanningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
