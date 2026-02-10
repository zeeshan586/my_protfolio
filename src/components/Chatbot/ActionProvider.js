class ActionProvider {
    constructor(callback) {
        this.callback = callback;
    }

    sendMessage = (message) => {
        if (this.callback) {
            this.callback(message);
        }
    };

    // Navigate to different portfolio sections
    navigateToPage = (page) => {
        const urls = {
            home: "/",
            projects: "/project",
            about: "/about",
            resume: "/resume",
            contact: "#contact"
        };

        const url = urls[page.toLowerCase()];
        if (url) {
            if (url.startsWith("#")) {
                const element = document.querySelector(url);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                window.location.href = url;
            }
            return true;
        }
        return false;
    };

    // Career-related responses
    handleCareerQuestion = (message) => {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("experience") || lowerMsg.includes("background")) {
            this.sendMessage(
                "📊 I'm a Sr. Front-End Developer with expertise in React, JavaScript, HTML, CSS, and modern web technologies. I have experience in building responsive, user-friendly web applications. Check my portfolio section to see my work!"
            );
        } else if (lowerMsg.includes("looking for") || lowerMsg.includes("opportunity") || lowerMsg.includes("job")) {
            this.sendMessage(
                "💼 I'm actively looking for exciting opportunities in Front-End Development! I'm open to remote positions and collaborations. Feel free to reach out through the contact section or check my resume for more details."
            );
        } else if (lowerMsg.includes("rate") || lowerMsg.includes("salary") || lowerMsg.includes("cost")) {
            this.sendMessage(
                "💰 My rates are competitive and negotiable based on project scope and requirements. Let's discuss your project needs - contact me for more information!"
            );
        } else if (lowerMsg.includes("availability") || lowerMsg.includes("when")) {
            this.sendMessage(
                "📅 I'm currently available for new projects and collaborations. I can discuss timelines based on your requirements. Send me a message through the contact section!"
            );
        } else {
            this.sendMessage(
                "💼 I'd be happy to discuss career opportunities! Ask me about my experience, skills, availability, or feel free to check my portfolio."
            );
        }
    };

    // Portfolio navigation
    handlePortfolioNavigation = (message) => {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("project")) {
            this.sendMessage(
                "🚀 [NAVIGATE:/project] Redirecting to my Projects section where you can see all my recent work and case studies!"
            );
        } else if (lowerMsg.includes("about") || lowerMsg.includes("bio") || lowerMsg.includes("who are you")) {
            this.sendMessage(
                "👤 [NAVIGATE:/about] Opening my About section! You'll find more about me, my skills, tech stack, and experience there."
            );
        } else if (lowerMsg.includes("resume") || lowerMsg.includes("cv") || lowerMsg.includes("download")) {
            this.sendMessage(
                "📄 [NAVIGATE:/resume] Loading my Resume section where you can view and download my full CV."
            );
        } else if (lowerMsg.includes("contact") || lowerMsg.includes("reach") || lowerMsg.includes("email")) {
            this.sendMessage(
                "📧 [NAVIGATE:#contact] Opening contact section! You can reach me through email or social media. Let's connect!"
            );
        }
    };

    // Skills and technologies
    handleSkillsQuestion = (message) => {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("react") || lowerMsg.includes("javascript")) {
            this.sendMessage(
                "⚛️ React & JavaScript are my core strengths! I build dynamic, interactive web applications using modern React patterns, hooks, and best practices. Check my projects to see real examples!"
            );
        } else if (lowerMsg.includes("tech") || lowerMsg.includes("stack") || lowerMsg.includes("technology")) {
            this.sendMessage(
                "🛠️ My tech stack includes: React, JavaScript, HTML5, CSS3, Bootstrap, Node.js, and popular libraries like Redux and React Router. Visit my About section for the complete list!"
            );
        } else if (lowerMsg.includes("backend") || lowerMsg.includes("database")) {
            this.sendMessage(
                "🗄️ While my primary focus is Front-End Development, I have knowledge of Node.js and basic database concepts. I prefer collaborating with backend developers for full-stack projects!"
            );
        } else if (lowerMsg.includes("learn") || lowerMsg.includes("new")) {
            this.sendMessage(
                "📚 I'm always learning! Currently exploring advanced React patterns, Next.js, and TypeScript. I believe in continuous improvement and staying updated with latest technologies."
            );
        } else {
            this.sendMessage(
                "🎯 I'm skilled in Front-End Development with expertise in React, JavaScript, and modern web technologies. Ask me about specific technologies or skills!"
            );
        }
    };

    // General questions
    handleGeneralQuestion = (message) => {
        const lowerMsg = message.toLowerCase();

        if (
            lowerMsg.includes("hello") ||
            lowerMsg.includes("hi") ||
            lowerMsg.includes("hey")
        ) {
            this.sendMessage(
                "👋 Hello! Welcome to my portfolio! I'm your AI assistant. You can ask me about my projects, skills, career, or navigate through my portfolio. What would you like to know?"
            );
        } else if (lowerMsg.includes("what can you do") || lowerMsg.includes("help")) {
            this.sendMessage(
                "🤖 I can help you with:\n• 📁 Navigate to my Projects, About, Resume sections\n• 💼 Answer career and experience questions\n• 🛠️ Tell you about my skills and tech stack\n• 📧 Direct you to contact me\n\nWhat interests you?"
            );
        } else if (lowerMsg.includes("time") || lowerMsg.includes("date")) {
            const now = new Date();
            this.sendMessage(
                `⏰ Current time is ${now.toLocaleTimeString()}. In the meantime, feel free to explore my portfolio!`
            );
        } else {
            this.sendMessage(
                "💡 Great question! You can ask me about my projects, skills, career opportunities, or I can navigate you through my portfolio. What would you like to explore?"
            );
        }
    };
}

export default ActionProvider;
