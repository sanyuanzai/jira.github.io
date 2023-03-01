import { configureStore } from "@reduxjs/toolkit";
import projectListSlice from "screens/project-list/project-list.slice";

export const store = configureStore({
  reducer: {
    projectList: projectListSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
