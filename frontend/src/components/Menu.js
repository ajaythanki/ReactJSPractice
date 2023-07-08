import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaSistrix } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/movieSlice";
import { clearUser } from "../redux/userSlice";
import { notify } from "../redux/notificationSlice";
import { useField } from "../hooks";
import { useState } from "react";
function Menu() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const query = useField("text");
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
    dispatch(notify("Logged out successfully...", "Success"));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (query.value) {
      navigate(`/search/${query.value}`);
    }
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-600 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:flex lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            to={"/"}
          >
            MovieApp
          </Link>
          <form
          className="flex md:absolute sm:right-1/2 justify-between items-center bg-white rounded transition-all w-24 sm:w-40 md:60"
          onSubmit={onSubmitHandler}
        >
          <input
            className="p-2 w-full outline-none rounded-full"
            placeholder="Search"
            aria-label="Search"
            {...query}
          />

          <button type="submit"><FaSistrix className="text-3xl pr-2 text-blue-600"/></button>
        </form>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FaBars />
          </button>
        
        </div>
        <div
          className={
            "lg:flex items-center" + (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to={"/"}
                onClick={() => dispatch(setSearchQuery(""))}
              >
                Home
              </Link>
            </li>

            {!user ? (
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to={"/login"}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;