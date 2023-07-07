import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
    clearMessage: (state) => {
      return {
        message: "",
        type: "",
      };
    },
  }
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const notify = (message,type, timeout = 3) => {
  return async (dispatch) => {
    dispatch(setMessage({message,type}));
    setTimeout(() => {
      dispatch(clearMessage());
    }, timeout * 1000);
  };
};

export default messageSlice.reducer;