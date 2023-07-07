import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    movies:movieSlice,
    user: userSlice,
    notification: notificationSlice
  },
});

export default store;
