import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  Target, 
  Plus, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Download,
  ShieldCheck
} from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Food & Dining', budget: 15000, spent: 20264, iconColor: '#DC2626' },
  { id: 2, name: 'Housing & Maintenance', budget: 20000, spent: 18000, iconColor: '#8B00FF' },
  { id: 3, name: 'Shopping & Hardware', budget: 8000, spent: 10200, iconColor: '#DC2626' },
  { id: 4, name: 'Mutual Fund SIP', budget: 15000, spent: 15000, iconColor: '#059669' },
  { id: 5, name: 'Tech Infrastructure', budget: 5000, spent: 3200, iconColor: '#06B6D4' },
  { id: 6, name: 'Entertainment & Streaming', budget: 2000, spent: 838, iconColor: '#6366F1' }
];

function BudgetPlanner() {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formBudget, setFormBudget] = useState('');
  const [formSpent, setFormSpent] = useState('');

  // Computations
  const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallUtilization = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0;

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormName('');
    setFormBudget('');
    setFormSpent('0');
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setFormName(cat.name);
    setFormBudget(cat.budget.toString());
    setFormSpent(cat.spent.toString());
    setShowModal(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formName || !formBudget) return;

    const parsedBudget = parseFloat(formBudget) || 0;
    const parsedSpent = parseFloat(formSpent) || 0;

    if (editingCat) {
      setCategories(categories.map(c => 
        c.id === editingCat.id 
          ? { ...c, name: formName, budget: parsedBudget, spent: parsedSpent }
          : c
      ));
    } else {
      const newCat = {
        id: Date.now(),
        name: formName,
        budget: parsedBudget,
        spent: parsedSpent,
        iconColor: '#8B00FF'
      };
      setCategories([...categories, newCat]);
    }

    setShowModal(false);
  };

  const handleExportCSV = () => {
    const headers = ['Category,Budget Limit,Current Spent,Remaining,Utilization %'];
    const rows = categories.map(c => {
      const remaining = c.budget - c.spent;
      const pct = ((c.spent / c.budget) * 100).toFixed(1);
      return `"${c.name}",${c.budget},${c.spent},${remaining},${pct}%`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wealthmetrics_budget_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <span className="wm-eyebrow">Budget & Capital Control</span>
            <h1 className="wm-hero-title">
              Give Every<br />
              Rupee a Purpose.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '640px' }}>
              Track monthly spending limits, monitor category performance, and redirect capital with institutional confidence.
            </p>
          </div>

          <div className="wm-page-actions">
            <button 
              onClick={handleOpenAdd} 
              className="wm-btn wm-btn-primary"
              aria-label="Set new category budget"
            >
              <Plus size={16} /> Set Category Budget
            </button>
            <button 
              onClick={handleExportCSV} 
              className="wm-btn wm-btn-secondary"
              aria-label="Export budget to CSV"
            >
              <Download size={16} /> Export Sheet
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: BUDGET OVERVIEW & UTILIZATION STRIP
            ------------------------------------------------------------------ */}
        <section className="wm-summary-strip">
          <div className="wm-summary-box">
            <span className="wm-summary-label">Total Monthly Budget</span>
            <div className="wm-summary-value" style={{ color: '#111111' }}>
              ₹ {totalBudget.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>
              Across {categories.length} active allocation envelopes
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Total Current Outflow</span>
            <div className="wm-summary-value" style={{ color: totalSpent > totalBudget ? '#DC2626' : '#111111' }}>
              ₹ {totalSpent.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: totalSpent > totalBudget ? '#DC2626' : '#059669', fontWeight: '700' }}>
              {overallUtilization}% utilized this billing cycle
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Remaining Net Buffer</span>
            <div className="wm-summary-value" style={{ color: totalRemaining >= 0 ? '#059669' : '#DC2626' }}>
              ₹ {Math.abs(totalRemaining).toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: totalRemaining >= 0 ? '#059669' : '#DC2626', fontWeight: '700' }}>
              {totalRemaining >= 0 ? 'Surplus capital available' : 'Budget breach / overdrawn'}
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Enforced Cap Health</span>
            <div className="wm-summary-value" style={{ color: '#8B00FF' }}>
              {categories.filter(c => c.spent <= c.budget).length} / {categories.length}
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>
              Categories adhering to strict spending limits
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: OVERALL BUDGET UTILIZATION FEATURE PANEL
            ------------------------------------------------------------------ */}
        <section className="wm-dash-feature-card">
          <div className="wm-dash-feature-header">
            <div>
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={14} color="#8B00FF" /> Consolidated Envelope Performance
              </span>
              <div className="wm-dash-networth-val">
                <span>{overallUtilization}% Consumed</span>
                <span 
                  className={totalSpent > totalBudget ? 'wm-badge-negative' : 'wm-badge-positive'} 
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  {totalSpent > totalBudget ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
                  {totalSpent > totalBudget ? 'Deficit Warning' : 'Healthy Allocation'}
                </span>
              </div>
              <p className="wm-caption" style={{ margin: '8px 0 0 0' }}>
                ₹ {totalSpent.toLocaleString()} disbursed out of ₹ {totalBudget.toLocaleString()} ceiling.
              </p>
            </div>

            <div style={{ textAlign: 'left', minWidth: '160px' }}>
              <span className="wm-eyebrow">Capital Redirection Potential</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#8B00FF', marginTop: '4px' }}>
                ₹ 30,000 / yr
              </div>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
                Redirect overages to equities SIP
              </span>
            </div>
          </div>

          {/* Master Utilization Progress Bar */}
          <div className="wm-progress-bar-bg" style={{ height: '10px' }}>
            <div 
              className="wm-progress-bar-fill" 
              style={{ 
                width: `${Math.min(parseFloat(overallUtilization), 100)}%`, 
                background: totalSpent > totalBudget 
                  ? '#DC2626' 
                  : parseFloat(overallUtilization) > 85 
                    ? '#F59E0B' 
                    : '#8B00FF' 
              }} 
            />
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 4: CATEGORY BUDGET CARDS GRID
            ------------------------------------------------------------------ */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <span className="wm-eyebrow">Category Envelopes</span>
              <h2 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                Category Budget Performance
              </h2>
            </div>
            <span className="wm-caption" style={{ fontWeight: '600' }}>
              {categories.length} Envelopes Enforced
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {categories.map((cat) => {
              const pct = cat.budget > 0 ? ((cat.spent / cat.budget) * 100).toFixed(1) : 0;
              const isOver = cat.spent > cat.budget;
              const isWarning = !isOver && pct > 85;

              return (
                <div key={cat.id} className="wm-budget-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <span className="wm-tag" style={{ marginBottom: '6px' }}>
                          Envelope #{cat.id}
                        </span>
                        <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111111', margin: '2px 0 0 0' }}>
                          {cat.name}
                        </h3>
                      </div>

                      <span 
                        style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          fontSize: '11px', 
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          background: isOver ? '#FEF2F2' : isWarning ? '#FFFBEB' : '#ECFDF5',
                          color: isOver ? '#DC2626' : isWarning ? '#D97706' : '#059669',
                          border: `1px solid ${isOver ? '#FECACA' : isWarning ? '#FDE68A' : '#A7F3D0'}`
                        }}
                      >
                        {isOver ? `Exceeded ${pct}%` : `${pct}% Used`}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="wm-progress-bar-bg">
                      <div 
                        className="wm-progress-bar-fill"
                        style={{ 
                          width: `${Math.min(parseFloat(pct), 100)}%`,
                          background: isOver ? '#DC2626' : isWarning ? '#F59E0B' : '#8B00FF'
                        }}
                      />
                    </div>

                    {/* Numerical Breakdown */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '14px' }}>
                      <div>
                        <span style={{ color: '#6B7280', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Spent</span>
                        <div style={{ fontWeight: '800', fontSize: '15px', color: isOver ? '#DC2626' : '#111111' }}>
                          ₹ {cat.spent.toLocaleString()}
                        </div>
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <span style={{ color: '#6B7280', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Limit</span>
                        <div style={{ fontWeight: '700', fontSize: '15px', color: '#111111' }}>
                          ₹ {cat.budget.toLocaleString()}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#6B7280', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>
                          {isOver ? 'Overage' : 'Remaining'}
                        </span>
                        <div style={{ fontWeight: '800', fontSize: '15px', color: isOver ? '#DC2626' : '#059669' }}>
                          {isOver ? `+₹ ${(cat.spent - cat.budget).toLocaleString()}` : `₹ ${(cat.budget - cat.spent).toLocaleString()}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--wm-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={13} color="#8B00FF" /> Reconciled
                    </span>
                    <button 
                      onClick={() => handleOpenEdit(cat)}
                      className="wm-btn wm-btn-ghost"
                      style={{ padding: '4px 8px', fontSize: '11px' }}
                      aria-label={`Adjust budget limit for ${cat.name}`}
                    >
                      <Edit3 size={13} /> Adjust Cap
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Deep Link to AI Expense Analyzer */}
        <div style={{ marginTop: '20px', padding: '24px 32px', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="wm-eyebrow" style={{ color: '#8B00FF' }}>Next Step: Deep-Dive Into Category Spikes</span>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111111', marginTop: '2px' }}>
              Want to see anomalous merchant trends and listen to AI spending insights?
            </div>
          </div>
          <button 
            onClick={() => navigate('/analytics')}
            className="wm-btn wm-btn-primary"
            aria-label="Open AI Expense Analyzer"
          >
            Audit Outflows in AI Analyzer <ArrowRight size={16} />
          </button>
        </div>

      </main>

      {/* ------------------------------------------------------------------
          MODAL: ADD / EDIT CATEGORY BUDGET CAP
          ------------------------------------------------------------------ */}
      {showModal && (
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
          onClick={() => setShowModal(false)}
        >
          <form 
            onSubmit={handleSaveCategory}
            className="wm-card"
            style={{ padding: '36px', width: '100%', maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h3 className="wm-card-heading" style={{ margin: 0 }}>
                {editingCat ? 'Adjust Budget Cap' : 'New Budget Envelope'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="wm-caption" style={{ marginBottom: '16px' }}>
              Define a strict capital envelope to control categorical cashflow debits.
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                Category Name
              </label>
              <input 
                type="text" 
                className="wm-input" 
                placeholder="e.g. Health & Fitness, Travel" 
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                Monthly Spending Limit (₹)
              </label>
              <input 
                type="number" 
                className="wm-input" 
                placeholder="e.g. 15000" 
                value={formBudget}
                onChange={(e) => setFormBudget(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                Current Month Settled Outflow (₹)
              </label>
              <input 
                type="number" 
                className="wm-input" 
                placeholder="e.g. 5200" 
                value={formSpent}
                onChange={(e) => setFormSpent(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button type="submit" className="wm-btn wm-btn-primary" style={{ flex: 1 }}>
                Save Envelope
              </button>
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                className="wm-btn wm-btn-outline" 
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default BudgetPlanner;
