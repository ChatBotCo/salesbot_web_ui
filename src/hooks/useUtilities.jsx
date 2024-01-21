import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

let backendUrl = "https://salesbot-001.azurewebsites.net";
if(localStorage.getItem('local_backend') === 'true') {
  backendUrl = "http://localhost:7071"
}

let backendUrlAdmin = "https://salesbot-api-svc.azurewebsites.net";
if(localStorage.getItem('local_backend_admin') === 'true') {
  backendUrlAdmin = "http://localhost:5000"
}

const UtilitiesContext = createContext();

export const UtilitiesProvider = ({ children }) => {
  const [debugging, _] = useState(
    localStorage.getItem('debugging')==='true'
  )

  const [loading, setLoading] = useState(false)


  return (
    <UtilitiesContext.Provider
      value={{
        backendUrl,
        backendUrlAdmin,
        loading, setLoading,
        debugging,
      }}
    >
      {children}
    </UtilitiesContext.Provider>
  );
};

export const useUtilities = () => {
  const context = useContext(UtilitiesContext);
  if (!context) {
    throw new Error("useUtilities must be used within a UtilitiesContext");
  }
  return context;
};
