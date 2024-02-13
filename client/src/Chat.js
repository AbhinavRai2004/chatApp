import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";


const socket = io("http://localhost:5000", { transports: ["websocket"] }); // Connect to your server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      // Clean up the event listener
      socket.off("message");
    };
  }, [messages]);

  const handleMessageSend = () => {
    if (input.trim() !== "") {
      // Send message to server
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default Chat;
