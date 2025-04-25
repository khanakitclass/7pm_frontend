import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { BASE_URL } from "../../utils/baseURL";
import axiosInstance from "../../utils/axiosInstance";
import { setAlert } from "./alert.slice";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  isValidate: false
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("users/register-user", data);

      console.log(response);

      if (response.data.success) {
        dispatch(setAlert({ variant: "success", message: response.data.message }));

        localStorage.setItem("userEmail", data.email);
        return response.data.data;
      }
    } catch (error) {
      console.log(error);

      dispatch(setAlert({ variant: "error", message: error.response.data.message }))
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("users/login-user", data);

      console.log(response);

      if (response.data.success) {
        dispatch(setAlert({ variant: "success", message: response.data.message }))
        return response.data.data;
      }
    } catch (error) {
      console.log(error);

      dispatch(setAlert({ variant: "error", message: error.response.data.message }))
      return rejectWithValue(error.response.data.message)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (id, { dispatch , rejectWithValue}) => {
    try {
      const response = await axiosInstance.post("users/logout-user", { _id: id });

      console.log(response);

      if (response.data.success) {
        dispatch(setAlert({ variant: "success", message: response.data.message }))
        // return response.data.data;
      }
    } catch (error) {
      dispatch(setAlert({ variant: "error", message: error.response.data.message }))
      return rejectWithValue(error.response.data.message)
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("users/check-auth");

      console.log(response);

      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.log("ededede", error);

      return rejectWithValue("Auth Check error: " + error.response.data.message)
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("users/verify-otp-email", data);

      console.log(response);

      if (response.data.success) {
        dispatch(setAlert({ variant: "success", message: response.data.message }))
      }
    } catch (error) {
      console.log("ededede", error);
      dispatch(setAlert({ variant: "error", message: error.response.data.message }))
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
      state.isValidate = true;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isValidate = false;
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;
      state.isValidate = false;
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isValidate = false;
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
      state.isValidate = true;
    })
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;
      state.isValidate = false;
    })
  }
});

export default authSlice.reducer