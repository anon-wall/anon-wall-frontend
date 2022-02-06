import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (loginData) => {
  // const userData = await axios.post("/api/auth/login", loginData);
  const userData = await axios.get("/data.json", loginData);

  console.log("sojung!");

  return userData;
});

const initialState = {
  isLoggedIn: null,
  errorMessage: null,
  data: {
    image: "",
    email: "",
    alarm: "",
    nickname: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoggedIn = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.data = action.payload.data;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = "failed";
      state.error = action.error;
    },
  },
});

// export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
