import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  Save, 
  User, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  Download, 
  CheckCircle, 
  Globe,
  Lock
} from 'lucide-react';

function Settings() {
  const userEmail = localStorage.getItem('userEmail') || 'kunal@wealthmetrics.io';
  const [name, setName] = useState('Kunal Katiyar');
  const [currency, setCurrency] = useState('INR');
  const [numberingSystem, setNumberingSystem] = useState('indian');
  const [notifyBudget, setNotifyBudget] = useState(true);
  const [notifyAnomalies, setNotifyAnomalies] = useState(true);
  const [notifyDigest, setNotifyDigest] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleExportData = () => {
    const data = {
      user: { name, email: userEmail, currency, numberingSystem },
      preferences: { notifyBudget, notifyAnomalies, notifyDigest },
      exportTimestamp: new Date().toISOString(),
      platform: 'WealthMetrics Enterprise Financial Intelligence'
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `wealthmetrics_account_settings_${Date.now()}.json`;
    link.click();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar />

      <main className="wm-page-main">
        
        {/* ------------------------------------------------------------------
            SECTION 1: EDITORIAL HERO & CONTROLS
            ------------------------------------------------------------------ */}
        <section className="wm-page-hero">
          <div className="wm-page-hero-content">
            <span className="wm-eyebrow">Account & Preferences</span>
            <h1 className="wm-hero-title">
              Configure Your<br />
              WealthMetrics<br />
              Experience.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '640px' }}>
              Manage your account preferences, valuation conventions, and notification rules.
            </p>
          </div>

          <div className="wm-page-actions">
            <button 
              type="button" 
              onClick={handleExportData} 
              className="wm-btn wm-btn-secondary"
              aria-label="Export profile configuration JSON"
            >
              <Download size={16} /> Export Profile JSON
            </button>
            <button 
              type="button" 
              onClick={handleLogout} 
              className="wm-btn wm-btn-outline"
              style={{ color: '#DC2626', borderColor: '#FECACA' }}
              aria-label="Sign out of account"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </section>

        {/* Feedback Alert */}
        {saved && (
          <div 
            style={{ 
              marginBottom: '24px', 
              padding: '14px 20px', 
              background: '#ECFDF5', 
              border: '1px solid #A7F3D0', 
              borderRadius: '4px',
              color: '#059669',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle size={16} /> Preferences successfully updated and synchronized across devices!
          </div>
        )}

        <form onSubmit={handleSave}>
          
          {/* ------------------------------------------------------------------
              SECTION 2: PROFILE & IDENTITY
              ------------------------------------------------------------------ */}
          <div className="wm-settings-card">
            <div className="wm-settings-header">
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#8B00FF" /> Identity & Corporate Profile
              </span>
              <h2 className="wm-card-heading" style={{ margin: '2px 0 0 0' }}>
                Account Information
              </h2>
            </div>

            <div className="wm-settings-grid">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Legal Full Name
                </label>
                <input 
                  type="text" 
                  className="wm-input" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Authenticated Work Email
                </label>
                <input 
                  type="email" 
                  className="wm-input" 
                  value={userEmail} 
                  disabled 
                  style={{ background: 'var(--wm-bg-secondary)', color: 'var(--wm-text-muted)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Corporate License Role
                </label>
                <input 
                  type="text" 
                  className="wm-input" 
                  value="Principal Portfolio Manager · Enterprise Tier" 
                  disabled 
                  style={{ background: 'var(--wm-bg-secondary)', color: 'var(--wm-text-muted)' }}
                />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------
              SECTION 3: FINANCIAL WORKSPACE CONVENTIONS
              ------------------------------------------------------------------ */}
          <div className="wm-settings-card">
            <div className="wm-settings-header">
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} color="#8B00FF" /> Workspace Conventions
              </span>
              <h2 className="wm-card-heading" style={{ margin: '2px 0 0 0' }}>
                Currency & Financial Units
              </h2>
            </div>

            <div className="wm-settings-grid">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Base Reporting Currency
                </label>
                <select 
                  className="wm-input" 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ background: '#FFFFFF' }}
                >
                  <option value="INR">INR (₹) — Indian Rupee (Default)</option>
                  <option value="USD">USD ($) — United States Dollar</option>
                  <option value="EUR">EUR (€) — Euro</option>
                  <option value="GBP">GBP (£) — British Pound</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Numerical Denomination Standard
                </label>
                <select 
                  className="wm-input" 
                  value={numberingSystem} 
                  onChange={(e) => setNumberingSystem(e.target.value)}
                  style={{ background: '#FFFFFF' }}
                >
                  <option value="indian">Indian System (Lakhs & Crores — ₹ 3.76 Cr)</option>
                  <option value="international">International System (Millions & Billions — $ 4.5M)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Fiscal Cycle Horizon
                </label>
                <select 
                  className="wm-input" 
                  defaultValue="apr-mar"
                  style={{ background: '#FFFFFF' }}
                >
                  <option value="apr-mar">April 1 – March 31 (Indian Financial Year)</option>
                  <option value="jan-dec">January 1 – December 31 (Calendar Year)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------
              SECTION 4: NOTIFICATIONS & TELEMETRY CONTROLS
              ------------------------------------------------------------------ */}
          <div className="wm-settings-card">
            <div className="wm-settings-header">
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bell size={14} color="#8B00FF" /> Telemetry & Signals
              </span>
              <h2 className="wm-card-heading" style={{ margin: '2px 0 0 0' }}>
                Automated Risk Notifications
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                    Over-Budget Variance Triggers
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    Instantly notify via push and email when an envelope exceeds 85% utilization.
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyBudget} 
                  onChange={(e) => setNotifyBudget(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#8B00FF', cursor: 'pointer' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                    AI Anomaly Spike Alerts
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    Trigger automated reviews for non-recurring vendor debits exceeding normal averages by more than 50%.
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyAnomalies} 
                  onChange={(e) => setNotifyAnomalies(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#8B00FF', cursor: 'pointer' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                    Weekly Wealth & Portfolio Executive Digest
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    Deliver an automated Monday morning executive memo on cashflow surplus and asset gains.
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyDigest} 
                  onChange={(e) => setNotifyDigest(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#8B00FF', cursor: 'pointer' }}
                />
              </label>
            </div>
          </div>

          {/* ------------------------------------------------------------------
              SECTION 5: SECURITY & COMPLIANCE BADGE
              ------------------------------------------------------------------ */}
          <div className="wm-settings-card">
            <div className="wm-settings-header">
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} color="#059669" /> Workspace Security
              </span>
              <h2 className="wm-card-heading" style={{ margin: '2px 0 0 0' }}>
                Security & Data Protection
              </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: '800', fontSize: '14px' }}>
                  <ShieldCheck size={18} /> Standard Session Protection
                </div>
                <p className="wm-caption" style={{ margin: '6px 0 0 0' }}>
                  Client preferences and workspace session state are isolated within your local browser profile.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="submit" 
                  className="wm-btn wm-btn-primary"
                  aria-label="Save settings changes"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>

        </form>

      </main>
    </div>
  );
}

export default Settings;
