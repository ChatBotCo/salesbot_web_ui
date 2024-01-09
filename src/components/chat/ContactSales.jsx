import {useChat} from "../../hooks/useChat.jsx";

export const ContactSales = () => {
  const {
    company,
    avatarResponse,
  } = useChat();

  if(company && company.contact_form) {
    return (
      <div className='text-amber-100 font-extrabold border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1'>
        <a target='_blank' href={company.contact_link}><h1>Click HERE to contact us!</h1></a>
      </div>
    )
  } else return <></>

};
