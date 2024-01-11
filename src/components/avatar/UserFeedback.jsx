import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";
import {useChat} from "../../hooks/useChat.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";
import {useCompany} from "../../hooks/useCompany.jsx";

export const UserFeedback = () => {

  const {
    submitUserFeedback,
    feedbackSent,
    lastAvatarResponseText,
  } = useChat();

  const {
    colorText,
  } = useStyle()

  const {
    company,
  } = useCompany()

  if(company.greeting === lastAvatarResponseText) return <></>

  if(feedbackSent) {
    return (
      <div className={`
          flex flex-row items-center justify-center
          rounded-xl mr-3 ${colorText} font-extrabold
          text-xs
        `}>
        Thank you for your feedback!
      </div>
    )
  } else {
    return (
      <div className={`
          flex flex-row items-center justify-center
          rounded-xl mr-3
          bg-white
        `}>
        <button
          className={`flex-shrink-0 flex flex-row items-center p-2 bg-blend-luminosity bg-opacity-80 ${colorText}`}
          onClick={()=>submitUserFeedback({user_feedback:"positive"})}
        >
          <FaRegThumbsUp />
        </button>
        <button
          className={`flex-shrink-0 flex flex-row items-center p-2 bg-blend-luminosity bg-opacity-80 ${colorText}`}
          onClick={()=>submitUserFeedback({user_feedback:"negative"})}
        >
          <FaRegThumbsDown />
        </button>
      </div>
    )
  }
};
