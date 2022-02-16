import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { firebaseLogin, getLoginedUser } from "../api";
import { removeCookie } from "../api/cookie";

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
  async ({ setErrorMessage }, { rejectWithValue }) => {
    try {
      const response = await getLoginedUser();

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
    imageUrl: "",
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
      removeCookie("accessToken");
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
      removeCookie("accessToken");
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
      removeCookie("accessToken");
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
