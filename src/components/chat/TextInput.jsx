import {FaCog, FaPaperPlane} from 'react-icons/fa';
import {useUtilities} from "../../hooks/useUtilities.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const TextInput = ({sendMessage, inputActive, inputRef}) => {
  const {
    loading,
  } = useUtilities();

  const {
    colorBgEm,
    colorTextEm,
    colorBorder,
  } = useStyle();

  const chatDisabled = !inputActive || loading
  return (
    <>
      <div className="flex flex-row justify-start items-start w-full md:w-96 p-4 md:pl-0 md:pr-0">
        <input
          disabled={!inputActive}
          className={`
            w-full h-full 
            placeholder:text-gray-500 placeholder:italic italic 
            focus:outline-none rounded resize-none 
            p-1
            text-black
          border ${colorBorder}
          `}
          placeholder="Type your question here"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <div className="flex flex-row justify-center">
          <button
            disabled={chatDisabled}
            onClick={sendMessage}
            className={`${colorTextEm} ${colorBgEm} rounded p-2 ml-2 ${
              chatDisabled ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            {chatDisabled ?
              <FaCog className='h-full animate-spin'/>:
              <FaPaperPlane className='h-full'/>
            }
          </button>
        </div>
      </div>
    </>
  );

};
