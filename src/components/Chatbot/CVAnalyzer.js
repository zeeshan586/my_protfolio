/**
 * CV Analyzer - Analyzes CV/Resume content and provides career guidance
 */

class CVAnalyzer {
    analyze(cvText) {
        const lowerText = cvText.toLowerCase();
        const feedback = {
            strengths: [],
            improvements: [],
            whatToAdd: [],
            overallScore: 0,
            suggestions: [],
        };

        // Check for key sections
        const hasSummary =
            lowerText.includes("summary") ||
            lowerText.includes("objective") ||
            lowerText.includes("professional") ||
            lowerText.includes("about");
        const hasExperience =
            lowerText.includes("experience") ||
            lowerText.includes("work") ||
            lowerText.includes("employment");
        const hasEducation =
            lowerText.includes("education") ||
            lowerText.includes("degree") ||
            lowerText.includes("university");
        const hasSkills =
            lowerText.includes("skills") ||
            lowerText.includes("technical") ||
            lowerText.includes("competencies");
        const hasProjects =
            lowerText.includes("project") ||
            lowerText.includes("portfolio") ||
            lowerText.includes("achieved");
        const hasCertifications =
            lowerText.includes("certification") ||
            lowerText.includes("certified") ||
            lowerText.includes("course");
        const hasContact =
            /email|phone|linkedin|github|portfolio/.test(lowerText);

        let score = 0;

        // Evaluate sections
        if (hasSummary) {
            feedback.strengths.push(
                "✅ Professional Summary - Great start! Shows your value at a glance"
            );
            score += 15;
        } else {
            feedback.whatToAdd.push(
                "📝 Add a Professional Summary - 2-3 lines highlighting your key strengths and career goals"
            );
        }

        if (hasExperience) {
            feedback.strengths.push(
                "✅ Work Experience - Shows your career progression"
            );
            score += 20;
        } else {
            feedback.whatToAdd.push(
                "💼 Add Work Experience - Include job titles, companies, dates, and achievements with metrics"
            );
        }

        if (hasEducation) {
            feedback.strengths.push(
                "✅ Education - Demonstrates your academic foundation"
            );
            score += 15;
        } else {
            feedback.whatToAdd.push(
                "🎓 Add Education Section - Include degree, institution, graduation date"
            );
        }

        if (hasSkills) {
            feedback.strengths.push(
                "✅ Skills Section - Makes you searchable and relevant"
            );
            score += 15;
        } else {
            feedback.whatToAdd.push(
                "🛠️ Add Technical Skills - List programming languages, frameworks, tools, and soft skills"
            );
        }

        if (hasProjects) {
            feedback.strengths.push(
                "✅ Projects Portfolio - Shows practical application of skills"
            );
            score += 15;
        } else {
            feedback.whatToAdd.push(
                "🚀 Add Projects Section - Highlight 2-3 notable projects with descriptions and impact"
            );
        }

        if (hasCertifications) {
            feedback.strengths.push(
                "✅ Certifications - Shows commitment to continuous learning"
            );
            score += 10;
        } else {
            feedback.improvements.push(
                "💡 Consider adding relevant certifications (AWS, Google Cloud, React, etc.)"
            );
        }

        if (hasContact) {
            feedback.strengths.push(
                "✅ Contact Info - Easy for recruiters to reach you"
            );
            score += 10;
        } else {
            feedback.whatToAdd.push(
                "📧 Add Contact Information - Email, LinkedIn URL, GitHub profile, and/or portfolio website"
            );
        }

        // Check for action verbs and quantifiable achievements
        const actionVerbs = [
            "developed",
            "implemented",
            "designed",
            "created",
            "managed",
            "led",
            "increased",
            "improved",
            "optimized",
            "built",
        ];
        const hasActionVerbs = actionVerbs.some((verb) =>
            lowerText.includes(verb)
        );

        if (hasActionVerbs) {
            feedback.strengths.push(
                "✅ Action Verbs - Your CV uses strong, impactful language"
            );
        } else {
            feedback.improvements.push(
                "💡 Use Action Verbs - Replace 'Responsible for' with 'Developed', 'Implemented', 'Managed', etc."
            );
        }

        // Check for metrics/numbers
        const hasMetrics = /\d+%|\$\d+|increased|decreased|improved|\d+ team/.test(
            lowerText
        );
        if (hasMetrics) {
            feedback.strengths.push(
                "✅ Quantifiable Results - Shows measurable impact"
            );
        } else {
            feedback.improvements.push(
                "📊 Add Metrics - Include numbers: '20% performance increase', 'managed $2M budget', 'led 5+ developers'"
            );
        }

        // Check for length (should be concise)
        const wordCount = cvText.split(/\s+/).length;
        if (wordCount > 300 && wordCount < 800) {
            feedback.strengths.push(
                "✅ Length - Well-balanced (250-750 words recommended)"
            );
        } else if (wordCount > 800) {
            feedback.improvements.push(
                "✂️ Too Lengthy - Trim to 1 page (250-750 words). Remove outdated info and keep it concise"
            );
        } else if (wordCount < 150) {
            feedback.improvements.push(
                "📝 Too Short - Add more details about experience, skills, and achievements"
            );
        }

        // Generate suggestions
        feedback.suggestions = this.generateSuggestions(feedback);
        feedback.overallScore = Math.min(100, score);

        return feedback;
    }

    generateSuggestions(feedback) {
        const suggestions = [];

        if (feedback.whatToAdd.length === 0 && feedback.improvements.length <= 2) {
            suggestions.push(
                "🌟 Your CV is quite solid! Minor refinements would make it perfect."
            );
        } else if (feedback.whatToAdd.length > 3) {
            suggestions.push(
                "📋 Focus on adding the key missing sections first (Summary, Experience, Skills)"
            );
        }

        if (feedback.improvements.length > 0) {
            suggestions.push(
                "💪 Small tweaks in language and metrics will significantly boost your CV's impact"
            );
        }

        suggestions.push(
            "🎯 Remember: Tailor your CV for each job application - highlight relevant skills and experiences"
        );

        return suggestions;
    }

    formatFeedback(analysis) {
        let message = `\n📋 **CV ANALYSIS REPORT** - Score: ${analysis.overallScore}/100\n\n`;

        message += "✨ **STRENGTHS:**\n";
        if (analysis.strengths.length > 0) {
            analysis.strengths.forEach((s) => {
                message += `${s}\n`;
            });
        } else {
            message += "Consider adding more professional details.\n";
        }

        message += "\n💡 **IMPROVEMENTS NEEDED:**\n";
        if (analysis.improvements.length > 0) {
            analysis.improvements.forEach((i) => {
                message += `${i}\n`;
            });
        } else {
            message += "Great job! No major issues found.\n";
        }

        if (analysis.whatToAdd.length > 0) {
            message += "\n🎯 **WHAT TO ADD:**\n";
            analysis.whatToAdd.forEach((a) => {
                message += `${a}\n`;
            });
        }

        message += "\n🚀 **CAREER INSIGHTS:**\n";
        analysis.suggestions.forEach((s) => {
            message += `${s}\n`;
        });

        message += `\n💼 **KEY TAKEAWAYS:**\n`;
        message +=
            "1. Keep it to 1 page and action-oriented\n";
        message +=
            "2. Use numbers to show your impact\n";
        message +=
            "3. Tailor for each job application\n";
        message +=
            "4. Include links to your portfolio/GitHub\n";

        return message;
    }

    /**
     * Extract text from PDF using a simple approach
     */
    async extractTextFromFile(file) {
        if (file.type === "application/pdf") {
            // For PDF, return a message asking to paste content
            return `PDF detected (${file.name}). Since we can't parse PDFs directly in the browser chat, please:
1. Open your PDF
2. Select and copy all text (Ctrl+A, Ctrl+C)
3. Paste it back in the chat

Then I'll analyze it for you!`;
        } else if (
            file.type === "text/plain" ||
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.macro-enabled.document"
        ) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.onerror = () => {
                    reject("Could not read file");
                };
                reader.readAsText(file);
            });
        } else {
            return "Please upload a text file or PDF (or paste your CV content directly in the chat)";
        }
    }
}

export default CVAnalyzer;
