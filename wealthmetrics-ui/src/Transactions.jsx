import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Search, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialTransactions = [
  { id: 1, title: 'Stripe Payout', category: 'Income', amount: '+₹24,500', date: 'Jul 27, 2026', status: 'Completed', type: 'income' },
  { id: 2, title: 'AWS Cloud Infrastructure', category: 'Tech', amount: '-₹3,200', date: 'Jul 26, 2026', status: 'Completed', type: 'expense' },
  { id: 3, title: 'Swiggy Food Delivery', category: 'Food', amount: '-₹680', date: 'Jul 25, 2026', status: 'Completed', type: 'expense' },
  { id: 4, title: 'Freelance Design Client', category: 'Income', amount: '+₹15,000', date: 'Jul 24, 2026', status: 'Completed', type: 'income' },
  { id: 5, title: 'Netflix Subscription', category: 'Entertainment', amount: '-₹649', date: 'Jul 22, 2026', status: 'Pending', type: 'expense' },
];

function Transactions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = initialTransactions.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>Transaction History</h1>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Monitor and audit all your incoming and outgoing funds.</p>
          </div>
          <button className="btn-primary" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Search transactions by name or category..." 
              style={{ width: '100%', paddingLeft: '44px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="glass-card" style={{ padding: '24px', overflowX: 'auto', backgroundColor: '#ffffff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ paddingBottom: '12px' }}>Transaction</th>
                <th style={{ paddingBottom: '12px' }}>Category</th>
                <th style={{ paddingBottom: '12px' }}>Date</th>
                <th style={{ paddingBottom: '12px' }}>Status</th>
                <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.type === 'income' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.type === 'income' ? <ArrowUpRight size={18} color="#059669" /> : <ArrowDownRight size={18} color="#b91c1c" />}
                    </div>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.title}</span>
                  </td>
                  <td>
                    <span style={{ padding: '4px 10px', borderRadius: '6px', background: '#f1f5f9', fontSize: '12px', border: '1px solid #e2e8f0', color: '#475569', fontWeight: '500' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ color: '#475569' }}>{item.date}</td>
                  <td>
                    <span style={{ color: item.status === 'Completed' ? '#059669' : '#d97706', fontSize: '12px', fontWeight: '600' }}>
                      • {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '700', color: item.type === 'income' ? '#059669' : '#b91c1c' }}>
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

export default Transactions;
