import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import CVAnalyzer from "./CVAnalyzer";
import "./ChatbotWidget.css";

const ChatbotWidget = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "👋 Hello! I'm your AI  assistant. You can:\n• Ask about my projects, skills, and experience\n• Navigate through my portfolio\n• 📄 Upload/paste your CV for AI career guidance\n\nWhat can I help you with?",
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [unreadCount, setUnreadCount] = useState(0);
    const [cloudVisible, setCloudVisible] = useState(true);
    const fileInputRef = useRef(null);
    const cvAnalyzer = new CVAnalyzer();

    // Show/hide thinking cloud periodically when widget is closed
    useEffect(() => {
        if (isOpen) {
            setCloudVisible(false);
            return;
        }

        let showTimer;
        let hideTimer;
        let interval;

        const cycle = () => {
            setCloudVisible(true);
            hideTimer = setTimeout(() => setCloudVisible(false), 3000);
        };

        showTimer = setTimeout(() => {
            cycle();
            interval = setInterval(cycle, 6000);
        }, 2000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            if (interval) clearInterval(interval);
        };
    }, [isOpen]);

    const toggleChatbot = () => {
        const next = !isOpen;
        setIsOpen(next);
        if (next) {
            setUnreadCount(0);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Add user message
        const userMsg = {
            id: messages.length + 1,
            text: `📤 Uploaded: ${file.name} (analyzing...)`,
            sender: "user",
        };
        setMessages((prev) => [...prev, userMsg]);

        try {
            let cvText;
            if (file.type === "application/pdf") {
                cvText = `PDF file detected: ${file.name}. 
                
⚠️ To analyze your CV:
1. Open your PDF in another window
2. Select all content (Ctrl+A)
3. Copy it (Ctrl+C)
4. Paste it in the chat message box
5. Type "analyze my cv"

Then I'll provide detailed career guidance!`;
            } else {
                cvText = await cvAnalyzer.extractTextFromFile(file);
            }

            // Analyze the CV
            if (
                cvText &&
                !cvText.includes("PDF file detected") &&
                !cvText.includes("Please upload")
            ) {
                const analysis = cvAnalyzer.analyze(cvText);
                const feedback = cvAnalyzer.formatFeedback(analysis);

                const botMsg = {
                    id: messages.length + 2,
                    text: feedback,
                    sender: "bot",
                };
                setMessages((prev) => [...prev, botMsg]);
                if (!isOpen) setUnreadCount((prev) => prev + 1);
            } else {
                const botMsg = {
                    id: messages.length + 2,
                    text: cvText,
                    sender: "bot",
                };
                setMessages((prev) => [...prev, botMsg]);
                if (!isOpen) setUnreadCount((prev) => prev + 1);
            }
        } catch (error) {
            const errorMsg = {
                id: messages.length + 2,
                text: `❌ Error reading file: ${error}. Please try pasting your CV text directly in the chat.`,
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMsg]);
            if (!isOpen) setUnreadCount((prev) => prev + 1);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCVAnalysis = (cvText) => {
        const analysis = cvAnalyzer.analyze(cvText);
        const feedback = cvAnalyzer.formatFeedback(analysis);
        return feedback;
    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (input.trim() === "") return;

        // Add user message
        const userMsg = {
            id: messages.length + 1,
            text: input,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMsg]);

        // Check if user is asking to analyze CV content
        if (
            input.toLowerCase().includes("analyze my cv") ||
            input.toLowerCase().includes("analyze cv") ||
            input.toLowerCase().includes("cv analysis")
        ) {
            // For now, show instructions
            const botMsg = {
                id: messages.length + 2,
                text: "📋 CV Analysis Mode Activated!\n\nYou can:\n1. Click the attachment button 📎 to upload a CV file (TXT format)\n2. Or paste your CV content in the next message and I'll analyze it\n\nI'll provide insights on:\n✅ What's strong in your CV\n💡 Areas to improve\n🎯 What to add for better impact\n🚀 Career guidance\n\nWhat would you like to do?",
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
            if (!isOpen) setUnreadCount((prev) => prev + 1);
            setInput("");
            return;
        }

        // Check if message looks like CV content (multiple lines, contains job titles, etc.)
        const cvKeywords = [
            "experience",
            "education",
            "qualification",
            "skill",
            "university",
            "college",
            "2023",
            "2024",
            "2025",
        ];
        const isCVContent =
            input.length > 200 &&
            cvKeywords.some((kw) => input.toLowerCase().includes(kw));

        if (isCVContent) {
            const analysis = handleCVAnalysis(input);
            const botMsg = {
                id: messages.length + 2,
                text: analysis,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
            if (!isOpen) setUnreadCount((prev) => prev + 1);
            setInput("");
            return;
        }

        // Create ActionProvider with custom callback that handles navigation
        const actionProvider = new ActionProvider((message) => {
            // Check if message contains navigation instruction
            const navigationMatch = message.match(/\[NAVIGATE:([^\]]+)\]/);
            let displayMessage = message;

            if (navigationMatch) {
                const navPath = navigationMatch[1];
                // Remove the navigation marker from display message
                displayMessage = message.replace(/\[NAVIGATE:[^\]]+\]\s*/, "");

                // Handle navigation
                if (navPath.startsWith("#")) {
                    // Scroll to element
                    setTimeout(() => {
                        const element = document.querySelector(navPath);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        }
                    }, 500);
                } else {
                    // Navigate to route
                    setTimeout(() => {
                        navigate(navPath);
                    }, 500);
                }
            }

            // Add bot response
            const botMsg = {
                id: messages.length + 2,
                text: displayMessage,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
            if (!isOpen) setUnreadCount((prev) => prev + 1);
        });

        const messageParser = new MessageParser(actionProvider);
        messageParser.parse(input);

        setInput("");
    };

    return (
        <div className="chatbot-widget-container">
            {isOpen && (
                <div className="chatbot-widget-popup">
                    <div className="chatbot-widget-header">
                        <h3>Portfolio Assistant</h3>
                        <button
                            className="chatbot-close-btn"
                            onClick={toggleChatbot}
                        >
                            <AiOutlineClose size={24} />
                        </button>
                    </div>

                    <div className="chatbot-widget-messages">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`chatbot-message ${msg.sender}`}
                            >
                                <div className="message-content">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={handleSendMessage}
                        className="chatbot-widget-input-form"
                    >
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
                            aria-label="Upload CV file"
                        />
                        <button
                            type="button"
                            className="chatbot-widget-file-btn"
                            onClick={() => fileInputRef.current?.click()}
                            title="Upload CV file"
                        >
                            <MdAttachFile size={18} />
                        </button>
                        <button
                            type="submit"
                            className="chatbot-widget-send-btn"
                        >
                            <IoSend size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Thinking cloud indicator (click opens chat) */}
            {!isOpen && cloudVisible && (
                <div
                    className="chatbot-think-cloud"
                    onClick={() => setIsOpen(true)}
                    role="button"
                    aria-label="Open AI assistant"
                >
                    <div className="cloud-text">Need help? <span className="cloud-dots"><span>.</span><span>.</span><span>.</span></span></div>
                </div>
            )}

            <button className="chatbot-toggle-btn" onClick={toggleChatbot} title="AI Chat Assistant - Click to open" aria-label="Open AI chatbot" > {isOpen ? (<AiOutlineClose size={28} />) : (<> <FiMessageCircle size={28} />  {unreadCount > 0 && (<span className="chatbot-unread-badge"> {unreadCount > 9 ? "9+" : unreadCount} </span>)} </>)} </button>
        </div>
    );
};

export default ChatbotWidget;
