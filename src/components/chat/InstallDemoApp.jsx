import {useChat} from "../../hooks/useChat.jsx";

export const InstallDemoApp = () => {
  const {
    company,
    avatarResponse,
  } = useChat();

  if(company && company.contact_demo_app_install) {
    return (
      <div className='text-amber-100 font-extrabold border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 md:m-1 m-4'>
        <a target='_blank' href={company.contact_link}><h1>Click HERE to load the app</h1></a>
      </div>
    )
  } else return <></>

};
