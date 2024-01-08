import {useChat} from "../../hooks/useChat.jsx";

export const InstallDemoApp = () => {
  const {
    company,
    avatarResponse,
  } = useChat();

  if(avatarResponse && avatarResponse.user_data.user_wants_to_install_the_demo) {
    return (
      <div className='text-amber-100 font-extrabold border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1'>
        <a target='_blank' href={company.contact_link}><h1>Click HERE to load the app</h1></a>
      </div>
    )
  } else return <></>

};
