import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Wallet, 
  PieChart, 
  LogOut, 
  List, 
  Settings as SettingsIcon, 
  Building2, 
  CreditCard, 
  ShoppingBag, 
  Sparkles, 
  LineChart, 
  Calendar 
} from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: PieChart },
    { name: 'Investments & Assets', path: '/investments', icon: Building2 },
    { name: 'Transactions', path: '/transactions', icon: List },
    { name: 'AI Expense Analyzer', path: '/analytics', icon: CreditCard },
    { name: 'AI Financial Advisor', path: '/ai-advisor', icon: Sparkles },
    { name: 'Future Forecast', path: '/forecast', icon: LineChart },
    { name: 'Wealth Calendar', path: '/calendar', icon: Calendar },
    { name: 'Budget Planner', path: '/budget', icon: ShoppingBag },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside style={{ width: '280px', minWidth: '280px', borderRight: '1px solid #e2e8f0', padding: '28px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)', backdropFilter: 'blur(20px)', zIndex: 10 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f46e5, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)' }}>
            <Wallet size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>WealthMetrics</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px', 
                  borderRadius: '10px', 
                  background: isActive ? 'linear-gradient(135deg, #4f46e5, #6d28d9)' : 'transparent', 
                  color: isActive ? '#ffffff' : '#475569', 
                  fontWeight: isActive ? '600' : '500', 
                  border: 'none', 
                  cursor: 'pointer', 
                  textAlign: 'left', 
                  width: '100%',
                  boxShadow: isActive ? '0 4px 12px rgba(79, 70, 229, 0.15)' : 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.color = '#0f172a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#475569';
                  }
                }}
              >
                <Icon size={18} /> {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          padding: '12px 16px', 
          background: 'rgba(239, 68, 68, 0.06)', 
          color: '#ef4444', 
          border: '1px solid rgba(239, 68, 68, 0.15)', 
          borderRadius: '10px', 
          cursor: 'pointer', 
          fontWeight: '500',
          marginTop: '24px'
        }}
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;
