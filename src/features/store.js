import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./userSlice";
import counselorReducer from "./counselorSlice";

const store = configureStore({
  reducer: { user: userReducer, counselor: counselorReducer },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
    }

    return getDefaultMiddleware();
  },
});

export default store;
