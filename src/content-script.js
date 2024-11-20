// content-script.js
import { chrome } from 'chrome';

// Function to handle the content script's logic
function handleContentScriptLogic() {
  console.log("Content script is running...");
  // Access Chrome API using chrome.tabs.query()
  chrome.tabs.query({ active: true, currentWindows: true }, (tabs) => {
    console.log("Current URL:", tabs[0].url);
  });
}

// Call the function to start the content script logic
handleContentScriptLogic();