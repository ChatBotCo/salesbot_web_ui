import {FaArrowRight, FaArrowLeft, FaUsers, FaComment} from "react-icons/fa";
import {useAvatar} from "../../hooks/useAvatar.jsx";
import {useRef, useState} from "react";
import {Name} from "./Name.jsx";
import {Age} from "./Age.jsx";
import {useNavigate} from "react-router-dom";
import {Hobbies} from "./Hobbies.jsx";
import {useChat} from "../../hooks/useChat.jsx";

export const IntakeFormPage = () => {
  const {
    selectedAvatar,
    resetAvatar,
  } = useAvatar();

  const {
    backendUrl,
    setConversationId,
  } = useChat();

  const navigate = useNavigate();

  const input = useRef();
  const inputHobby = useRef();

  const [name, setName] = useState()
  const [birthYear, setBirthYear] = useState()
  const [curItemIndex, setCurItemIndex] = useState(0)
  const [userHobbies, setUserHobbies] = useState([])
  const [customUserHobbies, setCustomUserHobbies] = useState([])

  const speech = [
    `Hi, I'm ${selectedAvatar && selectedAvatar.name}! Before we start chatting I'd like to know a little about you.`,
    'What is your name or what would you like me to call you?',
    'What year were you born?',
    'What hobbies do you enjoy?',
  ]

  const addCustomUserHobby = () => {
    const hobby = inputHobby.current.value
    inputHobby.current.value = ''
    setCustomUserHobbies([...customUserHobbies, hobby]);
    setUserHobbies([...userHobbies, hobby]);
  };

  const addHobby = hobby => {
    setUserHobbies([...userHobbies, hobby]);
  };

  const removeHobby = hobby => {
    setUserHobbies(userHobbies.filter(h => h !== hobby));
  };

  const items = [
    <></>,
    <Name input={input}/>,
    <Age birthYear={birthYear} setBirthYear={setBirthYear}/>,
    <Hobbies
      input={inputHobby}
      addHobby={addHobby}
      removeHobby={removeHobby}
      addCustomUserHobby={addCustomUserHobby}
      customUserHobbies={customUserHobbies}
      selectedHobbies={userHobbies}
    />,
  ]

  const backToAvatarSelection = ()=>{
    resetAvatar()
    navigate("/avatars")
  }

  const onPrev = ()=>{
    setCurItemIndex(Math.max(curItemIndex-1, 0))
  }
  const onNext = ()=>{
    switch (curItemIndex) {
      case 1:
        setName(input.current.value)
        break;
    }
    setCurItemIndex(Math.min(curItemIndex+1, items.length-1))
  }

  const onStartChatting = ()=>{
    const body = JSON.stringify({
      user_name:  name,
      user_birth_year: birthYear,
      user_hobbies: userHobbies
    })
    fetch(`${backendUrl}/api/create_conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then(r1 => r1.json())
      .then(r2 => {
        const _conversationId = r2.id
        setConversationId(_conversationId)
        navigate('/chat')
      })
      .catch(e=>{
        console.trace(e)
      })
  }

  const avatarImg = selectedAvatar ? (<img
    className={`max-w-[40vw] md:max-w-[10vw] rounded-2xl m-1 pointer-events-none border-4 border-blue-400`}
    src={`img/${selectedAvatar.id}.png`}
    alt={selectedAvatar.id}
  />) : <span/>

  return (
    <div className="h-screen overflow-y-scroll flex flex-col justify-start items-center pt-20">
      <div
        className='flex flex-row justify-start items-center md:fixed top-1 left-1 text-amber-100 border-yellow-300 border-2 bg-blue-500 rounded-l cursor-pointer p-1'
        onClick={backToAvatarSelection}
      >
        <FaArrowLeft/>
        <span className='mr-2 ml-2'>Back to Avatar Selection</span>
        <FaUsers/>
      </div>
      {avatarImg}
      <div className='bg-white rounded-2xl bg-opacity-80 p-3 m-3'>{speech[curItemIndex]}</div>
      {items[curItemIndex]}
      <div className='flex flex-row justify-center fixed bottom-1'>
        <button
          className={`text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1 ${curItemIndex<=1 && 'opacity-30'}`}
          onClick={onPrev}
          disabled={curItemIndex<=1}
        >
          <div className="flex flex-row items-center"><FaArrowLeft/> Prev</div>
        </button>
        {
          curItemIndex>=(items.length-1) ?
          (<button
            className={`text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1`}
            onClick={onStartChatting}
          >
            <div className="flex flex-row items-center">Start chatting <FaComment/></div>
          </button>) :
          (<button
            className={`text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1`}
            onClick={onNext}
          >
            <div className="flex flex-row items-center">Next <FaArrowRight/></div>
          </button>)
        }
      </div>
    </div>
  );

};
