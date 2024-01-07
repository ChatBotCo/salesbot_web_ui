import {useChat} from "../hooks/useChat.jsx";

export const ChatPage = () => {
  const {
    company,
  } = useChat();

  return (
    <div className="flex h-screen w-full flex-col justify-end items-center">
      <h1>Welcome to {company && company.name} Chat Page</h1>
    </div>
  );

};
