import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";

const store = configureStore({
  reducer: {
    authData: authReducer,
  },
});

export default store;
