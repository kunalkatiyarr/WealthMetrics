import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Bell, 
  TrendingUp, 
  Coins, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const analyticsData = [
  { month: 'Jan', Income: 185000, Expense: 52000 },
  { month: 'Feb', Income: 185000, Expense: 48000 },
  { month: 'Mar', Income: 195000, Expense: 64000 },
  { month: 'Apr', Income: 185000, Expense: 51000 },
  { month: 'May', Income: 210000, Expense: 58000 },
  { month: 'Jun', Income: 185000, Expense: 59600 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state for add transaction modal
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    setNewTitle('');
    setNewAmount('');
  };

  // Custom Chart Tooltip
  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="wm-chart-tooltip">
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', marginBottom: '6px' }}>
            {label} 2026 Audit
          </div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', fontSize: '13px', margin: '4px 0' }}>
              <span style={{ color: entry.color, fontWeight: '600' }}>{entry.name}:</span>
              <span style={{ fontWeight: '700', color: '#111111' }}>₹{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <Sidebar />
        <main className="wm-dash-main">
          {/* Skeleton Hero */}
          <div style={{ marginBottom: '48px' }}>
            <div className="skeleton" style={{ width: '180px', height: '14px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ width: '420px', height: '56px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ width: '320px', height: '20px' }} />
          </div>

          {/* Skeleton Net Worth Feature Panel */}
          <div className="wm-card" style={{ marginBottom: '48px', height: '360px' }}>
            <div className="skeleton" style={{ width: '220px', height: '16px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ width: '340px', height: '48px', marginBottom: '32px' }} />
            <div className="skeleton" style={{ width: '100%', height: '200px' }} />
          </div>

          {/* Skeleton 4 Metrics Grid */}
          <div className="wm-dash-metrics-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="wm-metric-card">
                <div className="skeleton" style={{ width: '120px', height: '14px' }} />
                <div className="skeleton" style={{ width: '160px', height: '36px' }} />
                <div className="skeleton" style={{ width: '140px', height: '12px' }} />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* 1. Shell Left Navigation */}
      <Sidebar />

      {/* 2. Main Content Canvas */}
      <main className="wm-dash-main">

        {/* ------------------------------------------------------------------
            SECTION 1: HERO / EDITORIAL FINANCIAL STATEMENT
            ------------------------------------------------------------------ */}
        <section className="wm-dash-hero">
          <div className="wm-dash-hero-content">
            <span className="wm-eyebrow">Financial Intelligence System</span>
            <h1 className="wm-hero-title">
              Your Wealth.<br />
              At A Glance.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '620px' }}>
              Real-time multi-asset intelligence, property valuations, and automated cashflow velocity audited across accounts.
            </p>
          </div>

          <div className="wm-dash-actions">
            <button 
              onClick={() => setShowAddModal(true)}
              className="wm-btn wm-btn-primary"
              aria-label="Record a new financial transaction"
            >
              <Plus size={16} /> Record Transaction
            </button>
            <button
              onClick={() => navigate('/ai-advisor')}
              className="wm-btn wm-btn-secondary"
              aria-label="Open AI Financial Advisor"
            >
              <Sparkles size={16} /> Consult AI Advisor
            </button>
            <div 
              style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '4px', 
                border: '1px solid #E5E7EB', 
                background: '#FFFFFF',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#6B7280'
              }}
              title="Notifications"
            >
              <Bell size={18} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: PRIMARY ANCHOR — TOTAL NET WEALTH & RECHARTS TIMELINE
            ------------------------------------------------------------------ */}
        <section className="wm-dash-feature-panel">
          <div className="wm-dash-feature-header">
            <div>
              <span className="wm-eyebrow">Calculated Total Net Wealth</span>
              <div className="wm-dash-networth-val">
                <span>₹ 3,76,00,000</span>
                <span className="wm-dash-networth-sub">(₹3.76 Crore)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="wm-tag wm-tag-positive">
                <TrendingUp size={12} /> +18.4% YOY Growth
              </span>
              <span className="wm-tag wm-tag-accent">
                Audited Aug 2026
              </span>
            </div>
          </div>

          {/* Asset Allocation Distribution Bar */}
          <div className="wm-allocation-bar">
            <div style={{ width: '97.6%', background: '#8B00FF' }} title="Real Estate (97.6%)" />
            <div style={{ width: '1.1%', background: '#2563EB' }} title="Cash & Bank (1.1%)" />
            <div style={{ width: '0.8%', background: '#059669' }} title="Stocks (0.8%)" />
            <div style={{ width: '0.5%', background: '#F59E0B' }} title="Crypto (0.5%)" />
          </div>

          {/* Allocation Category Breakdown Grid */}
          <div className="wm-allocation-grid">
            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#8B00FF' }} /> Real Estate (97.6%)
              </span>
              <span className="wm-allocation-value">₹ 3,67,00,000</span>
            </div>
            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#2563EB' }} /> Cash / Bank Buffer
              </span>
              <span className="wm-allocation-value">₹ 4,14,400</span>
            </div>
            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#059669' }} /> Stock Equities
              </span>
              <span className="wm-allocation-value">₹ 3,00,600</span>
            </div>
            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#F59E0B' }} /> Crypto Assets
              </span>
              <span className="wm-allocation-value">₹ 1,85,000</span>
            </div>
          </div>

          <hr className="wm-divider" style={{ margin: '32px 0 24px 0' }} />

          {/* Recharts AreaChart: 6-Month Inflow vs Expenditure */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="wm-card-heading">Capital Velocity & Cashflow Trend</h3>
                <span className="wm-caption">6-Month historical inflow versus monthly expenditure comparison</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: '600' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8B00FF' }}>
                  <span style={{ width: '10px', height: '10px', background: '#8B00FF', borderRadius: '2px' }} /> Inflow (Salary)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626' }}>
                  <span style={{ width: '10px', height: '10px', background: '#DC2626', borderRadius: '2px' }} /> Outflow (Expenses)
                </span>
              </div>
            </div>

            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B00FF" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#8B00FF" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#E5E7EB' }} 
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickFormatter={(v) => `₹${v / 1000}k`} 
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="Income" 
                    name="Monthly Inflow" 
                    stroke="#8B00FF" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#incomeColor)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Expense" 
                    name="Monthly Outflow" 
                    stroke="#DC2626" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#expenseColor)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: ASYMMETRIC FINANCIAL METRICS GRID
            ------------------------------------------------------------------ */}
        <section className="wm-dash-metrics-grid">
          
          {/* Metric 1: Monthly Inflow */}
          <div className="wm-metric-card">
            <div>
              <div className="wm-metric-card-header">
                <span className="wm-eyebrow" style={{ margin: 0 }}>Monthly Inflow</span>
                <span className="wm-tag wm-tag-positive">Salary</span>
              </div>
              <div className="wm-metric-card-num">₹ 1,85,000</div>
            </div>
            <div className="wm-metric-card-footer" style={{ color: '#059669' }}>
              <ArrowUpRight size={16} /> +₹15,000 Freelance Bonus
            </div>
          </div>

          {/* Metric 2: Monthly Outflow */}
          <div className="wm-metric-card">
            <div>
              <div className="wm-metric-card-header">
                <span className="wm-eyebrow" style={{ margin: 0 }}>Monthly Outflow</span>
                <span className="wm-tag wm-tag-negative">Spend</span>
              </div>
              <div className="wm-metric-card-num">₹ 59,600</div>
            </div>
            <div className="wm-metric-card-footer" style={{ color: '#DC2626' }}>
              <ArrowDownRight size={16} /> 32.2% Burn Rate of Salary
            </div>
          </div>

          {/* Metric 3: Net Monthly Savings */}
          <div className="wm-metric-card">
            <div>
              <div className="wm-metric-card-header">
                <span className="wm-eyebrow" style={{ margin: 0 }}>Net Surplus</span>
                <span className="wm-tag wm-tag-accent">Compounding</span>
              </div>
              <div className="wm-metric-card-num" style={{ color: '#059669' }}>₹ 1,25,400</div>
            </div>
            <div className="wm-metric-card-footer" style={{ color: '#6B7280' }}>
              Reinvested into SIP & Equities
            </div>
          </div>

          {/* Metric 4: Liquid Capital Runway */}
          <div className="wm-metric-card">
            <div>
              <div className="wm-metric-card-header">
                <span className="wm-eyebrow" style={{ margin: 0 }}>Liquid Reserves</span>
                <span className="wm-tag">Safety</span>
              </div>
              <div className="wm-metric-card-num">₹ 4,14,400</div>
            </div>
            <div className="wm-metric-card-footer" style={{ color: '#374151' }}>
              <Coins size={14} color="#8B00FF" /> 7+ Months Emergency Buffer
            </div>
          </div>

        </section>

        {/* ------------------------------------------------------------------
            SECTION 4: ASYMMETRIC TWO-COLUMN EDITORIAL SPLIT
            ------------------------------------------------------------------ */}
        <section className="wm-dash-split-grid">
          
          {/* Left Column (1.25fr): Investments Overview + AI Advisor Callout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Investment Class Overview */}
            <div className="wm-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span className="wm-eyebrow">Asset Holdings Audit</span>
                  <h3 className="wm-card-heading">Portfolio Valuation</h3>
                </div>
                <button 
                  onClick={() => navigate('/investments')} 
                  className="wm-arrow-link"
                  aria-label="View all investments"
                >
                  Explore <ArrowRight size={14} className="wm-arrow-icon" />
                </button>
              </div>

              <p className="wm-body" style={{ margin: '0 0 24px 0' }}>
                Primary wealth is concentrated in 2 prime properties (Mahindra SEZ Commercial Plot & Jagatpura Luxury 2BHK) producing ₹3.67 Cr current market valuation (+22.4% ROI). Stock portfolio represents ₹3.00 L in Indian blue-chips.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: '#F7F8FA', borderRadius: '4px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                    <Building2 size={14} color="#8B00FF" /> Real Estate
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px', color: '#111111' }}>₹ 3,67,00,000</div>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>2 Assets Appreciating</span>
                </div>

                <div style={{ padding: '16px', background: '#F7F8FA', borderRadius: '4px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                    <TrendingUp size={14} color="#059669" /> Stock Equities
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px', color: '#111111' }}>₹ 3,00,600</div>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>+₹35,600 Unrealized Gain</span>
                </div>
              </div>
            </div>

            {/* AI Advisor Feature Callout (Light Lavender Background) */}
            <div className="wm-card-lavender" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={16} color="#8B00FF" />
                <span className="wm-eyebrow" style={{ margin: 0, color: '#8B00FF' }}>Financial Intelligence Insight</span>
              </div>
              <h3 className="wm-card-heading" style={{ color: '#111111', marginBottom: '12px' }}>
                Optimize Cashflow Velocity with AI Advisory
              </h3>
              <p className="wm-body" style={{ color: '#374151', margin: '0 0 20px 0' }}>
                "Your discretionary spend rate is 32.2%. Food delivery orders rose 18% and SaaS tools totaled ₹4,200. Rebalancing ₹2,500/month into equity SIPs projects +₹30,000 annual compounding gains."
              </p>
              <button 
                onClick={() => navigate('/ai-advisor')}
                className="wm-arrow-link"
                style={{ color: '#8B00FF' }}
                aria-label="Consult AI Advisor"
              >
                Launch AI Financial Advisor <ArrowRight size={14} className="wm-arrow-icon" />
              </button>
            </div>

          </div>

          {/* Right Column (1fr): Recent Activity Editorial Ledger */}
          <div className="wm-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span className="wm-eyebrow">Audit Trail</span>
                  <h3 className="wm-card-heading">Recent Expenses</h3>
                </div>
                <button 
                  onClick={() => navigate('/transactions')} 
                  className="wm-arrow-link"
                  aria-label="View full transactions ledger"
                >
                  All <ArrowRight size={14} className="wm-arrow-icon" />
                </button>
              </div>

              <div className="wm-activity-list">
                <div className="wm-activity-item">
                  <span className="wm-activity-idx">01</span>
                  <div className="wm-activity-content">
                    <span className="wm-activity-title">Mutual Fund SIP</span>
                    <span className="wm-activity-meta">Auto-debited • Investment Equity</span>
                  </div>
                  <span className="wm-activity-amount" style={{ color: '#DC2626' }}>-₹20,000</span>
                </div>

                <div className="wm-activity-item">
                  <span className="wm-activity-idx">02</span>
                  <div className="wm-activity-content">
                    <span className="wm-activity-title">Apartment Maintenance</span>
                    <span className="wm-activity-meta">Housing Utility • Monthly</span>
                  </div>
                  <span className="wm-activity-amount" style={{ color: '#DC2626' }}>-₹18,000</span>
                </div>

                <div className="wm-activity-item">
                  <span className="wm-activity-idx">03</span>
                  <div className="wm-activity-content">
                    <span className="wm-activity-title">Groceries & Essentials</span>
                    <span className="wm-activity-meta">Amazon / Swiggy / Zomato</span>
                  </div>
                  <span className="wm-activity-amount" style={{ color: '#DC2626' }}>-₹12,400</span>
                </div>

                <div className="wm-activity-item">
                  <span className="wm-activity-idx">04</span>
                  <div className="wm-activity-content">
                    <span className="wm-activity-title">AWS & Cloud Infrastructure</span>
                    <span className="wm-activity-meta">Tech SaaS Hosting • Work</span>
                  </div>
                  <span className="wm-activity-amount" style={{ color: '#DC2626' }}>-₹4,200</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
              <button 
                onClick={() => navigate('/transactions')}
                className="wm-arrow-link"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>View Complete Transactions Ledger</span>
                <ArrowRight size={14} className="wm-arrow-icon" />
              </button>
            </div>
          </div>

        </section>

      </main>

      {/* ------------------------------------------------------------------
          MODAL: ADD NEW TRANSACTION DIALOG
          ------------------------------------------------------------------ */}
      {showAddModal && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0, 0, 0, 0.45)', 
            backdropFilter: 'blur(4px)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 200,
            padding: '20px'
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="wm-card" 
            style={{ width: '100%', maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto', padding: '36px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 className="wm-card-heading" style={{ margin: 0 }}>Record Transaction</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="wm-caption" style={{ marginBottom: '24px' }}>
              Log salary inflow, asset purchase dividend, or monthly expenditure.
            </p>

            <form onSubmit={handleSaveTransaction}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Transaction Title
                </label>
                <input 
                  type="text" 
                  className="wm-input" 
                  placeholder="e.g. Dividend Payout, Freelance Client" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required 
                />
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Amount (₹)
                </label>
                <input 
                  type="number" 
                  className="wm-input" 
                  placeholder="e.g. 25000" 
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="wm-btn wm-btn-primary" style={{ flex: 1 }}>
                  Save Entry
                </button>
                <button 
                  type="button" 
                  className="wm-btn wm-btn-outline" 
                  style={{ flex: 1 }} 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
