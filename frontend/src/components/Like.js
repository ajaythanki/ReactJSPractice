import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
const Like = ({ liked, onClick }) => {
  const user = useSelector((state) => state.user);

  // console.log(liked)

  return (
    <span className="text-2xl">
      {user?.token ? (
        !liked ? (
          <FaRegHeart onClick={onClick} style={{ cursor: "pointer" }} />
        ) : (
          <FaHeart onClick={onClick} style={{ cursor: "pointer" }} />
        )
      ) : !liked ? (
        <FaRegHeart onClick={onClick} style={{ cursor: "pointer" }} />
      ) : (
        <FaHeart onClick={onClick} style={{ cursor: "pointer" }} />
      )}
    </span>
  );
};

export default Like;