import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { auth } from "../api/firebase";

export const login = createAsyncThunk("user/login", async (loginData) => {
  const userData = await axios.post("/api/auth/login", loginData);

  return userData;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const userData = await axios.get("/api/auth/logout");
  await auth.signOut();

  return userData;
});

const initialState = {
  isLoggedIn: false,
  isLogging: "",
  error: null,
  data: {
    _id: "",
    imageUrl: "",
    email: "",
    notification: "",
    nickname: "",
    counselor: {
      familyTitle: "",
      shortInput: "",
      longInput: "",
      tag: [],
      validDate: [],
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.isLogging = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.isLogging = "success";
      state.data = action.payload.data;
    },
    [login.rejected]: (state, action) => {
      state.isLogging = "failed";
      state.error = action.error.message;
    },
    [logout.pending]: (state) => {
      state.isLogging = "pending";
    },
    [logout.fulfilled]: () => initialState,
    [logout.rejected]: (state, action) => {
      state.isLogging = "failed";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
