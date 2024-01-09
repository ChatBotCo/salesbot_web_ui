import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useUtilities} from "./useUtilities.jsx";

const CompanyContext = createContext();

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const getDataCompanyId = debugging => {
  if(debugging) {
    return useQuery().get('company_id');
  } else {
    const scriptTag = document.querySelector('script#sales_chatbot_script');
    if (scriptTag) {
      const _companyId = scriptTag.getAttribute('data-company-id');
      if(_companyId) {
        // console.log(`data-company-id:${_companyId}`);
        return _companyId;
      } else {
        console.error('NOT FOUND: data-company-id - Did you forget to add it to the Sales ChatBot HTML element?');
        return null;
      }
    } else {
      console.error('NOT FOUND: script sales_chatbot.js - Did you forget to add the Sales ChatBot HTML script element?');
      return null;
    }
  }
}


let initialized = false

export const CompanyProvider = ({ children }) => {
  const {
    backendUrl,
    setLoading,
    debugging,
  } = useUtilities();

  const [companyLoadError, setCompanyLoadError] = useState(false)
  const [companyId, setCompanyId] = useState(
    getDataCompanyId(debugging)
  )

  const [company, setCompany] = useState()

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(companyId && !company) {
        setLoading(true)
        fetch(`${backendUrl}/api/company?companyid=${companyId}`, {
          method: "GET",
        })
          .then(data=>data.json())
          .then(_company =>{
            setCompany(_company)
          })
          .catch(()=>setCompanyLoadError(true))
          .finally(()=>setLoading(false))
      }
    }
  }, []);


  return (
    <CompanyContext.Provider
      value={{
        companyId,
        company,
        companyLoadError,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyContext");
  }
  return context;
};
