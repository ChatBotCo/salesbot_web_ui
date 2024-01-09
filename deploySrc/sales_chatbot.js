// document.addEventListener("DOMContentLoaded", function() {
//   var iframe = document.createElement("iframe");
//   iframe.setAttribute("tabindex", "0");
//   iframe.setAttribute("style", "position: fixed; right: 16px; bottom: 30px; z-index: 999999; transform-origin: center bottom; border: 0px; height: 700px; max-height: calc(100vh - 104px); width: 380px; opacity: 1; pointer-events: auto; background-color: red;");
//   iframe.setAttribute("title", "Messaging window");
//   iframe.setAttribute("name", "Messaging window");
//   iframe.setAttribute("src", "https://polite-ocean-033cf3c1e.4.azurestaticapps.net?company_id=edge.app");
//
//   document.body.appendChild(iframe);
// });

(function() {
  // Create a container for the chatbot
  var chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'sales_chatbot_root';
  document.body.appendChild(chatbotContainer);

  // Load the chatbot's CSS
  var chatbotCSS = document.createElement('link');
  // chatbotCSS.href = 'http://localhost:5173/deleteme/index.css';
  chatbotCSS.href = 'https://kelichatbot2.blob.core.windows.net/salesbot-assets/index-deploySrc_v0.1.css';
  chatbotCSS.rel = 'stylesheet';
  chatbotCSS.type = 'text/css';
  document.head.appendChild(chatbotCSS);

  // Load the chatbot's JavaScript bundle
  var chatbotScript = document.createElement('script');
  // chatbotScript.src = 'http://localhost:5173/deleteme/index.js';
  chatbotScript.src = 'https://kelichatbot2.blob.core.windows.net/salesbot-assets/index-deploySrc_v0.1.js';
  chatbotScript.async = true;
  chatbotScript.onload = function() {
    // Initialize the chatbot here if needed
    // For example, if your chatbot exposes some global function to start
    // window.initializeChatbot();
  };
  document.body.appendChild(chatbotScript);
})();
