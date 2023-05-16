import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: { data: {} },
  reducers: {
    setData(state, actions: PayloadAction<Object>) {
      state.data = actions.payload;
    },
  },
});

export default infoSlice;

export const infoActions = infoSlice.actions;
