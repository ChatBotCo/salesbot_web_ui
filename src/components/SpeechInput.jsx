import {FaMicrophone, FaStop} from 'react-icons/fa';
import {useState} from "react";

export const SpeechInput = ({sendMessage, inputActive, inputRef}) => {

  const [recording, setRecording] = useState(false)
  const [recognition, setRecognition] = useState()

  const stopDictation = () => {
    recognition.stop()
    // setRecording(false)
    // sendMessage()
  }
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
          inputRef.current.scrollLeft = inputRef.current.scrollWidth;
        }
      };

      recognition.onerror = function(e) {
        recognition.stop();
        setRecording(false)
      }
    }
  }

  const recordingFunc = (recording) ? stopDictation : startDictation
  const recordingEl = (recording) ? <FaStop/> : <FaMicrophone/>

  return (
    <>
      <div className="flex-grow pt-2 pr-2 pl-2 relative md:ml-6 md:mr-1">
        <textarea
          disabled={true}
          className="w-full h-full placeholder:text-gray-500 placeholder:italic italic focus:outline-none rounded resize-none p-1"
          placeholder=""
          ref={inputRef}
        />

        <div className="absolute bottom-4 flex flex-row justify-center w-full">
          <button
            disabled={!inputActive}
            onClick={recordingFunc}
            className={`text-white bg-blue-500 rounded pt-1 pr-4 pb-1 pl-4 flex flex-row items-center justify-center w-9/12 ${
              !inputActive ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <span className='pr-2'>Press Here to Speak</span>
            {recordingEl}
          </button>
        </div>
      </div>
    </>
  );

};
