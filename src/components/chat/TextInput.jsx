import {FaCog, FaPaperPlane} from 'react-icons/fa';
import {useChat} from "../../hooks/useChat.jsx";
import {FaC} from "react-icons/fa6";

export const TextInput = ({sendMessage, inputActive, inputRef}) => {
  const {
    loading,
  } = useChat();

  const chatDisabled = !inputActive || loading
  return (
    <>
      <div className="flex flex-row justify-start items-start w-full md:w-96 p-4 md:pl-0 md:pr-0">
        <input
          disabled={!inputActive}
          className="w-full h-full placeholder:text-gray-500 placeholder:italic italic focus:outline-none rounded resize-none p-1"
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
            className={`text-white bg-blue-500 rounded p-2 ml-2 ${
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

// {loading && (
//   <div className="flex h-screen w-full flex-col justify-center items-center bg-white bg-opacity-50 z-99">
//     <FaCog className="animate-spin" style={{ fontSize: '24px' }} />
//   </div>
// )}