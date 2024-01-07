import { FaPaperPlane } from 'react-icons/fa';

export const TextInput = ({sendMessage, inputActive, inputRef}) => {

  return (
    <>
      <div className="flex flex-row justify-start items-start w-96">
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
            disabled={!inputActive}
            onClick={sendMessage}
            className={`text-white bg-blue-500 rounded p-2 ml-2 ${
              !inputActive ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <FaPaperPlane className='h-full'/>
          </button>
        </div>
      </div>
    </>
  );

};
