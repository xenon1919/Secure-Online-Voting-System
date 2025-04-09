import React, { useState, useContext } from "react";
import { UserContext, ThemeContext } from "../../App";

const Chatbot = () => {
  const { state } = useContext(UserContext);
  const { theme } = useContext(ThemeContext); // Consume the theme context
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you with voting today?", sender: "bot" },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [input, setInput] = useState("");
  const [suggestions] = useState([
    "How do I vote?",
    "When will the results be announced?",
    "Thank you!",
  ]);

  const handleSuggestionClick = (suggestion) => {
    const userMessage = { text: suggestion, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      let botReply =
        "I'm here to help with voting information. What's your question?";

      const lowerCaseInput = suggestion.toLowerCase();

      if (lowerCaseInput.includes("vote")) {
        botReply =
          "To participate in the election, please click on the 'Elections' button.";
      } else if (
        lowerCaseInput.includes("result") ||
        lowerCaseInput.includes("announced") ||
        lowerCaseInput.includes("when")
      ) {
        botReply =
          "Election results will be publicly available after the elections have concluded.";
      } else if (lowerCaseInput.includes("thank you")) {
        botReply =
          "You're welcome! If you have any more questions, feel free to ask.";
      } else {
        botReply = "Sorry, I don't have information on that topic right now.";
      }

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 1000);
  };

  if (!state || state?.isAdmin) {
    return null;
  }

  return (
    <div>
      {/* ✅ Floating Chatbot Button */}
      <button className="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* ✅ Chat Window */}
      {open && (
        <div
          className={`chatbot-window ${theme === "dark" ? "dark" : "light"}`}
        >
          <div className="chatbot-header">
            <span>Voting Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Chatbot Styles (Supports Light & Dark Mode) */}
      <style>{`
        .chatbot-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          z-index: 1000;
          transition: background 0.3s ease-in-out;
        }
        .chatbot-btn:hover {
          background: #0056b3;
        }

        .chatbot-window {
          position: fixed;
          bottom: 70px;
          right: 20px;
          width: 300px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 1001;
          transition: all 0.3s ease-in-out;
        }

        /* 🎭 Light Mode */
        .chatbot-window.light {
          background: white;
          color: black;
          border: 1px solid #ccc;
        }

        /* 🌙 Dark Mode */
        .chatbot-window.dark {
          background: #2b2b2b;
          color: white;
          border: 1px solid #444;
        }

        .chatbot-header {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
        }
        .chatbot-window.light .chatbot-header {
          background: #007bff;
          color: white;
        }
        .chatbot-window.dark .chatbot-header {
          background: #0056b3;
          color: white;
        }

        .chatbot-messages {
          height: 200px;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }

        .message {
          padding: 8px 12px;
          margin: 5px 0;
          border-radius: 8px;
          font-size: 0.9rem;
        }
        .user {
          background: #e2f7cb;
          color: #333;
          align-self: flex-end;
        }
        .bot {
          background: #f0f0f0;
          color: #333;
          align-self: flex-start;
        }
        .chatbot-window.dark .bot {
          background: #444;
          color: white;
        }
        .chatbot-window.dark .user {
          background: #007bff;
          color: white;
        }

        .chatbot-suggestions {
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          border-top: 1px solid #ccc;
        }
        .suggestion-btn {
          background-color: #f8f9fa;
          color: #333;
          border: 1px solid #ddd;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }
        .chatbot-window.dark .suggestion-btn {
          background-color: #555;
          color: white;
          border: 1px solid #777;
        }
        .suggestion-btn:hover {
          background-color: #e9ecef;
        }
        .chatbot-window.dark .suggestion-btn:hover {
          background-color: #666;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
