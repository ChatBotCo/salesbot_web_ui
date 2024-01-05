import {useEffect} from "react";
import {useChat} from "../hooks/useChat.jsx";

export const CreateNewConvoPage = () => {
  const {
    companyId,
  } = useChat();

  console.log(companyId)

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <h1>Hello, world</h1>
    </div>

  );

};
