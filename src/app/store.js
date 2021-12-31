import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "@reduxjs/toolkit/node_modules/immer";
import userReducer from "../features/userSlice";

enableMapSet();

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
