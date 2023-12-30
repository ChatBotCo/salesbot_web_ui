
export const ChatTopicHints = ({onSelectTopic}) => {

  const topics = [
    {label: "Learn New Skills", prompt: "I'd like help learning a new skill!"},
    {label: "Fun Facts", prompt: "Tell me a fun fact"},
    {label: "Word Games", prompt: "I'd like to play a simple word game.  You start."},
    {label: "Science", prompt: "Tell me an interesting science fact"},
    {label: "History", prompt: "Tell me an interesting fact from history"},
    {label: "Philosophy", prompt: "I want to go deep!  Let's talk philosophy!"},
    {label: "Share a Favorite Hobby", prompt: "What's a hobby you really enjoy? I'd love to hear more about it!"},
    {label: "Movies or TV Shows", prompt: "I'd like to discuss movies or tv shows"},
    {label: "Travel", prompt: "If you could travel anywhere in the world, where would you go?"},
    {label: "Books", prompt: "I'd like to discuss books"},
    {label: "Food", prompt: "I'd like to discuss food"},
    {label: "Music", prompt: "I'd like to discuss music that I like"},
    {label: "Pets", prompt: "I'd like to tell you about my pets"},
    {label: "Sports", prompt: "I'd like to discuss sports"},
    {label: "Art", prompt: "I'd like to discuss art"},
    {label: "Jokes", prompt: "Tell me a joke"},
    {label: "Riddle", prompt: "Tell me a riddle"},
    {label: "Dreams", prompt: "Help me interpret my dream"},
    {label: "Mindfulness and Relaxation", prompt: "I'd like to discuss mindfulness and relaxation"},
  ]
  return (
    <div className={`flex flex-row justify-start md:ml-5 md:mr-1 overflow-x-scroll`}>
      {topics.map((topic, index) => (
        <button
          key={index}
          className='text-blue-500 border-blue-500 border rounded p-1 m-1 bg-white active:bg-blue-500 active:text-white'
          onClick={()=>onSelectTopic(topic.prompt)}
        >
          <span className='whitespace-nowrap'>{topic.label}</span>
        </button>
      ))}
    </div>
  );

};
