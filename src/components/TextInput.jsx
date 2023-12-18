import {useEffect, useRef, useState} from "react";
import { useChat } from "../hooks/useChat";
import { FaMicrophone, FaStop, FaPaperPlane, FaCog } from 'react-icons/fa';
import {SpeechTypeToggle} from "./SpeechTypeToggle.jsx";

export const TextInput = ({sendMessage, inputActive, inputRef}) => {

  return (
    <>
      <div className="flex-grow p-2 relative">
        <textarea
          disabled={!inputActive}
          className="w-full h-full placeholder:text-gray-500 placeholder:italic italic focus:outline-none rounded resize-none"
          placeholder="Type something to Keli here!"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <div className="absolute bottom-4 flex flex-row justify-center w-full">
          <button
            disabled={!inputActive}
            onClick={sendMessage}
            className={`text-white bg-blue-500 rounded pt-1 pr-4 pb-1 pl-4 flex flex-row items-center justify-center w-9/12 ${
              !inputActive ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <span className='pr-2'>Send</span>
            <FaPaperPlane/>
          </button>
        </div>
      </div>
    </>
  );

};
