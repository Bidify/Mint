import React from 'react';
import ReactDOM from 'react-dom';

function Popup() {
  return (
    <div>
      <h1>Hello from the Popup!</h1>
      <button onClick={handleClosePopup}>Close Popup</button>
    </div>
  );
}

function handleClosePopup() {
  chrome.tabs.sendMessage({ action: "close" });
}

ReactDOM.render(<Popup />, document.getElementById('popup-container'));