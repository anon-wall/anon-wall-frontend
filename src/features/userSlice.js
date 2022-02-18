import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { firebaseLogin, getLoggedInUser } from "../api";
import { ACCESS_TOKEN } from "../constants/home";

export const login = createAsyncThunk(
  "user/login",
  async (setErrorMessage, { rejectWithValue }) => {
    try {
      const response = await firebaseLogin();

      return response;
    } catch (err) {
      setErrorMessage(err.message);

      return rejectWithValue(err.message);
    }
  }
);

export const getLoginUserByToken = createAsyncThunk(
  "user/getLoginUserByToken",
  async (setErrorMessage, { rejectWithValue }) => {
    try {
      const response = await getLoggedInUser();

      return response;
    } catch (err) {
      setErrorMessage(err.message);

      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  status: "",
  data: {
    _id: "",
    imageURL: "",
    email: "",
    notification: "",
    nickname: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      state.isLoggedIn = false;
      state.status = "";
      state.data = initialState.data;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.status = "success";
      state.data = action.payload;
    },
    [login.rejected]: (state) => {
      state.status = "failed";
      localStorage.removeItem(ACCESS_TOKEN);
    },
    [getLoginUserByToken.pending]: (state) => {
      state.status = "pending";
    },
    [getLoginUserByToken.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.status = "success";
      state.data = action.payload;
    },
    [getLoginUserByToken.rejected]: (state) => {
      state.status = "failed";
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
