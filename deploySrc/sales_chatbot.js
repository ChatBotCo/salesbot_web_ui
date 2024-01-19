document.addEventListener("DOMContentLoaded",
  function() {
    // Create a container for the chatbot
    var chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'sales_chatbot_root';
    chatbotContainer.style.pointerEvents = 'none';
    chatbotContainer.style.width = '1px';
    chatbotContainer.style.height = '1px';
    document.body.appendChild(chatbotContainer);

    // Load the chatbot's CSS
    var chatbotCSS = document.createElement('link');
    // chatbotCSS.href = 'http://localhost:5173/deleteme/index.css';
    chatbotCSS.href = 'https://kelichatbot2.blob.core.windows.net/salesbot-assets/index-v0.10.css';
    chatbotCSS.rel = 'stylesheet';
    chatbotCSS.type = 'text/css';
    document.head.appendChild(chatbotCSS);

    // Load the chatbot's JavaScript bundle
    var chatbotScript = document.createElement('script');
    // chatbotScript.src = 'http://localhost:5173/deleteme/index.js';
    chatbotScript.src = 'https://kelichatbot2.blob.core.windows.net/salesbot-assets/index-v0.10.js';
    chatbotScript.async = true;
    chatbotScript.onload = function() {
      // Initialize the chatbot here if needed
      // For example, if your chatbot exposes some global function to start
      // window.initializeChatbot();
    };
    document.body.appendChild(chatbotScript);
  }
);

