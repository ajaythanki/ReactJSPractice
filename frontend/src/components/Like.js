import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
const Like = ({ liked, onClick, size="text-2xl" }) => {
  const user = useSelector((state) => state.user);

  // console.log(liked)

  return (
    // <span className="w-fit">
      user?.token ? (
        !liked ? (
          <FaRegHeart onClick={onClick} style={{ cursor: "pointer" }} className="hover:text-blue-400"/>
        ) : (
          <FaHeart onClick={onClick} style={{ cursor: "pointer"}} className="text-blue-400"/>
        )
      ) : !liked ? (
        <FaRegHeart onClick={onClick} style={{ cursor: "pointer" }} className="hover:text-blue-400" />
      ) : (
        <FaHeart onClick={onClick} style={{ cursor: "pointer" }} className="text-blue-400"/>
      )
    // </span>
  );
};

export default Like;