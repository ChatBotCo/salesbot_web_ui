import {useRef, useState} from "react";

export const Name = ({input}) => {

  return (
    <input
      type="text"
      placeholder="Enter your name"
      className="p-2 m-2 border-2 border-gray-300 rounded"
      ref={input}
    />
  );

};
