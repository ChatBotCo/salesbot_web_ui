import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const ButtonContactSales = () => {
  const {
    company,
  } = useCompany();

  const {
    colorBgEm,
    colorTextEm,
    colorBorder,
  } = useStyle();

  if(company && company.contact_form) {
    return (
      <div className={`${colorTextEm} font-extrabold ${colorBorder} border-2 ${colorBgEm} rounded-xl p-2 m-1 text-center`}>
        <a target='_blank' href={company.contact_link}><h1 className={`${colorTextEm}`}>Contact {company.name}</h1></a>
      </div>
    )
  } else return <></>

};