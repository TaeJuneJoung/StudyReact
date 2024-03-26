import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { visiable: false },
  reducers: {
    toggle(state) {
      state.visiable = !state.visiable;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
