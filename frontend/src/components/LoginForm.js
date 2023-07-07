import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { setError } from "../redux/movieSlice";
import { notify, setMessage } from "../redux/notificationSlice";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  if (user?.token) {
    console.log(user.token);
    navigate("/");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(login(username.value, password.value));
      dispatch(notify("Logged In Successfully...", "Success"));
      navigate(-1);
    } catch (exception) {
      dispatch(setError(true));
      dispatch(setMessage("wrong credentials"));
    }
    if (user) {
      username.value="";
      password.value="";
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center mt-5">
        <h1>Login</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-50 flex-column align-items-center"
        >
          <div className="form-group w-100">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              placeholder="Enter username"
              {...username}
            />
          </div>
          <div className="form-group w-100">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              placeholder="Password"
              {...password}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
