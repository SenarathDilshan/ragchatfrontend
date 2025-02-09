// document.addEventListener('DOMContentLoaded', () => {
//   const chatForm = document.getElementById('chat-form');
//   const userInput = document.getElementById('user-input');
//   const chatWindow = document.getElementById('chat-window');

//   chatForm.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const message = userInput.value.trim();
//       if (message === '') return;

//       // Display user message
//       addMessageToChatWindow('user', message);
//       userInput.value = '';

//       try {
//           const response = await fetch('http://0.0.0.0:8000/chat', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ message })
//           });

//           const data = await response.json();
//           addMessageToChatWindow('bot', data.response);
//       } catch (error) {
//           console.error('Error:', error);
//           addMessageToChatWindow('bot', 'An error occurred. Please try again.');
//       }
//   });

//   function addMessageToChatWindow(sender, message) {
//       const messageElement = document.createElement('div');
//       messageElement.classList.add('chat-message', sender);
//       messageElement.textContent = message;
//       chatWindow.appendChild(messageElement);
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//   }
// });






// document.addEventListener('DOMContentLoaded', () => {
//     const chatForm = document.getElementById('chat-form');
//     const userInput = document.getElementById('user-input');
//     const chatWindow = document.getElementById('chat-window');
  
//     chatForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const message = userInput.value.trim();
//         if (message === '') return;
  
//         // Display user message
//         addMessageToChatWindow('user', message);
//         userInput.value = '';
  
//         try {
//             const response = await fetch('http://107.172.140.244:8000/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ text: message }) // Ensure this key matches the expected key in the Flask backend
//             });
  
//             const data = await response.json();
//             addMessageToChatWindow('bot', data.response);
//         } catch (error) {
//             console.error('Error:', error);
//             addMessageToChatWindow('bot', 'An error occurred. Please try again.');
//         }
//     });
  
//     function addMessageToChatWindow(sender, message) {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('chat-message', sender);
//         messageElement.textContent = message;
//         chatWindow.appendChild(messageElement);
//         chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//   });
  



document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message === '') return;

        // Display user message
        addMessageToChatWindow('user', message);
        userInput.value = '';

        // Show typing indicator
        const typingMessage = addMessageToChatWindow('bot', 'Typing...');

        try {
            const response = await fetch('https://13.60.185.144:8080/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: message }) 
            });

            const data = await response.json();
            typingMessage.remove(); // Remove typing indicator

            if (!response.ok) throw new Error(data.error || "Server Error");

            addMessageToChatWindow('bot', data.response);
        } catch (error) {
            console.error('Error:', error);
            typingMessage.remove(); // Remove typing indicator
            addMessageToChatWindow('bot', 'An error occurred. Please try again.');
        }
    });

    function addMessageToChatWindow(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageElement; // Return element to allow removal
    }
});
