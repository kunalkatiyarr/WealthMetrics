import React from 'react';
import Sidebar from './Sidebar';
import { Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BudgetPlanner() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>Budget Planner</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Set monthly spending limits and track savings goals.</p>
        </div>

        <div className="glass-card" style={{ padding: '24px', maxWidth: '500px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Target color="#4f46e5" size={24} />
            <h3 style={{ fontSize: '18px', color: '#0f172a' }}>Monthly Target: ₹ 50,000</h3>
          </div>
          
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #4f46e5, #3b82f6)' }}></div>
          </div>
          <p style={{ color: '#475569', fontSize: '13px' }}>₹ 32,500 spent of ₹ 50,000 limit (65%)</p>
        </div>

      </main>
    </div>
  );
}

export default BudgetPlanner;
