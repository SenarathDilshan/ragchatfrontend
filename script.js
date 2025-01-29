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

      try {
          const response = await fetch('http://your-backend-url/chat', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ message })
          });

          const data = await response.json();
          addMessageToChatWindow('bot', data.response);
      } catch (error) {
          console.error('Error:', error);
          addMessageToChatWindow('bot', 'An error occurred. Please try again.');
      }
  });

  function addMessageToChatWindow(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message', sender);
      messageElement.textContent = message;
      chatWindow.appendChild(messageElement);
      chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
