import {useChat} from "../hooks/useChat.jsx";

export const AvatarResponse = () => {
  const {
    company,
    avatarResponse,
  } = useChat();

  if(company && avatarResponse) {
    return (
      <div className='w-full md:w-96 p-4 md:pl-0 md:pr-0 italic'>
        From
        <span className='font-semibold ml-1'>{company.name}</span>:<br/>
        <span className='text-blue-500'>"{avatarResponse}"</span>
      </div>
    );
  } else return <></>

};
