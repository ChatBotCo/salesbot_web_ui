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
    chatbotCSS.href = 'https://kelichatbot2.blob.core.windows.net/salesbot-assets/index-v0.16.css';
    chatbotCSS.rel = 'stylesheet';
    chatbotCSS.type = 'text/css';
    document.head.appendChild(chatbotCSS);

    // Load the chatbot's JavaScript bundle
    var chatbotScript = document.createElement('script');
    chatbotScript.src = 'https://kelichatbot2.blob.core.windows.net/salesbot-assets/index-v0.16.js';
    chatbotScript.async = true;
    document.body.appendChild(chatbotScript);
  }
);

