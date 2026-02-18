import * as pdfjsLib from 'pdfjs-dist';

// Robust Worker Setup using a reliable CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

class CVAnalyzer {
    // 1. Analyze function (Aapka original logic)
    analyze(cvText) {
        const lowerText = cvText.toLowerCase();
        const feedback = {
            strengths: [],
            improvements: [],
            whatToAdd: [],
            overallScore: 0,
            suggestions: [],
        };

        const hasSummary = /summary|objective|professional|about/.test(lowerText);
        const hasExperience = /experience|work|employment/.test(lowerText);
        const hasEducation = /education|degree|university/.test(lowerText);
        const hasSkills = /skills|technical|competencies/.test(lowerText);
        const hasContact = /email|phone|linkedin|github|portfolio/.test(lowerText);

        let score = 0;
        if (hasSummary) { feedback.strengths.push("✅ Professional Summary - Great start!"); score += 20; }
        else { feedback.whatToAdd.push("📝 Add a Professional Summary"); }

        if (hasExperience) { feedback.strengths.push("✅ Work Experience - Good progression"); score += 30; }
        else { feedback.whatToAdd.push("💼 Add Work Experience"); }

        if (hasEducation) { feedback.strengths.push("✅ Education included"); score += 20; }
        if (hasSkills) { feedback.strengths.push("✅ Skills Section included"); score += 20; }
        if (hasContact) { feedback.strengths.push("✅ Contact Info provided"); score += 10; }

        feedback.overallScore = Math.min(100, score);
        return feedback;
    }

    // 2. FIXED & IMPROVED Extraction Logic
    async extractTextFromFile(file) {
        if (file.type === "application/pdf") {
            try {
                const arrayBuffer = await file.arrayBuffer();
                // Loading the PDF document
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;

                let fullText = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    // Improved mapping to catch all text strings
                    const pageText = textContent.items
                        .map(item => item.str)
                        .join(" ");

                    fullText += pageText + "\n";
                }

                if (fullText.trim().length === 0) {
                    return "EMPTY_PDF_IMAGE"; // Yeh tab hoga agar PDF sirf images se bani ho
                }

                return fullText;
            } catch (err) {
                console.error("PDF Read Error:", err);
                return "ERROR_READING_FILE";
            }
        } else if (file.type === "text/plain") {
            return await file.text();
        } else {
            return "UNSUPPORTED_TYPE";
        }
    }
}

export default CVAnalyzer;