/**
 * AI Knowledge Engine for Ayush Tandon's Portfolio
 * Provides an intelligent, zero-dependency, instant local response system
 * grounded in 100% verified facts about Ayush's background, projects, skills, and experience.
 */

export const AYUSH_PROFILE = {
  name: "Ayush Tandon",
  title: "Full-Stack Software Developer & AI Systems Engineer",
  email: "ayushtandon2005@gmail.com",
  location: "Mumbai / Greater Noida, India",
  education: {
    institution: "Bennett University (Times of India Group)",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2023 - 2027",
    cgpa: "Strong academic standing with leadership in premier tech societies"
  },
  links: {
    github: "https://github.com/TheAyushTandon",
    linkedin: "https://www.linkedin.com/in/theayushtandon/",
    resume: "/Ayush_Tandon_Full_Stack_AI_Resume.pdf",
    portfolio: "https://www.theayushtandon.in/"
  },
  availability: "Actively exploring high-impact Software Engineering Internships, AI/ML Engineering roles, and Full-Stack development opportunities.",
  summary: "Full-Stack developer and AI engineer passionate about building high-performance web applications, AI prompt firewalls, AST security gateways, and real-time collaborative platforms."
};

export const PROJECTS = [
  {
    title: "PR SENTINEL",
    badge: "1st Place Winner @ Microsoft Innovate 2026",
    summary: "AI engineering risk and PR review orchestration platform. It transforms code pull requests into measurable risk surfaces using deterministic Tree-sitter AST blast radii, Semgrep security policies, and Gemini AI synthesis.",
    stack: ["TypeScript", "React", "Gemini 1.5", "Tree-sitter", "Supabase", "Semgrep"],
    site: "https://pr-sentinel-55j.pages.dev/",
    github: "https://github.com/TheAyushTandon/PR-Sentinel"
  },
  {
    title: "BENNETT HATCHERY & BHIMS CRM",
    badge: "Enterprise Production Platform",
    summary: "Official platform and comprehensive CRM for Bennett University Centre for Innovation & Entrepreneurship (CIE). Features role-based access for Admins, Mentors, and Startup Founders with deal-flow analytics.",
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS"],
    site: "https://cie.bennett.edu.in",
    github: "https://github.com/TheAyushTandon"
  },
  {
    title: "SKEWX / INSCRIBE",
    badge: "Real-Time Collaboration",
    summary: "A fluid, high-fidelity rich-text editor and note-taking application designed with dynamic formatting, instant markdown parsing, and collaborative state synchronization.",
    stack: ["React", "Vite", "Appwrite", "GSAP"],
    site: "https://www.skewx.fun/",
    github: "https://github.com/TheAyushTandon"
  },
  {
    title: "RECTITUDE AI GUARD",
    badge: "AI Security & Safety",
    summary: "Advanced AI prompt security firewall that identifies and mitigates malicious prompt injections, indirect jailbreaks, and sensitive data leakage in real-time.",
    stack: ["Python", "FastAPI", "React", "OpenAI / LLM Guard"],
    site: "https://rectitude-ai-prompt-guard.vercel.app/",
    github: "https://github.com/TheAyushTandon"
  },
  {
    title: "CAMPUS CURATOR",
    badge: "Community Marketplace",
    summary: "Digital marketplace tailored for university students to buy, sell, and discover campus-specific products, textbooks, and services.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    site: "https://campuscurator.shop/",
    github: "https://github.com/TheAyushTandon"
  }
];

export const EXPERIENCES = [
  {
    company: "CorpVenue Hospitality Solutions LLP",
    role: "Project Intern",
    period: "Aug 2025 - Nov 2025 (Mumbai / Remote)",
    highlights: [
      "Worked directly on real-time website development and production architecture under Director Gagan Sharma.",
      "Engineered conversational AI workflows and multi-turn dialogue policies with Python and Rasa NLU.",
      "Streamlined React frontend components and resolved backend webhook bottlenecks to boost service uptime."
    ]
  },
  {
    company: "Artificial Intelligence Society (AIS)",
    role: "Vice Chairperson & Technical Lead",
    period: "2025 - 2026",
    highlights: [
      "Led premier university tech society across AI/ML workshops, hackathons, and agentic AI bootcamps.",
      "Mentored hundreds of student developers in modern AI architectures and full-stack deployment."
    ]
  },
  {
    company: "Dean Career Cloud (Bennett University)",
    role: "Associate Lead — Training & Preparation",
    period: "2024 - 2025",
    highlights: [
      "Built training preparation platforms and coordinated university-wide placement readiness initiatives.",
      "Engineered intuitive interfaces and tracking dashboards for student technical evaluation."
    ]
  },
  {
    company: "StepCode Technologies Pvt Ltd",
    role: "Frontend Developer Intern",
    period: "May 2024 - Jul 2024",
    highlights: [
      "Developed high-conversion responsive landing pages and interactive client learning modules using React and modern CSS."
    ]
  }
];

export const SKILLS = {
  frontend: ["React 19", "Next.js 14/15", "TypeScript", "JavaScript (ESNext)", "Tailwind CSS v4", "GSAP", "HTML5/CSS3"],
  backend: ["Node.js", "Express.js", "Python", "FastAPI", "RESTful APIs", "WebSockets"],
  database: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "Appwrite"],
  ai: ["Google Gemini API", "OpenAI API", "Agentic AI Workflows", "Rasa NLU", "Tree-sitter AST", "RAG Systems", "Prompt Firewalls"],
  tools: ["Git & GitHub", "Vercel", "Docker", "AWS", "Postman", "Linux", "Vite"]
};

export const CERTIFICATIONS = [
  "AWS Certified AI Practitioner (Amazon Web Services)",
  "IBM Agentic AI Specialist (IBM)",
  "Google Computer Networking & System Administration",
  "Meta React Advanced Architecture",
  "250+ LeetCode DSA Solutions (Knight Badge tier)"
];

/**
 * Intelligent Intent Matching Engine
 * Takes user prompt and returns rich, contextual answers with links
 */
export function queryKnowledgeEngine(input) {
  const q = (input || "").trim().toLowerCase();

  if (!q) {
    return "Hey there! I am Ayush's AI assistant. Ask me about his **projects**, **skills**, **internships**, **resume**, or **how to hire him**!";
  }

  // 1. Resume / CV
  if (q.includes("resume") || q.includes("cv") || q.includes("biodata") || q.includes("pdf")) {
    return (
      `Here is Ayush Tandon's **Full-Stack & AI Resume**:\n\n` +
      `📄 [Click here to View or Download Resume PDF](${AYUSH_PROFILE.links.resume})\n\n` +
      `You can also preview it directly in the portfolio by clicking the **RESUME** option in the main menu! Need me to highlight his experience or education?`
    );
  }

  // 2. Contact / Hiring / Email / Phone / Reach out
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("connect") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("availability")
  ) {
    return (
      `Ayush is actively available for **Software Engineering Internships, AI/ML Engineering roles, and Full-Stack projects**.\n\n` +
      `Here is how you can directly connect with him:\n\n` +
      `• ✉️ **Email**: [ayushtandon2005@gmail.com](mailto:${AYUSH_PROFILE.email})\n` +
      `• 💼 **LinkedIn**: [linkedin.com/in/theayushtandon](${AYUSH_PROFILE.links.linkedin})\n` +
      `• 🐙 **GitHub**: [github.com/TheAyushTandon](${AYUSH_PROFILE.links.github})\n` +
      `• 📍 **Location**: Mumbai / Greater Noida, India\n\n` +
      `Feel free to send an email or connect on LinkedIn — he typically responds within 24 hours!`
    );
  }

  // 3. Projects Overview or Specific Project
  if (
    q.includes("project") ||
    q.includes("sentinel") ||
    q.includes("hatchery") ||
    q.includes("crm") ||
    q.includes("inscribe") ||
    q.includes("skewx") ||
    q.includes("rectitude") ||
    q.includes("curator") ||
    q.includes("built") ||
    q.includes("portfolio")
  ) {
    if (q.includes("sentinel")) {
      const p = PROJECTS[0];
      return (
        `🛡️ **${p.title}** (${p.badge})\n\n` +
        `${p.summary}\n\n` +
        `• **Tech Stack**: ${p.stack.join(", ")}\n` +
        `• 🌐 **Live Demo**: [${p.site}](${p.site})\n` +
        `• 🐙 **GitHub Repo**: [${p.github}](${p.github})`
      );
    }
    if (q.includes("hatchery") || q.includes("crm") || q.includes("bhims")) {
      const p = PROJECTS[1];
      return (
        `🏢 **${p.title}** (${p.badge})\n\n` +
        `${p.summary}\n\n` +
        `• **Tech Stack**: ${p.stack.join(", ")}\n` +
        `• 🌐 **Live Portal**: [${p.site}](${p.site})`
      );
    }
    if (q.includes("inscribe") || q.includes("skewx")) {
      const p = PROJECTS[2];
      return (
        `✍️ **${p.title}** (${p.badge})\n\n` +
        `${p.summary}\n\n` +
        `• **Tech Stack**: ${p.stack.join(", ")}\n` +
        `• 🌐 **Live App**: [${p.site}](${p.site})`
      );
    }
    if (q.includes("rectitude") || q.includes("firewall") || q.includes("guard")) {
      const p = PROJECTS[3];
      return (
        `🔒 **${p.title}** (${p.badge})\n\n` +
        `${p.summary}\n\n` +
        `• **Tech Stack**: ${p.stack.join(", ")}\n` +
        `• 🌐 **Live Demo**: [${p.site}](${p.site})`
      );
    }

    // General projects list
    return (
      `Here are some of Ayush's flagship engineering projects:\n\n` +
      `1. **PR SENTINEL** (1st Place @ Microsoft Innovate 2026)\n` +
      `   AI code review & AST risk orchestration with Tree-sitter & Gemini. [Live Demo](https://pr-sentinel-55j.pages.dev/)\n\n` +
      `2. **BENNETT HATCHERY & BHIMS CRM**\n` +
      `   Full-stack Next.js/Supabase incubation portal and deal-flow CRM. [Live Portal](https://cie.bennett.edu.in)\n\n` +
      `3. **SKEWX / INSCRIBE**\n` +
      `   High-fidelity real-time rich-text markdown editor. [Live App](https://www.skewx.fun/)\n\n` +
      `4. **RECTITUDE AI GUARD**\n` +
      `   Real-time LLM prompt security firewall and jailbreak detection. [Live App](https://rectitude-ai-prompt-guard.vercel.app/)\n\n` +
      `Which project would you like to explore deeper?`
    );
  }

  // 4. Experience & Internships
  if (
    q.includes("experience") ||
    q.includes("intern") ||
    q.includes("job") ||
    q.includes("corpvenue") ||
    q.includes("ais") ||
    q.includes("career cloud") ||
    q.includes("work") ||
    q.includes("stepcode")
  ) {
    return (
      `Ayush's practical engineering & leadership background includes:\n\n` +
      `• **CorpVenue Hospitality Solutions LLP** (Aug 2025 - Nov 2025)\n` +
      `  *Project Intern (Mumbai)*: Built real-time web development features, engineered Rasa NLU conversational bots, and optimized production webhooks.\n\n` +
      `• **Artificial Intelligence Society (AIS)** (2025 - 2026)\n` +
      `  *Vice Chairperson*: Led university AI community, conducted agentic AI bootcamps, and mentored over 500+ student developers.\n\n` +
      `• **Dean Career Cloud** (2024 - 2025)\n` +
      `  *Associate Lead — Training & Prep*: Built student readiness dashboards and coordinated technical workshops.\n\n` +
      `• **StepCode Technologies Pvt Ltd** (May 2024 - Jul 2024)\n` +
      `  *Frontend Developer Intern*: Built responsive UI interfaces and high-conversion client modules.\n\n` +
      `Would you like to know more about his contributions at CorpVenue or AIS?`
    );
  }

  // 5. Skills & Tech Stack
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("react") ||
    q.includes("node") ||
    q.includes("python") ||
    q.includes("ai") ||
    q.includes("tools")
  ) {
    return (
      `Ayush's core technical toolkit spans full-stack engineering and applied AI:\n\n` +
      `• **Frontend**: React 19, Next.js 14/15, TypeScript, Tailwind CSS v4, GSAP, Redux\n` +
      `• **Backend & APIs**: Node.js, Express, Python, FastAPI, WebSockets, RESTful APIs\n` +
      `• **Databases**: PostgreSQL, Supabase, MongoDB, Redis, Appwrite\n` +
      `• **Applied AI & Security**: Google Gemini API, OpenAI API, Agentic AI, Tree-sitter AST, Rasa NLU, RAG, Prompt Defense\n` +
      `• **DevOps & Cloud**: AWS (Certified AI Practitioner), Docker, Vercel, Git/GitHub, Linux\n\n` +
      `He specializes in combining slick frontend animations with rock-solid backend and AI architectures.`
    );
  }

  // 6. Certifications & Education
  if (
    q.includes("certif") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("bennett") ||
    q.includes("education") ||
    q.includes("award") ||
    q.includes("hackathon")
  ) {
    return (
      `🎓 **Education**:\n` +
      `• **Bennett University (Times of India Group)**\n` +
      `  B.Tech in Computer Science & Engineering (2023 - 2027)\n\n` +
      `🏆 **Key Accolades & Certifications**:\n` +
      `• 🥇 **1st Place Winner** — Microsoft Innovate 2026 (for PR Sentinel)\n` +
      `• ☁️ **AWS Certified AI Practitioner** — Amazon Web Services\n` +
      `• 🤖 **IBM Agentic AI Specialist** — IBM\n` +
      `• 🌐 **Google Computer Networking & System Administration**\n` +
      `• ⚔️ **250+ LeetCode DSA Solutions** (Knight Badge tier)`
    );
  }

  // 7. Persona 5 / Easter eggs
  if (
    q.includes("persona") ||
    q.includes("phantom") ||
    q.includes("joker") ||
    q.includes("morgana") ||
    q.includes("metaverse") ||
    q.includes("steal your heart")
  ) {
    return (
      `🎭 *"Take Your Heart!"*\n\n` +
      `You recognized the Persona 5 aesthetic! Ayush designed this entire portfolio inspired by the high-contrast red-black typography, tactical menus, and sleek animations of Persona 5.\n\n` +
      `Looking for your next star phantom thief engineer? [Connect with Ayush here](mailto:${AYUSH_PROFILE.email})!`
    );
  }

  // 8. Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.includes("who are you") ||
    q.includes("what can you do") ||
    q.includes("namaste")
  ) {
    return (
      `Hello! I am **Ayush's Cognitive AI Assistant**.\n\n` +
      `I can help you explore:\n` +
      `• 🚀 **Flagship Projects** (PR Sentinel, Bennett Hatchery, Inscribe)\n` +
      `• 💼 **Work Experience** (CorpVenue, AIS Vice Chair, CIE)\n` +
      `• 🧠 **Tech Stack & Skills** (React, Next.js, Python, Applied AI)\n` +
      `• 📄 **Resume Download**\n` +
      `• 📬 **Contact & Hiring Availability**\n\n` +
      `What would you like to know?`
    );
  }

  // 9. Default Fallback
  return (
    `Ayush Tandon is a **Full-Stack Software Developer & AI Systems Engineer** based in Mumbai / Greater Noida, currently in his 3rd year of Computer Science at Bennett University.\n\n` +
    `He is the creator of **PR Sentinel** (1st place at Microsoft Innovate 2026), interned at **CorpVenue Hospitality Solutions**, and serves as **Vice Chairperson of the Artificial Intelligence Society**.\n\n` +
    `You can ask me specifically about:\n` +
    `• "Tell me about PR Sentinel"\n` +
    `• "What are your core skills?"\n` +
    `• "Can I download your resume?"\n` +
    `• "How can I hire or contact Ayush?"\n\n` +
    `Or write to him directly at [${AYUSH_PROFILE.email}](mailto:${AYUSH_PROFILE.email})!`
  );
}
