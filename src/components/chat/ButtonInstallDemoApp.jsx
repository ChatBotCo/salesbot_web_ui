import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const ButtonInstallDemoApp = () => {
  const {
    company,
  } = useCompany();

  const {
    colorBgEm,
    colorTextEm,
    colorBorder,
  } = useStyle();

  if(company && company.contact_demo_app_install) {
    return (
      <div className={`${colorTextEm} font-extrabold ${colorBorder} border-2 ${colorBgEm} rounded-xl p-2 text-center`}>
        <a target='_blank' href={company.contact_link}><h1 className={`${colorTextEm}`}>Install Demo App</h1></a>
      </div>
    )
  } else return <></>

};
