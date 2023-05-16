import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import tblSlice from "./tblSlice";
import infoSlice from "./infoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tbl: tblSlice.reducer,
    info: infoSlice.reducer,
  },
});
