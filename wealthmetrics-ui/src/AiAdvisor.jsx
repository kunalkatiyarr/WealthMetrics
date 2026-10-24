import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  Info, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  ArrowRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

function AiAdvisor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Welcome to WealthMetrics Strategy Desk. I have synthesized your consolidated assets: a net worth of ₹3.76 Crore, a monthly salary inflow of ₹1.85 L, and an average outflow of ₹59,600. How can I assist in capital allocation, burn rate reduction, or wealth compounding today?",
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
    }, 900);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar />

      <main className="wm-page-main" style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingBottom: '24px' }}>
        
        {/* ------------------------------------------------------------------
            SECTION 1: EDITORIAL HERO & STRATEGIST STATUS
            ------------------------------------------------------------------ */}
        <section className="wm-page-hero" style={{ marginBottom: '24px', flexShrink: 0 }}>
          <div className="wm-page-hero-content">
            <span className="wm-eyebrow">AI Financial Intelligence & Advisory</span>
            <h1 className="wm-hero-title">
              Your Financial<br />
              Advisor,<br />
              Always Thinking.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '14px 0 0 0', maxWidth: '640px' }}>
              Autonomous digital financial strategist synthesizing portfolio valuations, cash burn rates, and capital rebalancing protocols.
            </p>
          </div>

          <div className="wm-page-actions">
            {/* Audio Readout Switch */}
            <button 
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (nextMuted && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setSpeakingMsgId(null);
                }
              }}
              className="wm-btn wm-btn-outline"
              style={{ padding: '8px 16px', fontSize: '12px' }}
              aria-label={isMuted ? "Enable automated voice speech" : "Mute automated voice speech"}
            >
              {isMuted ? <VolumeX size={15} color="#DC2626" /> : <Volume2 size={15} color="#8B00FF" />}
              <span>{isMuted ? 'Voice Muted' : 'Auto Voice On'}</span>
            </button>

            {/* Model Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                borderRadius: '4px', 
                background: '#F0FDF4', 
                border: '1px solid #BBF7D0',
                fontSize: '12px',
                fontWeight: '700',
                color: '#059669',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
              AI Financial Strategist · Strategy Desk Active
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: STRATEGIC ADVISORY WORKSPACE (MEMO STREAM)
            ------------------------------------------------------------------ */}
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '8px 4px 20px 4px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '24px',
            minHeight: '260px'
          }}
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                width: '100%',
                display: 'flex', 
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.sender === 'user' ? (
                /* User Strategic Query */
                <div className="wm-client-query" style={{ maxWidth: '640px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="wm-eyebrow" style={{ color: '#8B00FF', margin: 0 }}>
                      Client Strategic Inquiry
                    </span>
                    <span style={{ fontSize: '11px', color: '#6B7280' }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#111111', lineHeight: '1.5' }}>
                    {msg.text}
                  </div>
                </div>
              ) : (
                /* AI Advisory Memo Card */
                <div className="wm-advisory-memo" style={{ maxWidth: '820px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '4px', 
                          background: '#FAF5FF', 
                          border: '1px solid #E9D5FF',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: '#8B00FF'
                        }}
                      >
                        <BrainCircuit size={18} />
                      </div>
                      <div>
                        <span className="wm-eyebrow" style={{ margin: 0 }}>WealthMetrics Advisory Memo</span>
                        <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Executive Portfolio Synthesis · {msg.time}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => speakText(msg.text, msg.id)}
                      style={{ 
                        background: speakingMsgId === msg.id ? 'var(--wm-bg-lavender)' : 'transparent', 
                        border: '1px solid var(--wm-border)', 
                        cursor: 'pointer', 
                        color: speakingMsgId === msg.id ? '#8B00FF' : '#6B7280',
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                      }}
                      aria-label="Listen to strategy memo"
                      title="Read strategy memo aloud"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div style={{ fontSize: '14px', color: '#111111', lineHeight: '1.7', fontWeight: '500', whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>

                  {/* Optional Embedded Compound Projection Chart */}
                  {msg.chart && (
                    <div style={{ marginTop: '20px', padding: '20px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div>
                          <span className="wm-eyebrow">Compounding Simulation</span>
                          <h4 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                            15-Year Horizon (₹10,000/mo Contribution at 12% Annualized)
                          </h4>
                        </div>
                        <span className="wm-badge-positive">
                          <TrendingUp size={13} /> ₹50 Lakh Goal
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '220px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={msg.chart}>
                            <defs>
                              <linearGradient id="advisorChartFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B00FF" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#8B00FF" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="year" stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} />
                            <YAxis stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `₹${v/100000}L`} />
                            <Tooltip 
                              formatter={(val) => [`₹${val.toLocaleString()}`, '']} 
                              contentStyle={{ background: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '4px' }} 
                            />
                            <Area type="monotone" dataKey="Value" name="Portfolio Value" stroke="#8B00FF" fillOpacity={1} fill="url(#advisorChartFill)" strokeWidth={2.5} />
                            <Area type="monotone" dataKey="Invested" name="Invested Capital" stroke="#9CA3AF" fill="none" strokeWidth={1.5} strokeDasharray="3 3" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="wm-advisory-memo" style={{ maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '4px', 
                  background: '#FAF5FF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#8B00FF'
                }}
              >
                <BrainCircuit size={16} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Synthesizing strategic allocation guidance...
              </span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ------------------------------------------------------------------
            SECTION 3: SUGGESTED STRATEGIC INQUIRIES
            ------------------------------------------------------------------ */}
        <div style={{ marginBottom: '14px', flexShrink: 0 }}>
          <span className="wm-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            Recommended Strategic Queries
          </span>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip.label, chip.value)}
                style={{
                  flexShrink: 0,
                  padding: '9px 16px',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  border: '1px solid var(--wm-border)',
                  color: '#111111',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8B00FF';
                  e.currentTarget.style.backgroundColor = '#FAF5FF';
                  e.currentTarget.style.color = '#8B00FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--wm-border)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#111111';
                }}
              >
                <span>{chip.label}</span>
                <ArrowRight size={12} color="#8B00FF" />
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            SECTION 4: CLIENT PROMPT INPUT DOCK
            ------------------------------------------------------------------ */}
        <div style={{ flexShrink: 0, background: '#FFFFFF', border: '1px solid var(--wm-border)', borderRadius: '4px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
          >
            <div style={{ flex: 1, position: 'relative' }}>
              <input 
                type="text" 
                className="wm-input" 
                placeholder={isListening ? "Listening... Speak your financial strategy query..." : "Ask your advisor regarding car affordability, burn rates, asset allocation..."}
                style={{ 
                  height: '46px',
                  paddingRight: '50px',
                  borderColor: isListening ? '#DC2626' : undefined
                }}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isListening}
                aria-label="Financial inquiry prompt"
              />

              {/* Glowing Mic button */}
              <button 
                type="button"
                onClick={startListening}
                className={isListening ? 'wm-mic-listening' : ''}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '4px',
                  background: isListening ? '#DC2626' : 'var(--wm-bg-secondary)',
                  border: `1px solid ${isListening ? '#DC2626' : 'var(--wm-border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: isListening ? '#FFFFFF' : '#374151',
                  transition: 'all 0.2s'
                }}
                aria-label="Voice input"
                title="Voice Input (Speech-to-Text)"
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            </div>

            <button 
              type="submit" 
              className="wm-btn wm-btn-primary"
              style={{ height: '46px', padding: '0 24px', flexShrink: 0 }}
              aria-label="Send financial prompt"
            >
              <span>Ask Your Advisor</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Legal Disclaimer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', color: '#6B7280', fontSize: '11px' }}>
            <Info size={13} style={{ flexShrink: 0 }} />
            <span>Advisory statements are generated from verified internal ledger telemetry and do not constitute formal fiduciary tax or legal advice.</span>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AiAdvisor;
