import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const prevButton = createAsyncThunk(
  "pagination/prevButton",
  async ({ page, size }) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
      {
        params: { page, size },
        withCredentials: true,
      }
    );

    return data;
  }
);

export const nextButton = createAsyncThunk(
  "pagination/nextButton",
  async ({ page, size }) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
      {
        params: { page, size },
        withCredentials: true,
      }
    );

    return data;
  }
);

const initialState = {
  fetching: "",
  error: null,
  page: 0,
  size: 6,
  hasPrevPage: false,
  hasNextPage: true,
  pageCounsels: [],
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  extraReducers: {
    [prevButton.pending]: (state) => {
      state.fetching = "pending";
    },
    [prevButton.fulfilled]: (state, action) => {
      const { hasPrevPage, hasNextPage, pageCounsels } = action.payload.data;

      state.page -= 1;
      state.fetching = "success";
      state.hasPrevPage = hasPrevPage;
      state.hasNextPage = hasNextPage;
      state.pageCounsels = pageCounsels;
    },
    [prevButton.rejected]: (state, action) => {
      state.fetching = "failed";
      state.error = action.error.message;
    },
    [nextButton.pending]: (state) => {
      state.fetching = "pending";
    },
    [nextButton.fulfilled]: (state, action) => {
      const { hasPrevPage, hasNextPage, pageCounsels } = action.payload.data;

      state.page += 1;
      state.fetching = "success";
      state.hasPrevPage = hasPrevPage;
      state.hasNextPage = hasNextPage;
      state.pageCounsels = pageCounsels;
    },
    [nextButton.rejected]: (state, action) => {
      state.fetching = "failed";
      state.error = action.error.message;
    },
  },
});

export default paginationSlice.reducer;
