import {FaCog, FaMicrophone, FaPaperPlane} from 'react-icons/fa';
import {useUtilities} from "../../hooks/useUtilities.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";
import {useState} from "react";

export const TextInput = ({sendMessage, inputActive, inputRef}) => {
  const {
    loading,
  } = useUtilities();

  const {
    colorBgEm,
    colorTextEm,
    colorBorder,
  } = useStyle();

  const [recording, setRecording] = useState(false)
  const [recognition, setRecognition] = useState()

  const startDictation = ()=>{
    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();
      setRecognition(recognition)
      setRecording(true)

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.lang = "en-US";
      recognition.start();


      recognition.onresult = function(e) {
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            inputRef.current.value = e.results[i][0].transcript;
            recognition.stop();
            setRecording(false)
            sendMessage()
          } else {
            if(e.results[i][0].confidence >= 0.75) {
              inputRef.current.value = e.results[i][0].transcript;
            }
          }
          inputRef.current.scrollTop = inputRef.current.scrollHeight;
        }
      };

      recognition.onerror = function(e) {
        recognition.stop();
        setRecording(false)
      }
    }
  }

  const chatDisabled = !inputActive || loading

  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const updateSubmitBtnVisiblity = () => {
    setShowSubmitBtn(inputRef && inputRef.current && inputRef.current.value)
  }

  return (
    <div className="
      flex flex-row justify-start items-start
      w-96 md:w-96
      p-2 md:pl-0 md:pr-0
      mb-2 ml-2 mr-2
    ">
      <div className="
        relative
      ">
        <button
          disabled={chatDisabled}
          onClick={startDictation}
          className={`
            absolute left-0 top-0.5
            ${colorTextEm} ${colorBgEm} rounded-lg p-2 ml-2 mt-1 
            ${chatDisabled ? "cursor-not-allowed opacity-30" : ""}
          `}
        >
          <FaMicrophone/>
        </button>
      </div>

      <input
        disabled={!inputActive}
        className={`
          w-full h-full 
          placeholder:text-gray-500 placeholder:italic italic 
          focus:outline-none rounded resize-none 
          pt-3 pb-3 pl-11 pr-10
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
        onChange={updateSubmitBtnVisiblity}
      />

      <div className="
        relative
      ">
        <button
          disabled={chatDisabled}
          hidden={!showSubmitBtn}
          onClick={sendMessage}
          className={`
            absolute right-2 top-0.5
            ${colorTextEm} ${colorBgEm} rounded-lg p-2 ml-2 mt-1 
            ${chatDisabled ? "cursor-not-allowed opacity-30" : ""}
            fade-in-out
          `}
        >
          {chatDisabled ?
            <FaCog className='h-full animate-spin'/>:
            <FaPaperPlane className='h-full'/>
          }
        </button>
      </div>
    </div>
  );

};
