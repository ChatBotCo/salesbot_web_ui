import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const InstallDemoApp = () => {
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
      <div className={`${colorTextEm} font-extrabold ${colorBorder} border-2 ${colorBgEm} rounded-xl p-2 m-1`}>
        <a target='_blank' href={company.contact_link}><h1>Click HERE to load the app</h1></a>
      </div>
    )
  } else return <></>

};
