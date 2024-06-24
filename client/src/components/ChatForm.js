// import React, { useState } from 'react';

// const ChatForm = ({ onSendMessage }) => {
//     const [message, setMessage] = useState('');

//     const handleChange = (event) => {
//         setMessage(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (message.trim() === '') {
//             return; // Prevent sending empty messages
//         }
//         const newMessage = {
//             text: message,
//             timestamp: new Date().toISOString(), // Use current time as timestamp
//         };
//         onSendMessage(newMessage);
//         setMessage(''); // Clear the input field after sending the message
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={handleChange}
//                 placeholder="Type your message..."
//                 required
//             />
//             <button type="submit">Send</button>
//         </form>
//     );
// };

// export default ChatForm;
