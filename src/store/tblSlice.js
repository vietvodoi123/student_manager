import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
const tblSlice = createSlice({
  name: "tbl",
  initialState: { title: "Danh sách sinh viên", path: "/Students" },
  reducers: {
    changeTbl(state, actions: PayloadAction<Object>) {
      state.title = actions.payload.title;
      state.path = actions.payload.path;
    },
  },
});

export default tblSlice;

export const tblActions = tblSlice.actions;
