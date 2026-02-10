import { createChatBotMessage } from './chat/chatUtils';

const botName = "Portfolio Assistant";

const config = {
    botName: botName,
    initialMessages: [
        createChatBotMessage(
            `Welcome to my portfolio! I'm ${botName}. 👋 Feel free to ask me about my projects, skills, or anything else!`
        ),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#3c4e5a",
            borderRadius: "12px",
        },
        chatButton: {
            backgroundColor: "#3c4e5a",
            borderRadius: "50%",
            padding: "8px 12px",
        },
    },
};

export default config;
