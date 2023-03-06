import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegister,
  userRegisterName,
} from "../actions/authActions";

// sample

const initialState = {
  loading: false,
  data: [],
  names: {},
  error: "",
  otpMessage: [],
};

const authSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [userRegister.pending]: (state) => {
      state.loading = true;
      console.log("pending");
    },
    // [userRegister.fulfilled]: (state, action) => {
    //   console.log(action.payload.data.message, "fulfilled");
    //   state.loading = false;
    //   // state.message = action.payload.data.message;
    // },
    [userRegister.fulfilled]: (state, action) => {
      console.log(action.payload.data, "fulfilled");
      // state.loading = false;
      state.otpMessage = action.payload.data;
    },
    [userRegister.rejected]: (state, action) => {
      console.log(action.payload, "rejected");
    },
    [userRegisterName.pending]: (state) => {
      console.log("pending");
    },
    [userRegisterName.fulfilled]: (state, action) => {
      console.log(action.payload, "fulfilledname");
      state.names = action.payload;
    },
    [userRegisterName.rejected]: (state, action) => {
      console.log(action.payload, "rejected");
    },
    [userRegister.rejected]: (state, action) => {
      console.log(action.payload, "rejected");
    },
    [userLogin.pending]: (state) => {
      console.log("pending");
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log(action.payload, "fulfilleduser");
    },
    [userLogin.rejected]: (state, action) => {
      console.log(action.payload, "rejected");
    },
  },
});

// actionns

export default authSlice.reducer;
