import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'kunal@wealthmetrics.io';
  const [name, setName] = useState('Kunal Katiyar');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>Account Settings</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Manage your account preferences.</p>
        </div>

        <div className="glass-card" style={{ padding: '32px', maxWidth: '600px', backgroundColor: '#ffffff' }}>
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
              <input 
                type="text" 
                className="glass-input" 
                style={{ width: '100%' }} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
              <input 
                type="email" 
                className="glass-input" 
                style={{ width: '100%', opacity: 0.7 }} 
                value={userEmail} 
                disabled 
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Currency Preference</label>
              <select className="glass-input" style={{ width: '100%', background: '#ffffff' }}>
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> {saved ? 'Saved Successfully!' : 'Save Changes'}
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}

export default Settings;
