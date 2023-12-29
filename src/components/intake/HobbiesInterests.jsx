import {useState} from "react";

export const HobbiesInterests = ({title}) => {

  const [userHobbies, setUserHobbies] = useState([])
  const [hobbyInput, setHobbyInput] = useState('');

  const addHobby = () => {
    setUserHobbies([...userHobbies, hobbyInput]);
    setHobbyInput('');
  };

  return (
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
  );

};
