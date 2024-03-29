import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { setError } from "../redux/movieSlice";
import { notify, setMessage } from "../redux/notificationSlice";
import { Link, useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { FaCircleUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";

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
      window.location.reload();
      dispatch(notify("Logged In Successfully...", "Success"));
      navigate(-1);
    } catch (exception) {
      dispatch(setError(true));
      dispatch(setMessage("wrong credentials"));
    }
    if (user) {
      username.value = "";
      password.value = "";
    }
  };

  return (
    <div className="container mt-52 mx-auto text-2xl text-white">
      <div className="flex flex-col w-fit mx-auto items-center gap-5 mt-5 p-10 backdrop-blur-xl">
        <h1 className="flex items-center gap-2 font-semibold text-4xl">
          <FaCircleUser />
          Login
        </h1>
        <hr className="text-black w-full h-1" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
          <div className="flex">
            {/* <label htmlFor="username" className="w-[110px] mr-4">Username</label> */}
            <input
              className="text-black outline-none rounded-md px-3 py-2"
              id="username"
              placeholder="Username"
              required
              {...username}
            />
          </div>
          <div className="flex">
            {/* <label htmlFor="password" className="w-[110px] mr-4">Password</label> */}
            <input
              className="text-black outline-none rounded-md px-3 py-2"
              id="password"
              placeholder="Password"
              required
              {...password}
            />
          </div>
          <div className="flex w-full gap-2">
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-400 text-white transition-all duration-300 rounded-md w-1/2 p-2 font-medium"
              >
              Login
              <span className="text-3xl">
                <BiLogIn />
              </span>
            </button>
            <Link
              to={"/signup"}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-400 text-white transition-all duration-300 rounded-md w-1/2 p-2 font-medium"
            >
              Sign Up
              <span className="text-3xl">
                <AiOutlineUserAdd />
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
