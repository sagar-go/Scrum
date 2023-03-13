import instanceApi from "../../api/instanceApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "userRegister/auth/register",
  async (data) => {
    const response = await instanceApi.post("auth/register", data);
    return response;
  }
);

export const userOtpVerify = createAsyncThunk(
  "userOtpVerify/auth/otpverify",
  async ({ otp, id }) => {
    const response = await instanceApi.post("auth/otpverify/", {
      otp,
      id,
    });
    return response.data;
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp/auth/resendotp",
  async (data) => {
    const response = await instanceApi.post("auth/resendotp", data);
    return response;
  }
);

export const userLogin = createAsyncThunk(
  "userLogin/auth/login",
  async (data) => {
    // const response = await
    return (
      instanceApi
        .post("auth/login", data)
        // .then((res) => console.log(res.data, "vvvvvvvvvv"))
        .then((response) => {
          console.log(response.data, "vvvvvvvvvv");
          return response?.data;
        })
        .catch((error) => {
          console.log(error?.response?.data, "ewwerwewrrw");
          throw new Error(error?.response?.data, console.log("errrrrrrrrr"));
        })
    );

    // console.log(error.response.data, "sdsdsdsd");
    // return response.data;
  }
);
export const userRegisterName = createAsyncThunk(
  "userRegisterName/auth/",
  async (data) => {
    const response = await instanceApi.post("auth/getRole", data);
    return response.data;
  }
);
