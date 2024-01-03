export const Hobbies = ({ addHobby, removeHobby, input, customUserHobbies, addCustomUserHobby, selectedHobbies }) => {
  const hobbyList = [
    "Reading", "Writing", "Cooking", "Traveling",
    "Gardening", "Gaming", "Photography", "Drawing"
  ];

  const handleCheckboxChange = (hobby, isChecked) => {
    if (isChecked) {
      addHobby(hobby);
    } else {
      removeHobby(hobby);
    }
  };

  const fullHobbiesList = [...hobbyList, ...customUserHobbies];

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col mr-4">
          {fullHobbiesList.slice(0, fullHobbiesList.length / 2).map((hobby, index) => (
            <label key={index} className="flex items-center m-1">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(hobby, e.target.checked)}
                className="mr-2"
                checked={selectedHobbies.includes(hobby)}
              />
              {hobby}
            </label>
          ))}
        </div>
        <div className="flex flex-col">
          {fullHobbiesList.slice(fullHobbiesList.length / 2).map((hobby, index) => (
            <label key={index} className="flex items-center m-1">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(hobby, e.target.checked)}
                className="mr-2"
                checked={selectedHobbies.includes(hobby)}
              />
              {hobby}
            </label>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder='Add your hobby'
        ref={input}
        className="p-2 m-2 border-2 border-gray-300 rounded"
      />
      <button
        onClick={() => addCustomUserHobby(input.current.value)}
        className="p-2 m-2 bg-blue-500 text-white rounded"
      >
        Add</button>
    </div>
  );
};
