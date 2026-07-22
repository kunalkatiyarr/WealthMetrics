import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Info, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

function AiAdvisor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your AI Financial Advisor. I have analyzed your current portfolio: a net worth of ₹3.76 Crore, a monthly salary inflow of ₹1.85 L, and an average outflow of ₹59,600. How can I help you optimize your wealth today?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);

  const chatEndRef = useRef(null);

  const suggestionChips = [
    { label: "Can I afford a ₹25 lakh car?", value: "car" },
    { label: "Am I spending too much?", value: "spending" },
    { label: "How can I save more?", value: "saving" },
    { label: "Should I invest in stocks or real estate?", value: "allocation" },
    { label: "What if I invest ₹10,000 monthly?", value: "invest_projection" }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text, id) => {
    if (!window.speechSynthesis) return;
    
    if (speakingMsgId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);
    setSpeakingMsgId(id);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (e) => {
      console.error(e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.start();
  };

  const generateProjectionData = () => {
    const data = [];
    let principal = 0;
    let totalInvested = 0;
    for (let year = 1; year <= 15; year++) {
      totalInvested += 120000; 
      principal = (principal + 120000) * 1.12; 
      data.push({
        year: `Yr ${year}`,
        Invested: Math.round(totalInvested),
        Value: Math.round(principal)
      });
    }
    return data;
  };

  const getBotResponse = (value, customText = '') => {
    if (value === 'car') {
      return {
        text: "Yes, a ₹25 Lakh car is affordable. Your net worth is ₹3.76 Cr, with a monthly surplus of ₹1,25,400. To maximize equity returns, we recommend a down payment of ₹10 Lakhs and a loan of ₹15 Lakhs for 5 years at ~9.5%. EMI will be ~₹31,500/month, consuming only 25% of your surplus.",
      };
    } else if (value === 'spending') {
      return {
        text: "Your monthly burn rate is healthy at 32.2% of your ₹1.85 L salary. However, Swiggy orders rose 18% and SaaS tools cost ₹4,200. Reducing restaurant orders by ₹2,500/month could save ₹30,000/year to redirect into your mutual fund portfolio.",
      };
    } else if (value === 'saving') {
      return {
        text: "Three ways to save more: 1) Automate SIP increases by 10% annually. 2) Cap food and shopping to ₹20,000 in your Budget Planner. 3) Allocate ₹1.5 Lakhs in ELSS funds for tax deductions, saving up to ₹46,800/year in taxes.",
      };
    } else if (value === 'allocation') {
      return {
        text: "Your asset allocation is skewed: 99.5% is in Real Estate (₹3.67 Cr) and only 0.8% in Stocks (₹3 L). You lack liquidity. We advise redirecting your monthly savings of ₹1.25 L into mutual funds to rebalance and build liquid cash buffers.",
      };
    } else if (value === 'invest_projection') {
      return {
        text: "Investing ₹10,000 monthly at 12% returns will grow your capital to ₹50 Lakhs in 15 years. This chart illustrates your invested capital versus compounded future portfolio value.",
        chart: generateProjectionData()
      };
    } else {
      return {
        text: `Based on your assets (₹3.67 Cr property, ₹3 L stocks, and ₹1.25 L surplus), we suggest keeping an emergency fund of ₹3.6 L. Divert remaining savings to equity. For custom queries on "${customText}", we suggest reviewing your monthly cashflow analytics.`
      };
    }
  };

  const handleSendMessage = (textToSend, actionValue = '') => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(actionValue, textToSend);
      const botMsgId = Date.now() + 1;
      const botMsg = {
        id: botMsgId,
        sender: 'bot',
        text: response.text,
        chart: response.chart,
        time: 'Just now'
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (!isMuted) {
        speakText(response.text, botMsgId);
      }
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.04) 0px, transparent 50%), radial-gradient(at 50% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.03) 0px, transparent 50%), #f8fafc', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow blobs */}
      <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'rgba(79, 70, 229, 0.03)', filter: 'blur(100px)', borderRadius: '50%', top: '20%', right: '10%', zIndex: 0 }}></div>

      <Sidebar />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 1 }}>
        
        {/* Header */}
        <header style={{ padding: '24px 40px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
              <Sparkles color="#4f46e5" size={24} /> AI Financial Advisor
              <span style={{ background: 'linear-gradient(135deg, #f59e0b, #06b6d4)', color: '#ffffff', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginLeft: '6px', boxShadow: '0 2px 6px rgba(245, 158, 11, 0.2)' }}>Gemini AI</span>
            </h1>
            <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>Personalized investment advice powered by Gemini AI. (Concise Voice Replies enabled)</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Global Voice Toggle */}
            <button 
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (nextMuted && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setSpeakingMsgId(null);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: isMuted ? 'rgba(239, 68, 68, 0.08)' : 'rgba(79, 70, 229, 0.08)',
                color: isMuted ? '#ef4444' : '#4f46e5',
                border: `1px solid ${isMuted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(79, 70, 229, 0.15)'}`,
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isMuted ? 'Muted' : 'Auto Voice'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(79, 70, 229, 0.08)', color: '#4f46e5', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
              <Bot size={16} /> Online
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '24px 40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                display: 'flex', 
                gap: '12px', 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: msg.sender === 'user' ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(59, 130, 246, 0.1))' : 'rgba(226, 232, 240, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${msg.sender === 'user' ? 'rgba(79, 70, 229, 0.2)' : '#cbd5e1'}`,
                flexShrink: 0
              }}>
                {msg.sender === 'user' ? <User size={18} color="#4f46e5" /> : <Bot size={18} color="#475569" />}
              </div>

              {/* Speech Bubble */}
              <div 
                className="glass-card" 
                style={{ 
                  padding: '16px 20px', 
                  borderRadius: msg.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(99, 102, 241, 0.03))' : 'rgba(255, 255, 255, 0.85)',
                  border: `1px solid ${msg.sender === 'user' ? 'rgba(79, 70, 229, 0.15)' : 'rgba(226, 232, 240, 0.6)'}`,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.01)',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6', fontSize: '14px', color: '#0f172a' }}>
                    {msg.text}
                  </div>
                  
                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => speakText(msg.text, msg.id)}
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer', 
                        color: speakingMsgId === msg.id ? '#4f46e5' : '#64748b',
                        padding: '4px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Read aloud"
                    >
                      <Volume2 size={16} className={speakingMsgId === msg.id ? 'animate-pulse' : ''} />
                    </button>
                  )}
                </div>

                {/* If chart is attached */}
                {msg.chart && (
                  <div className="glass-card" style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', height: '220px', width: '100%', minWidth: '320px', border: '1px solid #cbd5e1' }}>
                    <h4 style={{ fontSize: '12px', color: '#475569', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase' }}>15-Year Compound Growth Chart (₹10,000/mo at 12%)</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={msg.chart}>
                        <defs>
                          <linearGradient id="chartValColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="year" stroke="#475569" fontSize={10} />
                        <YAxis stroke="#475569" fontSize={10} tickFormatter={(v) => `₹${v/100000}L`} />
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="Value" name="Portfolio Value" stroke="#4f46e5" fillOpacity={1} fill="url(#chartValColor)" strokeWidth={2.5} />
                        <Area type="monotone" dataKey="Invested" name="Invested Capital" stroke="#94a3b8" fill="none" strokeWidth={1.5} strokeDasharray="3 3" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'rgba(79, 70, 229, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(79, 70, 229, 0.15)'
              }}>
                <Bot size={18} color="#4f46e5" />
              </div>
              <div className="glass-card" style={{ padding: '14px 20px', borderRadius: '4px 18px 18px 18px', display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4f46e5', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4f46e5', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4f46e5', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div style={{ padding: '12px 40px 0', display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', zIndex: 5 }}>
          {suggestionChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(chip.label, chip.value)}
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#475569',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(79, 70, 229, 0.08)';
                e.target.style.borderColor = 'rgba(79, 70, 229, 0.3)';
                e.target.style.color = '#4f46e5';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.color = '#475569';
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div style={{ padding: '20px 40px 10px', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff', zIndex: 5 }}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            style={{ display: 'flex', gap: '12px', position: 'relative' }}
          >
            <input 
              type="text" 
              className="glass-input" 
              placeholder={isListening ? "Listening... Speak now..." : "Ask anything about saving rates, property holdings..."}
              style={{ 
                width: '100%', 
                paddingRight: '98px', 
                height: '48px',
                borderColor: isListening ? '#ef4444' : '#cbd5e1',
                boxShadow: isListening ? '0 0 14px rgba(239, 68, 68, 0.4)' : 'none'
              }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isListening}
            />

            {/* Glowing Mic button */}
            <button 
              type="button"
              onClick={startListening}
              style={{
                position: 'absolute',
                right: '50px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: isListening ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : '#f1f5f9',
                border: `1px solid ${isListening ? '#ef4444' : '#e2e8f0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isListening ? '#ffffff' : '#475569',
                boxShadow: isListening ? '0 4px 10px rgba(239, 68, 68, 0.4)' : 'none',
                transition: 'all 0.2s'
              }}
              title="Voice Input (Speech-to-Text)"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <button 
              type="submit" 
              style={{ 
                position: 'absolute', 
                right: '6px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                width: '38px', 
                height: '38px', 
                borderRadius: '8px', 
                background: 'linear-gradient(135deg, #4f46e5, #6d28d9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(79, 70, 229, 0.2)'
              }}
            >
              <Send size={16} color="#fff" />
            </button>
          </form>

          {/* Disclaimer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: '#64748b', fontSize: '11px', lineHeight: '1.4' }}>
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>Disclaimer: The responses generated by the AI Financial Advisor are purely for educational purposes and do not represent professional financial, investment, or tax advice.</span>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AiAdvisor;
