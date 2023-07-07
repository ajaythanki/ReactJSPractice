import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  // console.log(notification.message);
  const style = {
    display: !notification.message ? "hidden" : "flex",
    padding: "10px",
    backgroundColor: notification.type === "Success" ? "#23C552" : "#F84F31",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "10px",
    width: "fit-content",
    textAlign: "center",
    margin: "0 auto",
    animation: "fadeIn 1s",
  };
  return (
    <div
      className={
        !notification.message
          ? "hidden"
          : "flex w-full z-50 justify-center fixed"
      }
      style={{ zIndex: "100" }}
    >
      <div style={style}>{notification.message}</div>
    </div>
  );
};

export default Notification;
