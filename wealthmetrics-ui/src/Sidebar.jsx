import React, { useState, useEffect } from 'react';
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
  Calendar,
  Menu,
  X,
  User
} from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userEmail = localStorage.getItem('userEmail') || 'kunal@wealthmetrics.io';
  const userName = userEmail
    ? userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Kunal Katiyar';
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleNavClick = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Grouped Navigation matching all 9 existing application routes
  const navigationGroups = [
    {
      group: 'Overview',
      items: [
        { name: 'Overview', path: '/dashboard', icon: PieChart }
      ]
    },
    {
      group: 'Wealth & Assets',
      items: [
        { name: 'Investments & Assets', path: '/investments', icon: Building2 },
        { name: 'Transactions', path: '/transactions', icon: List },
        { name: 'Budget Planner', path: '/budget', icon: ShoppingBag },
        { name: 'Future Forecast', path: '/forecast', icon: LineChart }
      ]
    },
    {
      group: 'Intelligence & Insights',
      items: [
        { name: 'AI Expense Analyzer', path: '/analytics', icon: CreditCard },
        { name: 'AI Financial Advisor', path: '/ai-advisor', icon: Sparkles },
        { name: 'Wealth Calendar', path: '/calendar', icon: Calendar }
      ]
    },
    {
      group: 'Preferences',
      items: [
        { name: 'Settings', path: '/settings', icon: SettingsIcon }
      ]
    }
  ];

  const renderNavContent = () => (
    <>
      <nav className="wm-nav-container" role="navigation" aria-label="Main Navigation">
        {navigationGroups.map((group) => (
          <div key={group.group} className="wm-nav-group">
            <span className="wm-nav-group-title">{group.group}</span>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`wm-nav-item ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="wm-nav-indicator" aria-hidden="true" />
                  <Icon size={16} className="wm-nav-icon" aria-hidden="true" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer Profile & Sign Out */}
      <div className="wm-sidebar-footer">
        <div className="wm-user-block">
          <div className="wm-user-avatar" aria-hidden="true">
            {userInitials || <User size={14} />}
          </div>
          <div className="wm-user-info">
            <span className="wm-user-name" title={userName}>{userName}</span>
            <span className="wm-user-email" title={userEmail}>{userEmail}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className="wm-btn-logout"
          aria-label="Sign out of account"
        >
          <LogOut size={14} aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* 1. Desktop Fixed / Sticky Sidebar */}
      <aside className="wm-sidebar-desktop" aria-label="Application Sidebar">
        <div className="wm-sidebar-header">
          <button 
            onClick={() => handleNavClick('/dashboard')} 
            className="wm-sidebar-brand"
            aria-label="WealthMetrics Dashboard"
          >
            <div className="wm-brand-icon" aria-hidden="true">
              <Wallet size={16} />
            </div>
            <span className="wm-brand-name">WealthMetrics</span>
          </button>
          <span className="wm-brand-subtitle">Financial Intelligence</span>
        </div>

        {renderNavContent()}
      </aside>

      {/* 2. Mobile / Tablet Sticky Header */}
      <header className="wm-mobile-bar" aria-label="Mobile Navigation Bar">
        <button 
          onClick={() => handleNavClick('/dashboard')} 
          className="wm-sidebar-brand"
          aria-label="WealthMetrics Dashboard"
        >
          <div className="wm-brand-icon" aria-hidden="true">
            <Wallet size={16} />
          </div>
          <span className="wm-brand-name">WealthMetrics</span>
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="wm-mobile-menu-btn"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 3. Mobile Off-Canvas Drawer Overlay */}
      <div 
        className={`wm-mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* 4. Mobile Off-Canvas Slide-Out Drawer */}
      <aside 
        className={`wm-mobile-drawer ${mobileOpen ? 'open' : ''}`}
        aria-label="Mobile Menu Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="wm-drawer-header">
          <div className="wm-sidebar-brand">
            <div className="wm-brand-icon" aria-hidden="true">
              <Wallet size={16} />
            </div>
            <span className="wm-brand-name">WealthMetrics</span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="wm-drawer-close-btn"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {renderNavContent()}
      </aside>
    </>
  );
}

export default Sidebar;
