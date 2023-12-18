import { FaMicrophone } from 'react-icons/fa';

export const SpeechInput = ({sendMessage, inputActive, inputRef}) => {

  return (
    <div className="flex-grow flex flex-row items-end">
      <input
        disabled={true}
        className="w-full placeholder:text-gray-500 placeholder:italic italic focus:outline-none"
        placeholder="Type a message..."
        ref={inputRef}
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
        <FaMicrophone/>
      </button>
    </div>
  );

};
