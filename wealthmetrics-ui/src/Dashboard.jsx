import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Bell, 
  TrendingUp,
  Coins
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
  const userEmail = localStorage.getItem('userEmail') || 'kunal@wealthmetrics.io';
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          {/* Header Skeleton */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <div className="skeleton" style={{ width: '200px', height: '32px', marginBottom: '8px' }}></div>
              <div className="skeleton" style={{ width: '320px', height: '16px' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="skeleton" style={{ width: '150px', height: '40px' }}></div>
              <div className="skeleton" style={{ width: '40px', height: '40px' }}></div>
            </div>
          </div>

          {/* Net wealth card skeleton */}
          <div className="glass-card" style={{ padding: '28px', marginBottom: '24px', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="skeleton" style={{ width: '240px', height: '16px' }}></div>
            <div className="skeleton" style={{ width: '360px', height: '48px' }}></div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="skeleton" style={{ width: '100px', height: '16px' }}></div>
              <div className="skeleton" style={{ width: '100px', height: '16px' }}></div>
              <div className="skeleton" style={{ width: '100px', height: '16px' }}></div>
            </div>
          </div>

          {/* Cards skeleton grid */}
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

          {/* Charts and activity skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px', height: '320px' }}>
              <div className="skeleton" style={{ width: '220px', height: '20px', marginBottom: '24px' }}></div>
              <div className="skeleton" style={{ width: '100%', height: '220px' }}></div>
            </div>
            <div className="glass-card" style={{ padding: '24px', height: '320px' }}>
              <div className="skeleton" style={{ width: '150px', height: '20px', marginBottom: '24px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="skeleton" style={{ width: '100%', height: '40px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '40px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '40px' }}></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.04) 0px, transparent 50%), radial-gradient(at 50% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.03) 0px, transparent 50%), #f8fafc', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient background glow blobs */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(79, 70, 229, 0.04)', filter: 'blur(120px)', borderRadius: '50%', top: '10%', right: '5%', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.04)', filter: 'blur(100px)', borderRadius: '50%', bottom: '10%', left: '20%', zIndex: 0 }}></div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', zIndex: 1, position: 'relative' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Welcome Back 👋</h1>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Real-time Total Wealth & Asset Portfolio Breakdown.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-primary" onClick={() => setShowAddModal(true)} style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Plus size={18} /> Add Transaction
            </button>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Bell size={18} color="#475569" />
            </div>
          </div>
        </header>

        {/* Top Primary Stat Card: Total Net Wealth */}
        <div className="glass-card" style={{ padding: '28px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(59, 130, 246, 0.06) 100%)', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Calculated Total Net Wealth</span>
              <h1 style={{ fontSize: '38px', fontWeight: '800', marginTop: '8px', color: '#4f46e5', background: 'linear-gradient(135deg, #4f46e5, #6d28d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹ 3,76,00,000 <span style={{ fontSize: '18px', fontWeight: '500', color: '#475569' }}>(₹3.76 Cr)</span></h1>
            </div>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #4f46e5, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}>
              <TrendingUp size={26} color="#fff" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', fontSize: '13px', color: '#475569', borderTop: '1px solid rgba(226, 232, 240, 0.8)', paddingTop: '16px' }}>
            <div>🏠 <b>Real Estate:</b> ₹3,67,00,000</div>
            <div>📈 <b>Stocks:</b> ₹3,00,600</div>
            <div>⚡ <b>Crypto:</b> ₹1,85,000</div>
            <div>💰 <b>Cash/Bank:</b> ₹4,14,400</div>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>Monthly Salary (Inflow)</span>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginTop: '12px', color: '#0f172a' }}>₹ 1,85,000</h2>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a7f3d0' }}>
                <ArrowUpRight size={22} color="#059669" />
              </div>
            </div>
            <div style={{ color: '#059669', fontSize: '13px', marginTop: '8px', fontWeight: '600' }}>+₹15,000 Freelance Bonus</div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>Monthly Outflow (Spendings)</span>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginTop: '12px', color: '#0f172a' }}>₹ 59,600</h2>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fecdd3' }}>
                <ArrowDownRight size={22} color="#b91c1c" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontSize: '13px', marginTop: '8px', fontWeight: '600' }}>
              <ArrowDownRight size={16} /> 32.2% Burn Rate of Salary
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>Monthly Net Savings</span>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginTop: '12px', color: '#059669' }}>₹ 1,25,400</h2>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #e0e7ff, #e0f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #c7d2fe' }}>
                <Coins size={20} color="#4f46e5" />
              </div>
            </div>
            <div style={{ color: '#475569', fontSize: '13px', marginTop: '8px', fontWeight: '500' }}>Reinvested into SIP & Equities</div>
          </div>

        </div>

        {/* Analytics Chart & Recent Activity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* Cashflow Chart */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>Salary vs Expenditure Trend</h3>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip contentStyle={{ background: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', color: '#0f172a' }} />
                  <Area type="monotone" dataKey="Income" name="Salary Inflow" stroke="#6366f1" fillOpacity={1} fill="url(#incomeColor)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="Expense" name="Expenditure" stroke="#f43f5e" fillOpacity={1} fill="url(#expenseColor)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Expenses List */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>Recent Monthly Expenses</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Mutual Fund SIP</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>Auto-debited • Investment</div>
                </div>
                <span style={{ color: '#be123c', fontWeight: '600', fontSize: '14px' }}>-₹20,000</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Apartment Maintenance</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>Housing</div>
                </div>
                <span style={{ color: '#be123c', fontWeight: '600', fontSize: '14px' }}>-₹18,000</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Groceries & Shopping</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>Amazon / Zomato</div>
                </div>
                <span style={{ color: '#be123c', fontWeight: '600', fontSize: '14px' }}>-₹12,400</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>AWS & Tech Subscriptions</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>SaaS Utilities</div>
                </div>
                <span style={{ color: '#be123c', fontWeight: '600', fontSize: '14px' }}>-₹4,200</span>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-card" style={{ padding: '32px', width: '100%', maxWidth: '400px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Add New Transaction</h3>
            <p style={{ color: '#475569', fontSize: '13px', marginBottom: '20px' }}>Log salary, asset purchase or expense.</p>
            
            <input type="text" className="glass-input" placeholder="Title (e.g. Dividend)" style={{ width: '100%', marginBottom: '12px' }} />
            <input type="number" className="glass-input" placeholder="Amount (₹)" style={{ width: '100%', marginBottom: '20px' }} />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ flex: 1, padding: '12px' }} onClick={() => setShowAddModal(false)}>Save</button>
              <button style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }} onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
