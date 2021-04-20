import React from "react";

const Message = ({ message }) => {
  console.log("message2");
  return <div>{message.message}</div>;
};

export default Message;
