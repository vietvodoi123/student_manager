import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usercurrent: null,
    isAuth: false,
  },
  reducers: {
    LOGIN(state, actions: PayloadAction<String>) {
      state.isAuth = true;
      state.usercurrent = actions.payload;
    },
    LOGOUT(state) {
      state.isAuth = false;
      state.usercurrent = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
