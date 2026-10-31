import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, 
  RotateCcw, 
  Sparkles, 
  ExternalLink, 
  Bot, 
  User, 
  ChevronDown 
} from 'lucide-react';
import { queryKnowledgeEngine } from '../utils/aiKnowledgeEngine';
import './AiChatbot.css';

const INITIAL_MESSAGE = {
  id: 'init-1',
  sender: 'bot',
  text: "Hey! I am **Ayush's Cognitive AI Assistant**. Ask me anything about his **flagship projects** (like PR Sentinel), **internship at CorpVenue**, **technical stack**, or **how to hire him**!",
  timestamp: 'Just now'
};

const QUICK_PROMPTS = [
  { label: '🚀 Key Projects', query: 'Tell me about your key projects and live demos' },
  { label: '💼 Work Experience', query: 'What is your work experience and internships?' },
  { label: '🧠 Tech Stack', query: 'What are your core programming languages and skills?' },
  { label: '📄 Get Resume', query: 'Can I download your resume?' },
  { label: '📬 How to Hire', query: 'How can I contact and hire Ayush?' },
  { label: '🏆 Accolades', query: 'What hackathons or certifications have you won?' }
];

export default function AiChatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('portfolio_ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [INITIAL_MESSAGE];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const msgSeqRef = useRef(100);

  // Save to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('portfolio_ai_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Scroll to bottom when messages update
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping, scrollToBottom]);

  // Send a message
  const handleSend = async (customText = null) => {
    const textToSend = typeof customText === 'string' ? customText : inputValue;
    if (!textToSend.trim() || isTyping) return;

    msgSeqRef.current += 1;
    const userMessage = {
      id: `usr-${msgSeqRef.current}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      // 1. Try serverless backend (/api/chat)
      let botResponse = null;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.reply && !data.fallback) {
            botResponse = data.reply;
          }
        }
      } catch (err) {
        // Backend not available or offline, smoothly fallback to knowledge engine
        console.debug('Using local AI knowledge engine:', err.message);
      }

      // 2. If no backend reply, use local knowledge engine
      if (!botResponse) {
        // Add a slight natural delay for organic conversational feel
        await new Promise((r) => setTimeout(r, 450));
        botResponse = queryKnowledgeEngine(textToSend);
      }

      msgSeqRef.current += 1;
      const botMessage = {
        id: `bot-${msgSeqRef.current}`,
        sender: 'bot',
        text: botResponse,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      msgSeqRef.current += 1;
      const fallbackMsg = {
        id: `bot-${msgSeqRef.current}`,
        sender: 'bot',
        text: queryKnowledgeEngine(textToSend),
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    try {
      sessionStorage.removeItem('portfolio_ai_chat_history');
    } catch {}
  };

  // Simple Markdown Parser for Links, Bold, and Lists
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    // Split paragraphs by double newline
    const paragraphs = rawText.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      // Check if this paragraph contains bullet lines
      const lines = para.split('\n');
      const isBulletList = lines.every((l) => l.trim().startsWith('•') || l.trim().startsWith('-') || /^\d+\./.test(l.trim()));

      if (isBulletList) {
        return (
          <ul key={pIdx} className="p5-chat-list">
            {lines.map((line, lIdx) => {
              const cleaned = line.replace(/^[•\-\d.]+\s*/, '');
              return <li key={lIdx}>{formatInline(cleaned)}</li>;
            })}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="p5-chat-para">
          {lines.map((line, lIdx) => (
            <span key={lIdx}>
              {formatInline(line)}
              {lIdx < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    });
  };

  const formatInline = (text) => {
    // Match [label](url) and **bold** and *italic*
    const parts = [];
    let remaining = text;
    let keyCounter = 0;

    // Regex for markdown links [text](url) and **bold**
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const boldRegex = /\*\*([^*]+)\*\*/;

    while (remaining) {
      const linkMatch = remaining.match(linkRegex);
      const boldMatch = remaining.match(boldRegex);

      let earliestMatch = null;
      let matchType = null;

      if (linkMatch && boldMatch) {
        if (linkMatch.index < boldMatch.index) {
          earliestMatch = linkMatch;
          matchType = 'link';
        } else {
          earliestMatch = boldMatch;
          matchType = 'bold';
        }
      } else if (linkMatch) {
        earliestMatch = linkMatch;
        matchType = 'link';
      } else if (boldMatch) {
        earliestMatch = boldMatch;
        matchType = 'bold';
      }

      if (!earliestMatch) {
        parts.push(remaining);
        break;
      }

      // Add text before match
      if (earliestMatch.index > 0) {
        parts.push(remaining.slice(0, earliestMatch.index));
      }

      if (matchType === 'link') {
        const linkText = earliestMatch[1];
        const href = earliestMatch[2];
        const isPdf = href.endsWith('.pdf');
        const isInternal = href.startsWith('/') && !isPdf;

        if (isInternal && onNavigate) {
          parts.push(
            <button
              key={keyCounter++}
              type="button"
              className="p5-chat-link-btn"
              onClick={() => onNavigate(href.replace('/', ''))}
            >
              {linkText}
            </button>
          );
        } else {
          parts.push(
            <a
              key={keyCounter++}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p5-chat-link"
            >
              {linkText}
              <ExternalLink size={12} style={{ display: 'inline', marginLeft: '3px' }} />
            </a>
          );
        }
      } else if (matchType === 'bold') {
        parts.push(
          <strong key={keyCounter++} className="p5-chat-strong">
            {formatInline(earliestMatch[1])}
          </strong>
        );
      }

      remaining = remaining.slice(earliestMatch.index + earliestMatch[0].length);
    }

    return parts;
  };

  return (
    <div className="p5-chatbot-wrapper">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          className="p5-chat-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Ayush's Cognitive AI Assistant"
          title="Talk to Ayush's AI"
        >
          <div className="p5-launcher-beacon" />
          <div className="p5-launcher-content">
            <Bot size={22} className="p5-launcher-icon" />
            <span className="p5-launcher-label font-p5">TALK TO AYUSH (AI)</span>
            <span className="p5-launcher-badge">ONLINE</span>
          </div>
        </button>
      )}

      {/* Expanded Persona 5 Chat Console */}
      {isOpen && (
        <div className="p5-chat-window" role="dialog" aria-label="Ayush AI Assistant">
          {/* Header */}
          <div className="p5-chat-header">
            <div className="p5-chat-title-group">
              <div className="p5-chat-avatar">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-p5 p5-chat-title">AYUSH COGNITION // AI</h3>
                <div className="p5-chat-status">
                  <span className="p5-status-dot" />
                  <span>ONLINE &bull; FULL-STACK AI AGENT</span>
                </div>
              </div>
            </div>

            <div className="p5-chat-header-actions">
              <button
                type="button"
                onClick={handleClear}
                className="p5-chat-action-btn"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p5-chat-action-btn p5-chat-close-btn"
                title="Minimize chat"
                aria-label="Close chat"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p5-chat-chips">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                className="p5-chip-btn font-p5"
                onClick={() => handleSend(qp.query)}
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="p5-chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`p5-msg-row ${m.sender === 'user' ? 'p5-msg-user' : 'p5-msg-bot'}`}>
                <div className="p5-msg-avatar">
                  {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="p5-msg-bubble">
                  <div className="p5-msg-content">{renderFormattedText(m.text)}</div>
                  <span className="p5-msg-time">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="p5-msg-row p5-msg-bot">
                <div className="p5-msg-avatar">
                  <Bot size={14} />
                </div>
                <div className="p5-msg-bubble p5-msg-typing">
                  <span className="p5-typing-label font-p5">ANALYZING</span>
                  <span className="p5-dot-pulse" />
                  <span className="p5-dot-pulse" />
                  <span className="p5-dot-pulse" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Console */}
          <form
            className="p5-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Ayush's projects, experience, skills..."
              className="p5-chat-input"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="p5-chat-send-btn font-p5"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send query"
            >
              <Send size={16} />
              <span>SEND</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
