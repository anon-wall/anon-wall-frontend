import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInfo = createAsyncThunk("counselor/getInfo", async (userId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}`,
    userId,
    {
      withCredentials: true,
    }
  );

  return data.data.counselor;
});

export const updateAvailableDates = createAsyncThunk(
  "counselor/updateAvailableDates",
  async (payload) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${payload.userId}/counselor/availableDates`,
      payload.availableDates,
      {
        withCredentials: true,
      }
    );

    return data.data.counselor.availableDates;
  }
);

const initialState = {
  isLogging: "",
  error: null,
  data: {
    _id: "",
    familyTitle: "",
    shortInput: "",
    longInput: "",
    tag: [],
    availableDates: [],
  },
};

const counselorSlice = createSlice({
  name: "counselor",
  initialState,
  reducers: {
    deleteAvailableDates(state, actions) {
      state.data.availableDates = state.data.availableDates.filter(
        (date) => date._id !== actions.payload.id
      );
    },
  },
  extraReducers: {
    [getInfo.pending]: (state) => {
      state.isLogging = "pending";
    },
    [getInfo.fulfilled]: (state, action) => {
      state.isLogging = "success";
      state.data = action.payload;
    },
    [getInfo.rejected]: (state, action) => {
      state.isLogging = "failed";
      state.error = action.error.message;
    },
    [updateAvailableDates.pending]: (state) => {
      state.isLogging = "pending";
    },
    [updateAvailableDates.fulfilled]: (state, action) => {
      state.isLogging = "success";
      state.data.availableDates = action.payload;
    },
    [updateAvailableDates.rejected]: (state, action) => {
      state.isLogging = "failed";
      state.error = action.error.message;
    },
  },
});
export const { deleteAvailableDates } = counselorSlice.actions;
export default counselorSlice.reducer;
