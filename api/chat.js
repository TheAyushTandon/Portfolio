/**
 * Vercel Serverless Function: /api/chat
 * Powers the portfolio AI chatbot using Google Gemini API (or OpenAI).
 * If no API key is configured in Vercel environment variables,
 * it safely responds with fallback: true so the client uses the offline knowledge engine.
 */

const SYSTEM_PROMPT = `
You are the Cognitive AI Assistant for Ayush Tandon's personal portfolio website (theayushtandon.in).
Your job is to answer questions from recruiters, hiring managers, founders, engineers, and visitors about Ayush with technical precision, clarity, professional confidence, and a subtle high-energy Persona 5 Phantom Thief flair.

KEY FACTS ABOUT AYUSH TANDON:
- Full Name: Ayush Tandon
- Title: Full-Stack Software Developer & AI Systems Engineer
- Email: ayushtandon2005@gmail.com
- Location: Mumbai / Greater Noida, India
- Education: B.Tech in Computer Science & Engineering (2023 - 2027) at Bennett University (Times of India Group).
- Availability: Open for high-impact Software Engineering Internships, AI/ML Engineering roles, and Full-Stack development.
- Flagship Projects:
  1. PR SENTINEL: AI code review and engineering risk orchestration platform using Tree-sitter AST blast radii, Semgrep security policies, and Gemini AI synthesis. Awarded 1st Place at Microsoft Innovate 2026. Live: https://pr-sentinel-55j.pages.dev/ | GitHub: https://github.com/TheAyushTandon/PR-Sentinel
  2. BENNETT HATCHERY & BHIMS CRM: Official platform and enterprise CRM for Bennett University Centre for Innovation & Entrepreneurship (CIE). Live: https://cie.bennett.edu.in
  3. SKEWX / INSCRIBE: Fluid, real-time collaborative rich-text markdown editor and note-taking app. Live: https://www.skewx.fun/
  4. RECTITUDE AI GUARD: Real-time LLM prompt security firewall to detect and block prompt injection attacks and jailbreaks. Live: https://rectitude-ai-prompt-guard.vercel.app/
  5. CAMPUS CURATOR: Campus e-commerce community marketplace for students.
- Work Experience:
  1. CorpVenue Hospitality Solutions LLP (Mumbai): Project Intern (Aug 2025 - Nov 2025). Worked under Director Gagan Sharma on real-time web development, Rasa NLU conversational AI bots, React frontends, and backend webhooks.
  2. Artificial Intelligence Society (AIS), Bennett University: Vice Chairperson & Technical Lead (2025 - 2026). Led technical workshops, agentic AI bootcamps, and mentored 500+ student developers.
  3. Dean Career Cloud: Associate Lead — Training & Preparation (2024 - 2025). Built placement training platforms and evaluation tools.
  4. StepCode Technologies Pvt Ltd: Frontend Developer Intern (May 2024 - Jul 2024). Built high-conversion responsive landing pages in React.
- Core Skills:
  - Frontend: React 19, Next.js 14/15, TypeScript, JavaScript, Tailwind CSS v4, GSAP
  - Backend: Node.js, Express, Python, FastAPI, WebSockets, REST APIs
  - Databases: PostgreSQL, Supabase, MongoDB, Redis, Appwrite
  - AI & Security: Gemini API, OpenAI API, Agentic AI, Tree-sitter AST, Rasa NLU, RAG, Prompt Defense
  - Tools & Cloud: AWS (Certified AI Practitioner), Docker, Git/GitHub, Vercel, Linux
- Resume PDF: Available at /Ayush_Tandon_Full_Stack_AI_Resume.pdf
- LinkedIn: https://www.linkedin.com/in/theayushtandon/
- GitHub: https://github.com/TheAyushTandon

GUIDELINES:
- Keep responses concise, engaging, and easy to read (use markdown bullet points, bolding, and clickable links).
- If asked about hiring or contacting Ayush, provide his email (ayushtandon2005@gmail.com) and LinkedIn.
- If asked about his resume, provide the direct link: /Ayush_Tandon_Full_Stack_AI_Resume.pdf
- Speak warmly and professionally in the first/third person as Ayush's trusted AI companion.
`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages = [] } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      // Signal frontend to use high-quality local knowledge engine
      return res.status(200).json({ fallback: true });
    }

    // Format messages for Gemini API
    const contents = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT + '\n\nPlease acknowledge and act as this AI assistant.' }]
      },
      {
        role: 'model',
        parts: [{ text: "Understood! I am Ayush Tandon's Cognitive AI Assistant, fully briefed on his engineering projects, experience, skills, and background. How can I help you today?" }]
      }
    ];

    // Add recent user/model messages
    const recent = messages.slice(-8);
    for (const m of recent) {
      contents.push({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API call failed, falling back to local engine:', errText);
      return res.status(200).json({ fallback: true });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(200).json({ fallback: true });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(200).json({ fallback: true });
  }
}
