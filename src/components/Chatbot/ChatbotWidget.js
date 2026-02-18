import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import CVAnalyzer from "./CVAnalyzer";
import "./ChatbotWidget.css";

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "👋 Hello! I'm your AI assistant.\n\nYou can:\n• Ask about projects & skills\n• 📄 Upload your CV for AI analysis\n\nHow can I help you today?",
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Initialize CVAnalyzer
    const cvAnalyzer = new CVAnalyzer();

    // Auto-scroll logic
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Send to Backend
    const sendToBackend = async (text) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();

            // Sahi key 'text' use ho rahi hai
            if (data.text) {
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now(), text: data.text, sender: "bot" }
                ]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text: "❌ Connection error with AI server.", sender: "bot" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userText = input.trim();
        setMessages((prev) => [...prev, { id: Date.now(), text: userText, sender: "user" }]);
        setInput("");
        sendToBackend(userText);
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMessages((prev) => [...prev, { id: Date.now(), text: `📂 Reading: ${file.name}`, sender: "user" }]);
        setLoading(true);

        try {
            // CVAnalyzer se text nikalna
            const cvText = await cvAnalyzer.extractTextFromFile(file);

            // DEBUG: Browser console mein check karein agar text show ho raha hai
            console.log("Extracted Content Length:", cvText?.length);

            // Agar text mil gaya (Jaise aapka "Muhammad Zeeshan Farooq" wala text)
            if (cvText && cvText.trim().length > 100) {

                // Step 1: UI par pehle local analysis dikhayen (Optional)
                const localAnalysis = cvAnalyzer.analyze(cvText);
                const feedback = cvAnalyzer.formatFeedback(localAnalysis);
                setMessages((prev) => [...prev, { id: Date.now() + 1, text: feedback, sender: "bot" }]);

                // Step 2: Gemini ko bhejein mukammal analysis ke liye
                const prompt = `Below is my CV text. I am a ${file.name.includes('frontEnd') ? 'Senior Front-End Developer' : 'Software Engineer'}. Please provide a deep professional analysis and suggest improvements:\n\n${cvText}`;

                await sendToBackend(prompt);
            } else {
                // Agar text empty ya boht chota nikla
                setMessages((prev) => [...prev, {
                    id: Date.now() + 1,
                    text: "❌ AI couldn't read the content inside this PDF. Please ensure it's not a scanned image or try pasting the text.",
                    sender: "bot"
                }]);
            }
        } catch (err) {
            console.error("Extraction Error:", err);
            setMessages((prev) => [...prev, { id: Date.now() + 1, text: "⚠️ Error processing file.", sender: "bot" }]);
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };
    return (
        <div className="chatbot-widget-container">
            {isOpen && (
                <div className="chatbot-widget-popup">
                    <div className="chatbot-widget-header">
                        <h3>Portfolio AI Assistant</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}><AiOutlineClose size={20} /></button>
                    </div>

                    <div className="chatbot-widget-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
                                <div className="message-content">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="chatbot-message bot">
                                <div className="message-content typing">💬 AI is thinking...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="chatbot-widget-input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything or paste your CV..."
                            className="chatbot-widget-input"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".txt,.pdf,.doc,.docx"
                            style={{ display: "none" }}
                        />
                        <button
                            type="button"
                            className="chatbot-widget-file-btn"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <MdAttachFile size={18} />
                        </button>
                        <button type="submit" className="chatbot-widget-send-btn">
                            <IoSend size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button className="chatbot-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <AiOutlineClose size={28} /> : <FiMessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatbotWidget;