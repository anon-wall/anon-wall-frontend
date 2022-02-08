import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./userSlice";
import paginationReducer from "./paginationSlice";

const store = configureStore({
  reducer: { user: userReducer, pagination: paginationReducer },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      getDefaultMiddleware({ serializableCheck: false }).concat(logger);
    }

    return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
  },
});

export default store;
