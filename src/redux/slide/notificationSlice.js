import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null, // success | error | info
  visible: false
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
      state.visible = true;
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
      state.visible = false;
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export { notificationReducer }
