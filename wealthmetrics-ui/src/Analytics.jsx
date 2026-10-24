import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle, 
  Sparkles, 
  Volume2, 
  Mic, 
  Search,
  ShieldAlert,
  ArrowRight
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
import { useNavigate } from 'react-router-dom';

function Analytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [speakingInsightIdx, setSpeakingInsightIdx] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Existing Financial Intelligence Data
  const comparisonData = {
    currentMonthOutflow: 59600,
    previousMonthOutflow: 50200,
    changePercentage: 18.7,
    savingsGoal: 50000,
    estimatedSavings: 30000
  };

  const unusualSpending = [
    { id: 1, title: 'Swiggy / Zomato Food Delivery', category: 'Food & Dining', normalAverage: 12000, currentSpent: 20264, deviation: 68, icon: AlertTriangle, status: 'Critical' },
    { id: 2, title: 'Amazon Electronics', category: 'Shopping & Hardware', normalAverage: 5000, currentSpent: 10200, deviation: 104, icon: ArrowUpRight, status: 'Warning' }
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
    { text: "Food & Dining expenses increased by 39.7% compared to last month due to high delivery volume.", type: 'negative' },
    { text: "Shopping exceeded your monthly budget allowance by ₹5,200 across electronic hardware.", type: 'negative' },
    { text: "Reducing restaurant orders by ₹2,500/month redirects ₹30,000/year to mutual fund equity.", type: 'positive' },
    { text: "Tech utility fees decreased by 5.8% due to terminated dormant AWS instances.", type: 'positive' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
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
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <Sidebar />
        <main className="wm-page-main">
          {/* Header Skeleton */}
          <div style={{ marginBottom: '40px' }}>
            <div className="skeleton" style={{ width: '180px', height: '14px', marginBottom: '14px' }}></div>
            <div className="skeleton" style={{ width: '460px', height: '48px', marginBottom: '16px' }}></div>
            <div className="skeleton" style={{ width: '580px', height: '20px' }}></div>
          </div>

          {/* Strip Skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div className="skeleton" style={{ height: '100px' }}></div>
            <div className="skeleton" style={{ height: '100px' }}></div>
            <div className="skeleton" style={{ height: '100px' }}></div>
            <div className="skeleton" style={{ height: '100px' }}></div>
          </div>

          {/* Charts Skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div className="skeleton" style={{ height: '320px' }}></div>
            <div className="skeleton" style={{ height: '320px' }}></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar />

      <main className="wm-page-main">
        
        {/* ------------------------------------------------------------------
            SECTION 1: EDITORIAL HERO & CONTROLS
            ------------------------------------------------------------------ */}
        <section className="wm-page-hero">
          <div className="wm-page-hero-content">
            <span className="wm-eyebrow">Financial Intelligence & Cashflow Audit</span>
            <h1 className="wm-hero-title">
              Understand<br />
              Where Your<br />
              Money Moves.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '640px' }}>
              Algorithmic expense intelligence auditing month-over-month variances, anomaly spikes, and capital redirection targets.
            </p>
          </div>

          <div className="wm-page-actions">
            {/* Search + Speech Recognition Bar */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search 
                size={16} 
                color="#9CA3AF" 
                style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }} 
              />
              <input 
                type="text" 
                className="wm-input" 
                placeholder={isListening ? "Listening... Speak now..." : "Filter audit (e.g. Swiggy, AWS)..."} 
                style={{ 
                  paddingLeft: '40px', 
                  paddingRight: '48px', 
                  width: '260px',
                  borderColor: isListening ? '#DC2626' : undefined
                }}
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                aria-label="Filter expense analytics"
              />
              <button 
                type="button"
                onClick={startListening}
                className={isListening ? 'wm-mic-listening' : ''}
                style={{
                  position: 'absolute',
                  right: '6px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  border: '1px solid var(--wm-border)',
                  background: isListening ? '#DC2626' : 'var(--wm-bg-secondary)',
                  color: isListening ? '#FFFFFF' : 'var(--wm-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                aria-label="Voice filter input"
                title="Voice Search (Speech-to-text)"
              >
                <Mic size={14} />
              </button>
            </div>

            <button 
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 400);
              }} 
              className="wm-btn wm-btn-outline"
              aria-label="Refresh financial audit"
            >
              <RefreshCw size={14} /> Re-Audit
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: FINANCIAL INTELLIGENCE SUMMARY STRIP
            ------------------------------------------------------------------ */}
        <section className="wm-summary-strip">
          <div className="wm-summary-box">
            <span className="wm-summary-label">Current Outflow Audit</span>
            <div className="wm-summary-value" style={{ color: '#111111' }}>
              ₹ {comparisonData.currentMonthOutflow.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={14} /> +{comparisonData.changePercentage}% MoM vs ₹{comparisonData.previousMonthOutflow.toLocaleString()}
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Over-Budget Deviation</span>
            <div className="wm-summary-value" style={{ color: '#DC2626' }}>
              ₹ 7,464
            </div>
            <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: '600' }}>
              Food & Shopping limits breached
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Potential Yearly Savings</span>
            <div className="wm-summary-value" style={{ color: '#8B00FF' }}>
              ₹ {comparisonData.estimatedSavings.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
              Via ₹2,500/mo restaurant optimization
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Recurring Mandates</span>
            <div className="wm-summary-value" style={{ color: '#111111' }}>
              {recurringSubscriptions.length} Subscriptions
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>
              ₹ 42,038 / mo automated debit
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: SPENDING VISUALIZATION (CHARTS)
            ------------------------------------------------------------------ */}
        <div className="wm-dash-split-grid">
          
          {/* Historical Cash Outflow Trend */}
          <div className="wm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="wm-eyebrow">6-Month Trajectory</span>
                <h3 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                  Historical Cash Outflow Trend
                </h3>
              </div>
              <span className="wm-tag">Audited</span>
            </div>

            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="wmAnalyticsOutflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B00FF" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#8B00FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#FFFFFF', 
                      borderColor: '#E5E7EB', 
                      borderRadius: '4px', 
                      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                      fontFamily: 'Inter, sans-serif'
                    }} 
                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Total Outflow']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Outflow" 
                    name="Total Outflow" 
                    stroke="#8B00FF" 
                    fillOpacity={1} 
                    fill="url(#wmAnalyticsOutflow)" 
                    strokeWidth={2.5} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Outflow Comparison (MoM) */}
          <div className="wm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="wm-eyebrow">Categorical Variances</span>
                <h3 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                  Category Outflow Comparison (MoM)
                </h3>
              </div>
              <span className="wm-tag">Last vs This Month</span>
            </div>

            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryComparison}>
                  <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#FFFFFF', 
                      borderColor: '#E5E7EB', 
                      borderRadius: '4px', 
                      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                      fontFamily: 'Inter, sans-serif'
                    }} 
                  />
                  <Bar dataKey="LastMonth" name="Prior Month" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="ThisMonth" name="Current Month" fill="#8B00FF" radius={[2, 2, 0, 0]}>
                    {categoryComparison.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.change > 20 ? '#DC2626' : entry.change < 0 ? '#059669' : '#8B00FF'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------
            SECTION 4: ANOMALY DETECTION & AI-GENERATED INSIGHTS
            ------------------------------------------------------------------ */}
        <div className="wm-dash-split-grid" style={{ marginBottom: '48px' }}>
          
          {/* Anomaly Detection */}
          <div className="wm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={14} color="#DC2626" /> Anomaly Detection Engine
                </span>
                <h3 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                  AI-Detected Unusual Outflows
                </h3>
              </div>
              <span className="wm-caption" style={{ fontWeight: '600' }}>
                {filteredUnusual.length} Anomalies
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredUnusual.length > 0 ? (
                filteredUnusual.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '16px 20px', 
                      borderRadius: '4px', 
                      background: item.status === 'Critical' ? '#FEF2F2' : '#FFFBEB',
                      border: `1px solid ${item.status === 'Critical' ? '#FECACA' : '#FDE68A'}`,
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div 
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '4px', 
                          background: item.status === 'Critical' ? '#FEE2E2' : '#FEF3C7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <item.icon size={18} color={item.status === 'Critical' ? '#DC2626' : '#D97706'} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                          {item.category} · Normal: ₹{item.normalAverage.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: item.status === 'Critical' ? '#DC2626' : '#D97706' }}>
                        ₹{item.currentSpent.toLocaleString()}
                      </div>
                      <span className="wm-badge-negative" style={{ marginTop: '4px', fontSize: '10px', padding: '2px 8px' }}>
                        +{item.deviation}% Spike
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '36px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                  No anomalies matching query filter.
                </div>
              )}
            </div>
          </div>

          {/* AI Insights with Audio Synthesis */}
          <div className="wm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#8B00FF" /> Synthesized Findings
                </span>
                <h3 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                  AI-Generated Intelligence (Audio Enabled)
                </h3>
              </div>
              <span className="wm-tag">Voice Readout</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredInsights.length > 0 ? (
                filteredInsights.map((insight, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px', 
                      borderRadius: '4px', 
                      background: insight.type === 'negative' ? '#FAF5FF' : '#F0FDF4',
                      border: `1px solid ${insight.type === 'negative' ? '#E9D5FF' : '#BBF7D0'}` 
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', flex: 1, alignItems: 'center' }}>
                      <div 
                        style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '4px', 
                          background: insight.type === 'negative' ? '#F3E8FF' : '#DCFCE7',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {insight.type === 'negative' ? (
                          <TrendingUp size={14} color="#8B00FF" />
                        ) : (
                          <TrendingDown size={14} color="#059669" />
                        )}
                      </div>
                      <span style={{ fontSize: '13px', color: '#111111', lineHeight: '1.5', fontWeight: '500' }}>
                        {insight.text}
                      </span>
                    </div>

                    <button 
                      onClick={() => speakInsight(insight.text, idx)}
                      style={{
                        background: speakingInsightIdx === idx ? 'var(--wm-bg-lavender)' : 'transparent',
                        border: '1px solid var(--wm-border)',
                        color: speakingInsightIdx === idx ? 'var(--wm-accent-primary)' : 'var(--wm-text-muted)',
                        cursor: 'pointer',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        marginLeft: '12px',
                        transition: 'all 0.2s'
                      }}
                      aria-label="Listen to synthesized insight audio"
                      title="Read aloud"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ padding: '36px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                  No insights found matching filter query.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------
            SECTION 5: RECURRING SUBSCRIPTIONS & FIXED DEBIT AUDIT
            ------------------------------------------------------------------ */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <span className="wm-eyebrow">Automated Capital Outflows</span>
              <h2 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                AI-Identified Recurring Subscriptions & Fixed Mandates
              </h2>
            </div>
            <span className="wm-caption" style={{ fontWeight: '600' }}>
              {filteredSubscriptions.length} Verified Mandates
            </span>
          </div>

          <div className="wm-table-card">
            <table className="wm-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px' }}>Mandate / Merchant</th>
                  <th>Cadence</th>
                  <th>Classification</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right', paddingRight: '24px' }}>Monthly Debit</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((sub, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '16px 24px', fontWeight: '700', color: '#111111' }}>
                        {sub.name}
                      </td>
                      <td style={{ color: '#374151', fontSize: '13px' }}>
                        {sub.frequency}
                      </td>
                      <td>
                        <span className="wm-tag">
                          {sub.type}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: '#059669', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                          <CheckCircle size={14} /> {sub.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '800', color: '#111111', fontSize: '15px', paddingRight: '24px' }}>
                        ₹{sub.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#6B7280' }}>
                      No subscriptions found matching query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Link to AI Advisor */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="wm-caption">
            Reconciled across automated banking feeds and OCR receipt ingestion.
          </span>
          <button 
            onClick={() => navigate('/ai-advisor')}
            className="wm-arrow-link"
            aria-label="Consult AI Financial Advisor"
          >
            Consult AI Advisor on High Swiggy Burn Rate <ArrowRight size={14} className="wm-arrow-icon" />
          </button>
        </div>

      </main>
    </div>
  );
}

export default Analytics;
