// Content script bridge

(function() {
    'use strict';

    const bridge = {
        sendMessage: function(message) {
            window.postMessage({ type: 'FROM_CONTENT_SCRIPT', text: message }, '*');
        },
        onMessage: function(callback) {
            window.addEventListener('message', function(event) {
                if (event.source !== window) return;
                if (event.data.type && (event.data.type === 'FROM_PAGE')) {
                    callback(event.data.text);
                }
            });
        }
    };

    // Example usage
    bridge.onMessage(function(msg) {
        console.log('Received message from page:', msg);
    });
    bridge.sendMessage('Hello from content script!');
})();
