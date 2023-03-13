import { createSlice } from "@reduxjs/toolkit";
import {
  resendOtp,
  userLogin,
  userOtpVerify,
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
  otpConfirmation: "",
  loginData: [],
  resendOtpMsg: "",
  loginErrMsg: "",
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

    [userRegister.fulfilled]: (state, action) => {
      console.log(action.payload.data, "fulfilled");
      // state.loading = false;
      state.otpMessage = action.payload.data;
    },
    [userRegister.rejected]: (state, action) => {
      console.log(action.payload, "rejected");
    },
    [userOtpVerify.pending]: (state) => {
      console.log("pending");
    },
    [userOtpVerify.fulfilled]: (state, action) => {
      console.log(action.payload, "otpConfirmation");
      state.otpConfirmation = action.payload;
    },
    [userOtpVerify.rejected]: (state, action) => {
      console.log(action.payload, "rejected");
    },
    [resendOtp.fulfilled]: (state, action) => {
      console.log(action.payload, "jjjjjjjjjjjj");
      state.resendOtpMsg = action.payload;
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
    [userLogin?.pending]: (state) => {
      console.log("pending");
    },
    [userLogin?.fulfilled]: (state, action) => {
      console.log(action.payload, "fulfillasdadasdeduser");
      state.loginData = action.payload;
    },
    [userLogin?.rejected]: (state, action) => {
      // console.log(action.error, "rejasasasected");
      console.log(action.message, "dsdsdsdsdsd");
      state.loginErrMsg = action.error.message;
    },
  },
});

// actionns

export default authSlice.reducer;
