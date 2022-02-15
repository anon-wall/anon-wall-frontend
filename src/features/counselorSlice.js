import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCounselorInfo = createAsyncThunk(
  "counselor/getCounselorInfo",
  async (userId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}`,
      userId,
      {
        withCredentials: true,
      }
    );

    return data.data.counselor;
  }
);

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
  },
});
export const { deleteAvailableDates } = counselorSlice.actions;
export default counselorSlice.reducer;
