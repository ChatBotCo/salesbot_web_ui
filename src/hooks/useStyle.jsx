import {createContext, useContext, useEffect, useState} from "react";
import {useCompany} from "./useCompany.jsx";

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const {
    company
  } = useCompany();

  const [colorBgEm, setColorBgEm] = useState('bg-[rgb(51,65,85)]');
  const [colorTextEm, setColorTextEm] = useState('text-white');
  const [colorText, setColorText] = useState('text-[rgb(51,65,85)]');
  const [colorBorder, setColorBorder] = useState('border-[rgb(4,162,247)]');

  // Fucking tailwind piece of shit fuckwits
  const companyToStyle = {
    // 'edge.app': {color_bg: '#66EDA8', color_text: '#0D2145', color_border: '#0D2145'},
    'edge.app': {
      colorBgEm: 'bg-[#66EDA8]',
      colorTextEm: 'text-[#0D2145]',
      colorText: 'text-[#0D2145]',
      colorBorder: 'border-[#0D2145]'
    },
    'blacktiecasinoevents': {
      colorBgEm: 'bg-[rgb(175,132,44)]',
      colorTextEm: 'text-white',
      colorText: 'text-[rgb(175,132,44)]',
      colorBorder: 'border-black'
    },
    'saleschat_bot': {
      colorBgEm: 'bg-[rgb(51,65,85)]',
      colorTextEm: 'text-white',
      colorText: 'text-[rgb(51,65,85)]',
      colorBorder: 'border-[rgb(4,162,247)]'
    },
  }

  // useEffect(() => {
  //   if (company && company.style) {
  //     const companyStyle = companyToStyle[company.company_id]
  //     // const companyStyle = company.style
  //     setColorBgEm(companyStyle.colorBgEm);
  //     setColorTextEm(companyStyle.colorTextEm);
  //     setColorText(companyStyle.colorText);
  //     setColorBorder(companyStyle.colorBorder);
  //   }
  // }, [company]);

  return (
    <StyleContext.Provider
      value={{
        colorBgEm,
        colorTextEm,
        colorText,
        colorBorder,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useCompany must be used within a StyleContext");
  }
  return context;
};
