import {createContext, useContext, useEffect, useState} from "react";
import {useCompany} from "./useCompany.jsx";

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const {
    company
  } = useCompany();

  const [colorBg, setColorBg] = useState('blue-500');
  const [colorText, setColorText] = useState('white');
  const [colorBorder, setColorBorder] = useState('blue-800');

  useEffect(() => {
    if (company && company.style) {
      setColorBg(company.style['color_bg']);
      setColorText(company.style['color_text']);
      setColorBorder(company.style['color_border']);
    }
  }, [company]);

  return (
    <StyleContext.Provider
      value={{
        colorBg,
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
