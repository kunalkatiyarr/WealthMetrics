import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle,
  Sparkles,
  TrendingDown,
  Volume2,
  Mic,
  MicOff,
  Search
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [speakingInsightIdx, setSpeakingInsightIdx] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Mock data for AI Expense Analysis
  const comparisonData = {
    currentMonthOutflow: 59600,
    previousMonthOutflow: 50200,
    changePercentage: 18.7,
    savingsGoal: 50000,
    estimatedSavings: 30000
  };

  const unusualSpending = [
    { id: 1, title: 'Swiggy / Zomato Food Delivery', category: 'Food & Dining', normalAverage: 12000, currentSpent: 20264, deviation: 68, icon: AlertTriangle, status: 'Critical' },
    { id: 2, title: 'Amazon Electronics', category: 'Shopping', normalAverage: 5000, currentSpent: 10200, deviation: 104, icon: ArrowUpRight, status: 'Warning' }
  ];

  const overspendingCategories = [
    { category: 'Food & Dining', budget: 15000, spent: 20264, overBy: 5264 },
    { category: 'Shopping', budget: 8000, spent: 10200, overBy: 2200 }
  ];

  const recurringSubscriptions = [
    { name: 'Mutual Fund Auto SIP', frequency: 'Monthly', amount: 20000, type: 'Investment', status: 'Active' },
    { name: 'Apartment Maintenance', frequency: 'Monthly', amount: 18000, type: 'Housing', status: 'Active' },
    { name: 'AWS Cloud Hosting', frequency: 'Monthly', amount: 3200, type: 'Tech Utility', status: 'Active' },
    { name: 'Netflix Premium', frequency: 'Monthly', amount: 649, type: 'Entertainment', status: 'Active' },
    { name: 'YouTube Premium', frequency: 'Monthly', amount: 189, type: 'Entertainment', status: 'Active' }
  ];

  const trendData = [
    { month: 'Mar', Outflow: 48000, Inflow: 185000 },
    { month: 'Apr', Outflow: 64000, Inflow: 195000 },
    { month: 'May', Outflow: 51000, Inflow: 185000 },
    { month: 'Jun', Outflow: 58000, Inflow: 210000 },
    { month: 'Jul', Outflow: 50200, Inflow: 185000 },
    { month: 'Aug', Outflow: 59600, Inflow: 185000 }
  ];

  const categoryComparison = [
    { name: 'Food & Dining', LastMonth: 14500, ThisMonth: 20264, change: 39.7 },
    { name: 'Investment SIP', LastMonth: 20000, ThisMonth: 20000, change: 0.0 },
    { name: 'Housing', LastMonth: 18000, ThisMonth: 18000, change: 0.0 },
    { name: 'Shopping', LastMonth: 4800, ThisMonth: 10200, change: 112.5 },
    { name: 'Tech / Utility', LastMonth: 3400, ThisMonth: 3200, change: -5.8 }
  ];

  const aiInsights = [
    { text: "Food & Dining expenses increased by 39.7% compared to last month due to high Swiggy delivery volume.", type: 'negative' },
    { text: "Shopping exceeded your average monthly allowance by ₹5,200.", type: 'negative' },
    { text: "Reducing restaurant orders by ₹2,500/month could save you ₹30,000/year.", type: 'positive' },
    { text: "Tech utility fees decreased by 5.8% due to AWS instance termination.", type: 'positive' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => {
      clearTimeout(timer);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakInsight = (text, idx) => {
    if (!window.speechSynthesis) return;

    if (speakingInsightIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingInsightIdx(null);
      return;
    }

    window.speechSynthesis.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeakingInsightIdx(null);
    utterance.onerror = () => setSpeakingInsightIdx(null);
    setSpeakingInsightIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition API is not supported in this browser. Please try Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      setFilterQuery(event.results[0][0].transcript);
    };
    recognition.start();
  };

  // Filters based on query
  const filteredInsights = aiInsights.filter(x => 
    x.text.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredUnusual = unusualSpending.filter(x => 
    x.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    x.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredSubscriptions = recurringSubscriptions.filter(x => 
    x.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
    x.type.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          {/* Header Skeleton */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <div className="skeleton" style={{ width: '220px', height: '32px', marginBottom: '8px' }}></div>
              <div className="skeleton" style={{ width: '300px', height: '16px' }}></div>
            </div>
            <div className="skeleton" style={{ width: '130px', height: '40px' }}></div>
          </div>

          {/* Top Cards Skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="glass-card" style={{ padding: '24px', height: '120px' }}>
              <div className="skeleton" style={{ width: '120px', height: '16px', marginBottom: '16px' }}></div>
              <div className="skeleton" style={{ width: '160px', height: '32px' }}></div>
            </div>
            <div className="glass-card" style={{ padding: '24px', height: '120px' }}>
              <div className="skeleton" style={{ width: '120px', height: '16px', marginBottom: '16px' }}></div>
              <div className="skeleton" style={{ width: '160px', height: '32px' }}></div>
            </div>
            <div className="glass-card" style={{ padding: '24px', height: '120px' }}>
              <div className="skeleton" style={{ width: '120px', height: '16px', marginBottom: '16px' }}></div>
              <div className="skeleton" style={{ width: '160px', height: '32px' }}></div>
            </div>
          </div>

          {/* Double Grid Charts Skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div className="glass-card" style={{ padding: '24px', height: '300px' }}>
              <div className="skeleton" style={{ width: '200px', height: '20px', marginBottom: '24px' }}></div>
              <div className="skeleton" style={{ width: '100%', height: '200px' }}></div>
            </div>
            <div className="glass-card" style={{ padding: '24px', height: '300px' }}>
              <div className="skeleton" style={{ width: '200px', height: '20px', marginBottom: '24px' }}></div>
              <div className="skeleton" style={{ width: '100%', height: '200px' }}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.05) 0px, transparent 50%), radial-gradient(at 50% 0%, rgba(37, 99, 235, 0.06) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.04) 0px, transparent 50%), #f1f5f9', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow blobs */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(79, 70, 229, 0.03)', filter: 'blur(120px)', borderRadius: '50%', top: '20%', right: '5%', zIndex: 0 }}></div>

      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', zIndex: 1, position: 'relative' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
              <Sparkles size={24} color="#4f46e5" /> AI Expense Analyzer
              <span style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#ffffff', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginLeft: '6px', boxShadow: '0 2px 6px rgba(6, 182, 212, 0.2)' }}>Insight Engine</span>
            </h1>
            <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>AI-powered anomalies, recurring patterns, and smart cashflow audits.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Glowing mic filter query search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
              <input 
                type="text" 
                className="glass-input" 
                placeholder={isListening ? "Listening..." : "Filter results (e.g. AWS)..."}
                style={{ 
                  paddingLeft: '36px', 
                  paddingRight: '40px', 
                  width: '240px', 
                  height: '38px',
                  borderColor: isListening ? '#ef4444' : '#cbd5e1',
                  boxShadow: isListening ? '0 0 10px rgba(239, 68, 68, 0.3)' : 'none'
                }} 
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
              <button 
                onClick={startListening}
                style={{
                  position: 'absolute',
                  right: '6px',
                  border: 'none',
                  background: isListening ? '#ef4444' : 'transparent',
                  color: isListening ? '#ffffff' : '#475569',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  boxShadow: isListening ? '0 2px 6px rgba(239, 68, 68, 0.3)' : 'none'
                }}
                title="Voice Search"
              >
                <Mic size={14} />
              </button>
            </div>

            <button 
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 500);
              }} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: '#ffffff', 
                border: '1px solid #cbd5e1', 
                color: '#475569', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <RefreshCw size={14} /> Refresh Audit
            </button>
          </div>
        </header>

        {/* Top Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          <div className="glass-card" style={{ padding: '24px' }}>
            <span style={{ fontSize: '13px', color: '#475569' }}>Current Outflow Audit</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '10px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>₹ 59,600</h2>
              <span style={{ color: '#ef4444', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                <ArrowUpRight size={16} /> +18.7% MoM
              </span>
            </div>
            <p style={{ color: '#475569', fontSize: '12px', marginTop: '8px' }}>vs ₹50,200 last month</p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <span style={{ fontSize: '13px', color: '#475569' }}>Over-Budget Alert</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '10px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#be123c' }}>₹ 7,464</h2>
              <span style={{ color: '#be123c', fontSize: '12px', fontWeight: '600' }}>across 2 categories</span>
            </div>
            <p style={{ color: '#475569', fontSize: '12px', marginTop: '8px' }}>Food and Shopping limits breached</p>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(255, 255, 255, 1) 100%)', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
            <span style={{ fontSize: '13px', color: '#475569' }}>Potential Yearly Savings</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '10px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#4f46e5' }}>₹ 30,000</h2>
              <span style={{ color: '#4f46e5', fontSize: '12px', fontWeight: '600' }}>Estimated</span>
            </div>
            <p style={{ color: '#475569', fontSize: '12px', marginTop: '8px' }}>If restaurant spending reduces by ₹2.5k/mo</p>
          </div>

        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Spending Trend Chart */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>Historical Cash Outflow Trend</h3>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="auditedOutflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '10px', color: '#0f172a' }} />
                  <Area type="monotone" dataKey="Outflow" name="Total Outflow" stroke="#ef4444" fillOpacity={1} fill="url(#auditedOutflow)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category changes */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>Category Outflow Comparison (MoM)</h3>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryComparison}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                  <YAxis stroke="#475569" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#ffffff', borderColor: '#cbd5e1', borderRadius: '10px', color: '#0f172a' }} />
                  <Bar dataKey="LastMonth" name="Last Month Outflow" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ThisMonth" name="This Month Outflow" fill="#4f46e5" radius={[4, 4, 0, 0]}>
                    {categoryComparison.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.change > 20 ? '#ef4444' : entry.change < 0 ? '#10b981' : '#4f46e5'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* AI Insights & Anomaly Detection */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Anomaly Detection */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#0f172a' }}>AI-Detected Unusual Outflows</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredUnusual.length > 0 ? (
                filteredUnusual.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '14px 18px', 
                      borderRadius: '12px', 
                      background: item.status === 'Critical' ? '#fff5f5' : '#fffaf0',
                      border: `1px solid ${item.status === 'Critical' ? '#feb2b2' : '#fbd38d'}`,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ padding: '8px', borderRadius: '8px', background: item.status === 'Critical' ? '#fed7d7' : '#feebc8' }}>
                        <item.icon size={20} color={item.status === 'Critical' ? '#c53030' : '#dd6b20'} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: item.status === 'Critical' ? '#9b2c2c' : '#c05621' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: item.status === 'Critical' ? '#c53030' : '#dd6b20', marginTop: '2px' }}>Category: {item.category} • Normal: ₹{item.normalAverage.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: item.status === 'Critical' ? '#9b2c2c' : '#c05621' }}>₹{item.currentSpent.toLocaleString()}</span>
                      <div style={{ fontSize: '11px', color: item.status === 'Critical' ? '#9b2c2c' : '#c05621', marginTop: '2px', fontWeight: '600' }}>+{item.deviation}% Spike</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>No anomalies found matching query.</div>
              )}
            </div>
          </div>

          {/* AI Advisor Insights */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#0f172a' }}>AI-Generated Insights (Listen enabled)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredInsights.length > 0 ? (
                filteredInsights.map((insight, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px', 
                      borderRadius: '10px', 
                      background: insight.type === 'negative' ? '#fff5f5' : '#f0fdf4',
                      border: `1px solid ${insight.type === 'negative' ? '#feb2b2' : '#bbf7d0'}` 
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', flex: 1, alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {insight.type === 'negative' ? (
                          <div style={{ padding: '6px', borderRadius: '50%', background: '#fed7d7' }}><TrendingUp size={16} color="#c53030" /></div>
                        ) : (
                          <div style={{ padding: '6px', borderRadius: '50%', background: '#dcfce7' }}><TrendingDown size={16} color="#15803d" /></div>
                        )}
                      </div>
                      <span style={{ fontSize: '13px', color: insight.type === 'negative' ? '#9b2c2c' : '#14532d', lineHeight: '1.5', fontWeight: '500' }}>{insight.text}</span>
                    </div>

                    <button 
                      onClick={() => speakInsight(insight.text, idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: speakingInsightIdx === idx ? '#4f46e5' : '#64748b',
                        cursor: 'pointer',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        marginLeft: '12px'
                      }}
                      title="Speak insight"
                    >
                      <Volume2 size={16} className={speakingInsightIdx === idx ? 'animate-pulse' : ''} />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>No insights found matching query.</div>
              )}
            </div>
          </div>

        </div>

        {/* Subscription / Fixed Obligations Identifier */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#0f172a' }}>AI-Identified Recurring Subscriptions & Fixed Outflows</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ paddingBottom: '12px' }}>Mandate / Subscription</th>
                  <th style={{ paddingBottom: '12px' }}>Frequency</th>
                  <th style={{ paddingBottom: '12px' }}>Classification</th>
                  <th style={{ paddingBottom: '12px' }}>Status</th>
                  <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((sub, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 0', fontWeight: '600', color: '#0f172a' }}>{sub.name}</td>
                      <td style={{ color: '#475569' }}>{sub.frequency}</td>
                      <td>
                        <span style={{ padding: '3px 8px', borderRadius: '6px', background: sub.type === 'Investment' ? '#e0f2fe' : '#e0e7ff', color: sub.type === 'Investment' ? '#0369a1' : '#4f46e5', fontSize: '12px', fontWeight: '600', border: `1px solid ${sub.type === 'Investment' ? '#bae6fd' : '#c7d2fe'}` }}>
                          {sub.type}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: '#059669', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                          <CheckCircle size={12} /> {sub.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>₹{sub.amount.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No subscriptions found matching query.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Analytics;
