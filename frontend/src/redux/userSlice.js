import { createSlice } from "@reduxjs/toolkit";

import authService from "../services/authService";
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
      const res = await authService.login({username, password});
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
        dispatch(notify(`Error: ${res.message}`, "Error"));
      }
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error.response.data.message}`, "Error"));
    }
  };
};
export const signup = (name, username, password) => {
  return async (dispatch) => {
    try {
      const res = await authService.signup({name, username, password});
      console.log(res);
      if(res.data.success){
        const  user = res.data.data;
        if(user.token) {
          console.log(res);
          dispatch(setUser(user));
          window.localStorage.setItem("loggedMovieAppUser", JSON.stringify(user));
          dispatch(initializeMovies())
        }
      }else{
        console.log(res);
        dispatch(setError(true));
        dispatch(notify(`Error: ${res.message}`, "Error"));
      }
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(setError(true));
      dispatch(notify(`Error: ${error.response.data.message}`, "Error"));
    }
  };
};