import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ChatProvider} from "./hooks/useChat";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {AvatarProvider} from "./hooks/useAvatar.jsx";
import {UtilitiesProvider} from "./hooks/useUtilities.jsx";
import {CompanyProvider} from "./hooks/useCompany.jsx";
import {StyleProvider} from "./hooks/useStyle.jsx";
import {ChatbotProvider} from "./hooks/useChatbot.jsx";

ReactDOM.createRoot(document.getElementById("greeterbot_root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UtilitiesProvider>
        <CompanyProvider>
          <ChatbotProvider>
            <StyleProvider>
              <ChatProvider>
                <AvatarProvider>
                  <App />
                </AvatarProvider>
              </ChatProvider>
            </StyleProvider>
          </ChatbotProvider>
        </CompanyProvider>
      </UtilitiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
