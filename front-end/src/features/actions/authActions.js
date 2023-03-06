import instanceApi from "../../api/instanceApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "userRegister/auth/register",
  async (data) => {
    //console.log(data, "dddddddddddddd");
    const response = await instanceApi.post("auth/register", data);
    //  console.log(response.data, "sssssssssss");
    return response;
  }
);

export const userOtpVerify = createAsyncThunk(
  "userOtpVerify/auth/otpverify",
  async ({ data, id }) => {
    console.log(data, id, "wwwwwwwww");
    const response = await instanceApi.post(`auth/otpverify${id}`, data);
    console.log(response, "bbbbbbbbb");
  }
);

export const userRegisterName = createAsyncThunk(
  "userRegisterName/auth/getRole",
  async (data) => {
    const response = await instanceApi.post("auth/getRole", data);
    console.log(response.data, "uuuuuuuuuuu");
    return response.data;
  }
);

export const userLogin = createAsyncThunk(
  "userLogin/auth/login",
  async (data) => {
    console.log(data, "wwwwwwww");
    const response = await instanceApi.post("auth/login", data);
    console.log(response.data, "login");
    return response.data;
  }
);
