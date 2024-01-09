import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./hooks/useChat";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {AvatarProvider} from "./hooks/useAvatar.jsx";
import {UtilitiesProvider} from "./hooks/useUtilities.jsx";
import {CompanyProvider} from "./hooks/useCompany.jsx";

ReactDOM.createRoot(document.getElementById("sales_chatbot_root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UtilitiesProvider>
        <CompanyProvider>
          <ChatProvider>
            <AvatarProvider>
              <App />
            </AvatarProvider>
          </ChatProvider>
        </CompanyProvider>
      </UtilitiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
