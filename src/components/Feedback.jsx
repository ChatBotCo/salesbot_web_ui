import {useAvatar} from "../hooks/useAvatar.jsx";
import {FaAngry, FaBullhorn, FaCog, FaFrown, FaGrimace, FaLaughBeam, FaMeh, FaSmile, FaSurprise} from "react-icons/fa";
import {useState, useEffect, useRef} from "react";
import {useChat} from "../hooks/useChat.jsx";

export const Feedback = () => {
  const {
    selectedAvatar,
  } = useAvatar()

  const {
    backendUrl,
    conversationId,
  } = useChat();

  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [waiting, setWaiting] = useState(false)
  const input = useRef();

  const resetForm = () =>{
    setShowFeedbackForm(false)
    setSelectedEmotions([])
    setWaiting(false)
    input.current.value = ''
  }
  const sendFeedback = async () => {
    const hasData = selectedEmotions.length>0 || (input.current && input.current.value.trim() !== '')
    if (!waiting && hasData) {
      setWaiting(true);
      const body = JSON.stringify({
        text: input.current.value,
        emotions: selectedEmotions,
      })
      fetch(`${backendUrl}/api/submit_feedback?convoid=${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      })
        .finally(resetForm)
    } else {
      resetForm()
    }
  };


  const toggleEmotion = emotion => {
    setSelectedEmotions(() => {
      if (selectedEmotions.includes(emotion)) {
        // If the emotion is already selected, remove it
        return selectedEmotions.filter(e => e !== emotion);
      } else {
        // If the emotion is not selected, add it
        return [...selectedEmotions, emotion];
      }
    });
  };


  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        resetForm()
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const emotions = [
    {icon: <FaLaughBeam/>, label: 'Wonderful'},
    {icon: <FaSmile/>, label: 'Fun'},
    {icon: <FaSurprise/>, label: 'Surprising'},
    {icon: <FaMeh/>, label: 'Boring'},
    {icon: <FaGrimace/>, label: 'Cringy'},
    {icon: <FaFrown/>, label: 'Upsetting'},
    {icon: <FaAngry/>, label: 'Offensive'},
  ]

  return (
    <>
      <div
        className='fixed top-1 md:top-auto md:bottom-1 right-1 md:right-auto md:left-1 z-10
      flex flex-row justify-start items-center
      md:hover:bg-blue-500 text-blue-800 bg-white pt-0 pb-0 pl-2 pr-2 border-2 border-blue-500 rounded
      cursor-pointer select-none'
        onClick={() => setShowFeedbackForm(!showFeedbackForm)}
      >
        <FaBullhorn className='text-2xl'/>
        <span className='text-xl ml-2'>Feedback</span>
      </div>
      {
        showFeedbackForm && (
          <div
            className='fixed top-0 left-0 h-full w-full flex flex-row justify-center items-center bg-white bg-opacity-80 z-20 pt-8 pl-1 md:pl-8'
          >
              {waiting && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 select-none">
                  <FaCog className="animate-spin" style={{ fontSize: '24px' }} />
                </div>
              )}
              <div className='flex flex-col justify-start items-center
              bg-amber-100 border-double border-2 border-blue-500 p-4
              max-w-xs md:max-w-lg
              '>
                <div className=''>How are you enjoying your conversation with {selectedAvatar && selectedAvatar.name}?</div>
                <div className='flex flex-row flex-wrap justify-around items-start w-full'>
                  {
                    emotions.map((emotion, i) =>(
                      <div key={emotion.label} className={`flex flex-row items-center
                      grow
                      m-0.5 pl-1 pr-1
                      rounded border-blue-500 border-2
                      hover:cursor-pointer
                      ${selectedEmotions.includes(emotion.label) ? 'bg-blue-500 text-white' : 'bg-blue-100'}
                      select-none
                      `}
                           onClick={()=>toggleEmotion(emotion.label)}
                      >
                        {emotion.icon}
                        <span className='ml-2'>{emotion.label}</span>
                      </div>
                    ))
                  }
                </div>
                <input
                  type="text"
                  placeholder="Anything else you'd like to tell us?"
                  className="p-2 m-2 border-2 border-gray-300 rounded w-full"
                  ref={input}
                />
                <div className='flex flex-row justify-center items-center w-full'>
                  <button
                    onClick={sendFeedback}
                    className='
                      grow
                      text-white bg-blue-500 shadow-lg shadow-blue-700 rounded
                      pt-2 pb-2 m-2 text-xl'
                  >
                    Submit
                  </button>
                  <button
                    onClick={resetForm}
                    className='
                      grow
                      text-blue-500 bg-white border-2 border-blue-500 rounded
                      pt-2 pb-2 m-2 text-xl'
                  >
                    Cancel
                  </button>
                </div>
              </div>
          </div>
        )
      }
    </>
  )
};
