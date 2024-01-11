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
      <div className="
        flex flex-row justify-start items-start
        w-96 md:w-96
        p-2 md:pl-0 md:pr-0
        mb-2 ml-2 mr-2
      ">
        <input
          disabled={!inputActive}
          className={`
            w-full h-full 
            placeholder:text-gray-500 placeholder:italic italic 
            focus:outline-none rounded resize-none 
            pt-3 pb-3 pl-2 pr-10
            text-black
            shadow-[0_20px_30px_rgba(23,73,77,0.15)]
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

        <div className="
          relative
        ">
          <button
            disabled={chatDisabled}
            onClick={sendMessage}
            className={`
              absolute right-2 top-0.5
              ${colorTextEm} ${colorBgEm} rounded-lg p-2 ml-2 mt-1 
              ${chatDisabled ? "cursor-not-allowed opacity-30" : ""}
            `}
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
