document.addEventListener("DOMContentLoaded", function() {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("tabindex", "0");
  iframe.setAttribute("style", "position: fixed; right: 16px; bottom: 30px; z-index: 999999; transform-origin: center bottom; border: 0px; height: 700px; max-height: calc(100vh - 104px); width: 380px; opacity: 1; pointer-events: auto; background-color: red;");
  iframe.setAttribute("title", "Messaging window");
  iframe.setAttribute("name", "Messaging window");
  iframe.setAttribute("src", "https://polite-ocean-033cf3c1e.4.azurestaticapps.net?company_id=edge.app");

  document.body.appendChild(iframe);
});
