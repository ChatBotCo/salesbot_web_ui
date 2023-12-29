import {FaArrowRight} from "react-icons/fa";
import {useAvatar} from "../hooks/useAvatar.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {useState} from "react";

export const UserDataEntryFormPage = () => {
  const {
    backendUrl,
    setConversationId,
  } = useChat()

  const [userName, setUserName] = useState()
  const [userBirthday, setUserBirthday] = useState()
  const [userHobbies, setUserHobbies] = useState([])
  const [userInterests, setUserInterests] = useState([])
  const [hobbyInput, setHobbyInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const addHobby = () => {
    setUserHobbies([...userHobbies, hobbyInput]);
    setHobbyInput('');
  };

  const addInterest = () => {
    setUserInterests([...userInterests, interestInput]);
    setInterestInput('');
  };

  const createNewConvo = () => {
    const body = JSON.stringify({
      user_name:  userName,
      user_birthday: userBirthday,
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
        localStorage.setItem('conversationId', _conversationId)
      })
      .catch(e=>{
        console.trace(e)
      })
  }

  return (
    <div className="h-screen overflow-y-scroll flex flex-col justify-start items-center">
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="p-2 m-2 border-2 border-gray-300 rounded"
      />
      <input
        type="date"
        placeholder="Enter your birthday"
        value={userBirthday}
        onChange={(e) => setUserBirthday(e.target.value)}
        className="p-2 m-2 border-2 border-gray-300 rounded"
      />
      <div>
        <input
          type="text"
          placeholder="Enter a hobby"
          value={hobbyInput}
          onChange={(e) => setHobbyInput(e.target.value)}
          className="p-2 m-2 border-2 border-gray-300 rounded"
        />
        <button onClick={addHobby} className="p-2 m-2 bg-blue-500 text-white rounded">Add Hobby</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter an interest"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          className="p-2 m-2 border-2 border-gray-300 rounded"
        />
        <button onClick={addInterest} className="p-2 m-2 bg-blue-500 text-white rounded">Add Interest</button>
      </div>
      <button
        className={`md:fixed top-1 right-1 text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1`}
        onClick={createNewConvo}
      >
        <div className="flex flex-row items-center">Start chatting!<FaArrowRight/></div>
      </button>
    </div>
  );

};
