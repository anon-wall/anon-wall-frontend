import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCounselor,
  updateCounselorSchedule,
  updateCounselor,
} from "../api/axios";

export const getCounselorInfo = createAsyncThunk(
  "counselor/getCounselorInfo",
  async (userId) => {
    const { data } = await getCounselor(userId);

    return data.data.counselor;
  }
);

export const updateAvailableDates = createAsyncThunk(
  "counselor/updateAvailableDates",
  async (payload) => {
    const { data } = await updateCounselorSchedule(payload);

    return data.data.counselor.availableDates;
  }
);

export const updateCounselorInfo = createAsyncThunk(
  "counselor/updateCounselorInfo",
  async (payload) => {
    const { data } = await updateCounselor(payload);

    return data.data.counselor;
  }
);

const initialState = {
  status: "",
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
    [getCounselorInfo.pending]: (state) => {
      state.status = "pending";
    },
    [getCounselorInfo.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [getCounselorInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateAvailableDates.pending]: (state) => {
      state.status = "pending";
    },
    [updateAvailableDates.fulfilled]: (state, action) => {
      state.status = "success";
      state.data.availableDates = action.payload;
    },
    [updateAvailableDates.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateCounselorInfo.pending]: (state) => {
      state.status = "pending";
    },
    [updateCounselorInfo.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [updateCounselorInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export const { deleteAvailableDates } = counselorSlice.actions;
export default counselorSlice.reducer;
