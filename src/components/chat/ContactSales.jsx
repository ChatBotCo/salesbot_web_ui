import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const ContactSales = () => {
  const {
    company,
  } = useCompany();

  const {
    colorBg,
    colorText,
    colorBorder,
  } = useStyle();

  console.log(colorText)
  if(company && company.contact_form) {
    return (
      <div className={`text-[${colorText}] font-extrabold border-[${colorBorder}] border-2 bg-[${colorBg}] rounded-xl p-2 m-1`}>
        <a target='_blank' href={company.contact_link}><h1>Click HERE to contact us!</h1></a>
      </div>
    )
  } else return <></>

};
