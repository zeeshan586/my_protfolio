class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse = (message) => {
        const lowerMessage = message.toLowerCase();

        // CV Analysis request - handle separately
        if (
            lowerMessage.includes("analyze") ||
            lowerMessage.includes("cv analysis") ||
            lowerMessage.includes("review cv") ||
            lowerMessage.includes("advice") ||
            lowerMessage.includes("improvement")
        ) {
            this.actionProvider.handleGeneralQuestion(
                "To analyze your CV, click the attachment button 📎 to upload a file or paste your CV content directly in the chat!"
            );
            return;
        }

        // Career-related questions
        if (
            lowerMessage.includes("career") ||
            lowerMessage.includes("experience") ||
            lowerMessage.includes("background") ||
            lowerMessage.includes("job") ||
            lowerMessage.includes("opportunity") ||
            lowerMessage.includes("availability") ||
            lowerMessage.includes("salary") ||
            lowerMessage.includes("rate") ||
            lowerMessage.includes("work with you") ||
            lowerMessage.includes("hire")
        ) {
            this.actionProvider.handleCareerQuestion(message);
        }
        // Portfolio navigation
        else if (
            lowerMessage.includes("project") ||
            lowerMessage.includes("portfolio") ||
            lowerMessage.includes("work") ||
            lowerMessage.includes("case study") ||
            lowerMessage.includes("about") ||
            lowerMessage.includes("resume") ||
            lowerMessage.includes("cv") ||
            lowerMessage.includes("contact") ||
            lowerMessage.includes("reach") ||
            lowerMessage.includes("email")
        ) {
            this.actionProvider.handlePortfolioNavigation(message);
        }
        // Skills and technologies
        else if (
            lowerMessage.includes("skill") ||
            lowerMessage.includes("tech") ||
            lowerMessage.includes("technology") ||
            lowerMessage.includes("react") ||
            lowerMessage.includes("javascript") ||
            lowerMessage.includes("stack") ||
            lowerMessage.includes("backend") ||
            lowerMessage.includes("database") ||
            lowerMessage.includes("learn") ||
            lowerMessage.includes("expertise")
        ) {
            this.actionProvider.handleSkillsQuestion(message);
        }
        // General questions
        else if (
            lowerMessage.includes("hello") ||
            lowerMessage.includes("hi") ||
            lowerMessage.includes("hey") ||
            lowerMessage.includes("what can you do") ||
            lowerMessage.includes("help") ||
            lowerMessage.includes("time") ||
            lowerMessage.includes("date")
        ) {
            this.actionProvider.handleGeneralQuestion(message);
        }
        // Default response
        else {
            this.actionProvider.handleGeneralQuestion(message);
        }
    };
}

export default MessageParser;
