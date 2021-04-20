import React from "react";
import MessageScreen from "./message";

const messages = ({ messages }) => {
  console.log(messages);
  return (
    <>
      <div>
        {messages.map((message) => {
          //   <MessageScreen message={{ message: "gerda" }} />;
          <h1>MESSAGE</h1>;
          //   <MessageScreen message={message} />;
          console.log(message);
        })}
      </div>
    </>
  );
};

export default messages;
