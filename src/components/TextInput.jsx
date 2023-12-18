import {useEffect, useRef, useState} from "react";
import { useChat } from "../hooks/useChat";
import { FaMicrophone, FaStop, FaPaperPlane, FaCog } from 'react-icons/fa';
import {SpeechTypeToggle} from "./SpeechTypeToggle.jsx";

export const TextInput = ({sendMessage, inputActive}) => {
  const input = useRef();

  return (
    <>
      <div className="flex-grow flex flex-row items-end">
        <input
          disabled={!inputActive}
          className="w-full placeholder:text-gray-500 placeholder:italic italic focus:outline-none"
          placeholder="Type a message..."
          ref={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          disabled={!inputActive}
          onClick={sendMessage}
          className={`flex-shrink-0 text-pink-500 ${
            !inputActive ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          <FaPaperPlane/>
        </button>
      </div>
    </>
  );

};
