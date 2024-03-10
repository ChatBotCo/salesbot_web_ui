document.addEventListener("DOMContentLoaded",
  function() {
    // Create a container for the chatbot
    var chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'greeterbot_root';
    chatbotContainer.style.pointerEvents = 'none';
    chatbotContainer.style.width = '1px';
    chatbotContainer.style.height = '1px';
    document.body.appendChild(chatbotContainer);

    // Load the chatbot's CSS
    var chatbotCSS = document.createElement('link');
    chatbotCSS.href = 'https://greeterbot.blob.core.windows.net/greeterbot-public/index-v0.19.css';
    chatbotCSS.rel = 'stylesheet';
    chatbotCSS.type = 'text/css';
    document.head.appendChild(chatbotCSS);

    // Load the chatbot's JavaScript bundle
    var chatbotScript = document.createElement('script');
    chatbotScript.src = 'https://greeterbot.blob.core.windows.net/greeterbot-public/index-v0.19.js';
    chatbotScript.async = true;
    document.body.appendChild(chatbotScript);
  }
);

