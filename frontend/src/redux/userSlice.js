import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/loginService";
import { initializeMovies, setError } from "./movieSlice";
import { notify } from "./notificationSlice";
const initialState= {
  token:"",
  name: {},
  username: "",
}
export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setUser: (state, action) => {
      return {...action.payload};
    },
    clearUser: (state) => {
      window.localStorage.removeItem("loggedMovieAppUser");
      return {
        token:"",
        name: {},
        username: "",
      };
    }
  }
});

export const { setUser, clearUser } = loginSlice.actions;

export default loginSlice.reducer;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await loginService.login({username, password});
      console.log(res);
      if(res.data.success){
        const  user = res.data.data;
        if(user.token) {
          dispatch(setUser(user));
          window.localStorage.setItem("loggedMovieAppUser", JSON.stringify(user));
          dispatch(initializeMovies())
        }
      }else{
        dispatch(setError(true));
        dispatch(notify(`Error1: ${res.message}`, "Error"));
      }
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error2: ${error}`, "Error"));
    }
  };
};