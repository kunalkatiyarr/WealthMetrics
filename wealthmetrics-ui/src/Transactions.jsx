import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  Search, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  X, 
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const defaultTransactions = [
  { id: 1, title: 'Stripe Payout', category: 'Income', amount: '+₹24,500', numAmount: 24500, date: 'Jul 27, 2026', status: 'Completed', type: 'income' },
  { id: 2, title: 'AWS Cloud Infrastructure', category: 'Tech', amount: '-₹3,200', numAmount: -3200, date: 'Jul 26, 2026', status: 'Completed', type: 'expense' },
  { id: 3, title: 'Swiggy Food Delivery', category: 'Food', amount: '-₹680', numAmount: -680, date: 'Jul 25, 2026', status: 'Completed', type: 'expense' },
  { id: 4, title: 'Freelance Design Client', category: 'Income', amount: '+₹15,000', numAmount: 15000, date: 'Jul 24, 2026', status: 'Completed', type: 'income' },
  { id: 5, title: 'Netflix Subscription', category: 'Entertainment', amount: '-₹649', numAmount: -649, date: 'Jul 22, 2026', status: 'Pending', type: 'expense' },
];

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense, pending
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal form fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Tech');
  const [formAmount, setFormAmount] = useState('');
  const [formType, setFormType] = useState('expense');

  // Compute summary numbers directly from current data
  const totalInflow = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.numAmount), 0);

  const totalOutflow = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.numAmount), 0);

  const netBalance = totalInflow - totalOutflow;

  // Filter logic
  const filtered = transactions.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'income') return matchesSearch && t.type === 'income';
    if (filterType === 'expense') return matchesSearch && t.type === 'expense';
    if (filterType === 'pending') return matchesSearch && t.status.toLowerCase() === 'pending';
    return matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['ID,Title,Category,Amount,Date,Status,Type'];
    const rows = transactions.map(t => 
      `${t.id},"${t.title}","${t.category}","${t.amount}","${t.date}","${t.status}","${t.type}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wealthmetrics_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    if (!formTitle || !formAmount) return;

    const parsedNum = parseFloat(formAmount) || 0;
    const formattedAmount = formType === 'income' ? `+₹${parsedNum.toLocaleString()}` : `-₹${parsedNum.toLocaleString()}`;
    const signedNum = formType === 'income' ? Math.abs(parsedNum) : -Math.abs(parsedNum);

    const newTx = {
      id: Date.now(),
      title: formTitle,
      category: formCategory,
      amount: formattedAmount,
      numAmount: signedNum,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Completed',
      type: formType
    };

    setTransactions([newTx, ...transactions]);
    setShowAddModal(false);
    setFormTitle('');
    setFormAmount('');
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
            <span className="wm-eyebrow">Financial Activity & Audit</span>
            <h1 className="wm-hero-title">
              Every Transaction.<br />
              One Clear View.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '620px' }}>
              Audited transaction ledger tracking capital movement, vendor debit mandates, SaaS infrastructure costs, and incoming payouts.
            </p>
          </div>

          <div className="wm-page-actions">
            <button 
              onClick={() => setShowAddModal(true)} 
              className="wm-btn wm-btn-primary"
              aria-label="Record a new transaction"
            >
              <Plus size={16} /> Record Transaction
            </button>
            <button 
              onClick={handleExportCSV} 
              className="wm-btn wm-btn-secondary"
              aria-label="Export transactions to CSV file"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: HORIZONTAL FINANCIAL SUMMARY STRIP
            ------------------------------------------------------------------ */}
        <section className="wm-summary-strip">
          <div className="wm-summary-box">
            <span className="wm-summary-label">Total Inflow Activity</span>
            <div className="wm-summary-value" style={{ color: '#059669' }}>
              +₹ {totalInflow.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
              Verified deposits & payouts
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Total Outflow Debit</span>
            <div className="wm-summary-value" style={{ color: '#DC2626' }}>
              -₹ {totalOutflow.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: '600' }}>
              Infrastructure & operating costs
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Net Audit Balance</span>
            <div className="wm-summary-value" style={{ color: netBalance >= 0 ? '#111111' : '#DC2626' }}>
              ₹ {netBalance.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>
              Current ledger net cashflow
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Audited Records</span>
            <div className="wm-summary-value" style={{ color: '#8B00FF' }}>
              {transactions.length} Entries
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>
              100% reconciled across accounts
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: CONTROL & FILTER BAR
            ------------------------------------------------------------------ */}
        <div className="wm-control-bar">
          <div className="wm-search-wrapper">
            <Search 
              size={16} 
              color="#9CA3AF" 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text" 
              className="wm-input" 
              placeholder="Search by title, merchant, or category (e.g. AWS, Stripe, Food)..." 
              style={{ paddingLeft: '40px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Filter transactions"
            />
          </div>

          <div className="wm-filter-group">
            <button 
              onClick={() => setFilterType('all')}
              className={`wm-filter-btn ${filterType === 'all' ? 'active' : ''}`}
            >
              All ({transactions.length})
            </button>
            <button 
              onClick={() => setFilterType('income')}
              className={`wm-filter-btn ${filterType === 'income' ? 'active' : ''}`}
            >
              Income
            </button>
            <button 
              onClick={() => setFilterType('expense')}
              className={`wm-filter-btn ${filterType === 'expense' ? 'active' : ''}`}
            >
              Expenses
            </button>
            <button 
              onClick={() => setFilterType('pending')}
              className={`wm-filter-btn ${filterType === 'pending' ? 'active' : ''}`}
            >
              Pending
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            SECTION 4: EDITORIAL FINANCIAL LEDGER TABLE
            ------------------------------------------------------------------ */}
        <div className="wm-table-card">
          <table className="wm-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>Transaction / Vendor</th>
                <th>Category</th>
                <th>Audit Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Settled Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px 24px', color: '#6B7280' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                      No matching records found
                    </div>
                    <span>Try adjusting your search query or active filter pills.</span>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '18px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '4px', 
                            background: item.type === 'income' ? '#ECFDF5' : '#FEF2F2', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: `1px solid ${item.type === 'income' ? '#A7F3D0' : '#FECACA'}`
                          }}
                          aria-hidden="true"
                        >
                          {item.type === 'income' ? (
                            <ArrowUpRight size={18} color="#059669" />
                          ) : (
                            <ArrowDownRight size={18} color="#DC2626" />
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#111111', fontSize: '14px' }}>{item.title}</div>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>Ref ID: #{item.id}092</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="wm-tag">
                        {item.category}
                      </span>
                    </td>
                    <td style={{ color: '#374151', fontSize: '13px', fontWeight: '500' }}>
                      {item.date}
                    </td>
                    <td>
                      <span 
                        style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: item.status === 'Completed' ? '#059669' : '#D97706', 
                          fontSize: '12px', 
                          fontWeight: '700' 
                        }}
                      >
                        <span 
                          style={{ 
                            width: '6px', 
                            height: '6px', 
                            borderRadius: '50%', 
                            background: item.status === 'Completed' ? '#059669' : '#D97706' 
                          }} 
                        />
                        {item.status}
                      </span>
                    </td>
                    <td 
                      style={{ 
                        textAlign: 'right', 
                        fontWeight: '800', 
                        fontSize: '15px', 
                        paddingRight: '24px',
                        fontVariantNumeric: 'tabular-nums',
                        color: item.type === 'income' ? '#059669' : '#DC2626' 
                      }}
                    >
                      {item.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Navigation Link to Analytics */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="wm-caption">
            Showing {filtered.length} of {transactions.length} total reconciled entries.
          </span>
          <button 
            onClick={() => navigate('/analytics')}
            className="wm-arrow-link"
            aria-label="View expense analytics breakdown"
          >
            Audit Spending Patterns in AI Expense Analyzer <ArrowRight size={14} className="wm-arrow-icon" />
          </button>
        </div>

      </main>

      {/* ------------------------------------------------------------------
          MODAL: RECORD TRANSACTION DIALOG
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
              Add a new income deposit, client dividend, or expense debit to the audit ledger.
            </p>

            <form onSubmit={handleSaveTransaction}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Transaction Type
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    onClick={() => setFormType('expense')}
                    className={`wm-filter-btn ${formType === 'expense' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Expense Outflow
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormType('income')}
                    className={`wm-filter-btn ${formType === 'income' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Income Inflow
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Title / Merchant
                </label>
                <input 
                  type="text" 
                  className="wm-input" 
                  placeholder="e.g. AWS Cloud Infrastructure, Swiggy" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Category
                </label>
                <select 
                  className="wm-input" 
                  value={formCategory} 
                  onChange={(e) => setFormCategory(e.target.value)}
                  style={{ background: '#FFFFFF' }}
                >
                  <option value="Tech">Tech Infrastructure</option>
                  <option value="Food">Food & Dining</option>
                  <option value="Income">Salary / Income</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Housing">Housing & Maintenance</option>
                </select>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Amount (₹)
                </label>
                <input 
                  type="number" 
                  className="wm-input" 
                  placeholder="e.g. 5000" 
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="wm-btn wm-btn-primary" style={{ flex: 1 }}>
                  Save to Ledger
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

export default Transactions;
