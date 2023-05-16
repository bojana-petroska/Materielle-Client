import axios from "axios";
import { useState, useEffect } from "react";

function ChatGPT() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [materialId, setMaterialId] = useState(""); 
  
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005/";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY 

  useEffect(() => {
    axios
      .get(`${API_URL}auth/wishlist/add`)
      .then((response) => {
        const wishlist = response.data.wishList;
        if (wishlist.length > 0) {
          setMaterialId(wishlist[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = () => {
    if (userInput.trim() === "") {
      return;
    }

    const prompt = `Give me the pros and cons for ${materialId}`;

    axios
      .post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const chatResponse = response.data.choices[0].text.trim();

        const newMessage = {
          role: "user",
          content: userInput,
        };

        const botMessage = {
          role: "bot",
          content: chatResponse,
        };

        setMessages([...messages, newMessage, botMessage]);
        setUserInput("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;
