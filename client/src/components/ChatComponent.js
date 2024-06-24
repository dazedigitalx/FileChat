// import React, { useState } from 'react';
// import axios from 'axios';

// const ChatComponent = ({ username, onReceiveMessage }) => {
//   const [messageInput, setMessageInput] = useState('');

//   const sendMessage = async () => {
//     try {
//       const timestamp = new Date().toISOString();
//       const response = await axios.post('http://localhost:5000/api/messages', {
//         username,
//         text: messageInput,
//         timestamp,
//       });
//       onReceiveMessage(response.data);
//       setMessageInput('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatComponent;
