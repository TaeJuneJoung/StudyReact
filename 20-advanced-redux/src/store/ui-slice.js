import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { visiable: false, notification: null },
  reducers: {
    toggle(state) {
      state.visiable = !state.visiable;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
