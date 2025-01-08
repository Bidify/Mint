import { chrome } from "chrome";

// Function to handle the background script's logic
function handleBackgroundScriptLogic() {
  // Access Chrome API using chrome.tabs.sendMessage()
  chrome.tabs.sendMessage({ message: "someData" }, (response) => {
    if (!response.success) {
      console.error("Error sending message");
    }
  });
}

// Call the function to start the background script logic
handleBackgroundScriptLogic();
