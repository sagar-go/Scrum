import instanceApi from "../../api/instanceApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "userRegister/auth/register",
  async (data) => {
    console.log(data, "dddddddddddddd");
    const response = await instanceApi.post("auth/register", data);
    console.log(response, "sssssssssss");
    return response;
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
