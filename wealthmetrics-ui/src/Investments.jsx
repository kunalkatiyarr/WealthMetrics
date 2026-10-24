import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  Building2, 
  TrendingUp, 
  Plus, 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialStockHoldings = [
  { id: 1, name: 'Reliance Industries', symbol: 'RELIANCE', category: 'Energy & Conglomerate', invested: '₹1,20,000', current: '₹1,45,000', returns: '+20.8%', type: 'profit' },
  { id: 2, name: 'Tata Consultancy Services', symbol: 'TCS', category: 'Technology Services', invested: '₹85,000', current: '₹98,200', returns: '+15.5%', type: 'profit' },
  { id: 3, name: 'HDFC Bank', symbol: 'HDFCBANK', category: 'Banking & Financials', invested: '₹60,000', current: '₹57,400', returns: '-4.3%', type: 'loss' },
];

const initialRealEstateHoldings = [
  { 
    id: 1, 
    property: 'Commercial Plot (Mahindra SEZ)', 
    location: 'Jaipur, RJ', 
    type: 'Industrial / Commercial Land',
    purchasePrice: '₹2,50,00,000', 
    currentValuation: '₹3,15,00,000', 
    growth: '+26.0%', 
    status: 'Appreciating',
    occupancy: 'Development Ready'
  },
  { 
    id: 2, 
    property: '2BHK Luxury Apartment', 
    location: 'Jagatpura, Jaipur', 
    type: 'Residential High-Rise',
    purchasePrice: '₹45,00,000', 
    currentValuation: '₹52,00,000', 
    growth: '+15.5%', 
    status: 'Rented (Yield: 4.2%)',
    occupancy: 'Occupied · Long Lease'
  },
];

function Investments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState(initialStockHoldings);
  const [realEstate, setRealEstate] = useState(initialRealEstateHoldings);
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal Form State
  const [modalCategory, setModalCategory] = useState('realestate');
  const [assetName, setAssetName] = useState('');
  const [locationOrSymbol, setLocationOrSymbol] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [currentValuation, setCurrentValuation] = useState('');
  const [statusText, setStatusText] = useState('Appreciating');

  // Dynamic calculations from portfolio holdings state
  const parseAmount = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    return parseFloat(val.toString().replace(/[^\d.]/g, '')) || 0;
  };

  const totalRealEstateCurrent = realEstate.reduce((sum, item) => sum + parseAmount(item.currentValuation), 0);
  const totalRealEstateInvested = realEstate.reduce((sum, item) => sum + parseAmount(item.purchasePrice), 0);
  const totalStocksCurrent = stocks.reduce((sum, item) => sum + parseAmount(item.current), 0);
  const totalStocksInvested = stocks.reduce((sum, item) => sum + parseAmount(item.invested), 0);

  const totalPortfolioValuation = totalRealEstateCurrent + totalStocksCurrent;
  const totalInvestedBasis = totalRealEstateInvested + totalStocksInvested;
  const totalGain = totalPortfolioValuation - totalInvestedBasis;
  const overallROI = totalInvestedBasis > 0 ? ((totalGain / totalInvestedBasis) * 100).toFixed(1) : '0.0';
  const stocksGain = totalStocksCurrent - totalStocksInvested;

  const rePercent = totalPortfolioValuation > 0 ? ((totalRealEstateCurrent / totalPortfolioValuation) * 100).toFixed(1) : '0.0';
  const stocksPercent = (100 - parseFloat(rePercent)).toFixed(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveAsset = (e) => {
    e.preventDefault();
    if (!assetName || !currentValuation) return;

    if (modalCategory === 'realestate') {
      const newProperty = {
        id: Date.now(),
        property: assetName,
        location: locationOrSymbol || 'Jaipur, RJ',
        type: 'Commercial / Residential Real Estate',
        purchasePrice: purchasePrice ? `₹${parseFloat(purchasePrice).toLocaleString()}` : '₹50,00,000',
        currentValuation: `₹${parseFloat(currentValuation).toLocaleString()}`,
        growth: '+12.5%',
        status: statusText || 'Appreciating',
        occupancy: 'Verified Asset'
      };
      setRealEstate([newProperty, ...realEstate]);
    } else {
      const newStock = {
        id: Date.now(),
        name: assetName,
        symbol: (locationOrSymbol || assetName.substring(0, 6)).toUpperCase(),
        category: 'Public Equities',
        invested: purchasePrice ? `₹${parseFloat(purchasePrice).toLocaleString()}` : '₹50,000',
        current: `₹${parseFloat(currentValuation).toLocaleString()}`,
        returns: '+10.0%',
        type: 'profit'
      };
      setStocks([newStock, ...stocks]);
    }

    setShowAddModal(false);
    setAssetName('');
    setLocationOrSymbol('');
    setPurchasePrice('');
    setCurrentValuation('');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <Sidebar />
        <main className="wm-page-main">
          {/* Skeleton Hero */}
          <div style={{ marginBottom: '40px' }}>
            <div className="skeleton" style={{ width: '180px', height: '14px', marginBottom: '14px' }}></div>
            <div className="skeleton" style={{ width: '420px', height: '48px', marginBottom: '16px' }}></div>
            <div className="skeleton" style={{ width: '560px', height: '20px' }}></div>
          </div>

          {/* Skeleton Portfolio Strip */}
          <div className="skeleton" style={{ width: '100%', height: '240px', marginBottom: '32px' }}></div>

          {/* Skeleton Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="skeleton" style={{ height: '200px' }}></div>
            <div className="skeleton" style={{ height: '200px' }}></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar />

      <main className="wm-page-main">
        
        {/* ------------------------------------------------------------------
            SECTION 1: EDITORIAL HERO & ACTIONS
            ------------------------------------------------------------------ */}
        <section className="wm-page-hero">
          <div className="wm-page-hero-content">
            <span className="wm-eyebrow">Investment Intelligence & Capital Allocation</span>
            <h1 className="wm-hero-title">
              Your Capital.<br />
              Working Harder.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '640px' }}>
              Institutional-grade portfolio allocation tracking tangible real estate assets, private equities, and public securities with real-time valuation audits.
            </p>
          </div>

          <div className="wm-page-actions">
            <button 
              onClick={() => setShowAddModal(true)} 
              className="wm-btn wm-btn-primary"
              aria-label="Record a new asset"
            >
              <Plus size={16} /> Record Asset
            </button>
            <button 
              onClick={() => navigate('/forecast')} 
              className="wm-btn wm-btn-secondary"
              aria-label="Open financial forecasting model"
            >
              <Sparkles size={16} /> Growth Forecast →
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: PORTFOLIO FEATURE OVERVIEW (DOMINANT FEATURE PANEL)
            ------------------------------------------------------------------ */}
        <section className="wm-dash-feature-card">
          <div className="wm-dash-feature-header">
            <div>
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color="#8B00FF" /> Consolidated Portfolio Valuation
              </span>
              <div className="wm-dash-networth-val" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span>₹ {totalPortfolioValuation.toLocaleString('en-IN')}</span>
                <span className="wm-badge-positive" style={{ fontSize: '13px', padding: '6px 12px' }}>
                  <TrendingUp size={14} /> +{overallROI}% Overall ROI
                </span>
              </div>
              <p className="wm-caption" style={{ margin: '8px 0 0 0' }}>
                Reconciled across {realEstate.length} prime real estate properties and {stocks.length} active equity securities.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'left', minWidth: '150px' }}>
                <span className="wm-eyebrow">Total Invested Basis</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#111111', marginTop: '4px' }}>
                  ₹ {totalInvestedBasis.toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>Original acquisition capital</span>
              </div>
              <div style={{ textAlign: 'left', minWidth: '150px' }}>
                <span className="wm-eyebrow">Unrealized Capital Gain</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669', marginTop: '4px' }}>
                  +{totalGain >= 0 ? '' : '-'}₹ {Math.abs(totalGain).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>Pre-tax asset appreciation</span>
              </div>
            </div>
          </div>

          {/* Asset Allocation Progress Bar */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="wm-eyebrow">Capital Allocation Distribution</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#8B00FF' }}>{rePercent}% Tangible Real Estate · {stocksPercent}% Equities</span>
            </div>
            <div className="wm-allocation-bar">
              <div style={{ width: `${rePercent}%`, background: '#8B00FF' }} title={`Real Estate: ${rePercent}%`} />
              <div style={{ width: `${stocksPercent}%`, background: '#06B6D4' }} title={`Equities: ${stocksPercent}%`} />
            </div>
          </div>

          {/* Allocation Detail Columns */}
          <div className="wm-allocation-grid" style={{ marginTop: '24px' }}>
            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#8B00FF' }} />
                Real Estate Holdings
              </span>
              <div className="wm-allocation-value">₹ {totalRealEstateCurrent.toLocaleString('en-IN')}</div>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>{realEstate.length} Properties · High capital appreciation</span>
            </div>

            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#06B6D4' }} />
                Stock Equities
              </span>
              <div className="wm-allocation-value">₹ {totalStocksCurrent.toLocaleString('en-IN')}</div>
              <span style={{ fontSize: '11px', color: stocksGain >= 0 ? '#059669' : '#DC2626', fontWeight: '600' }}>
                {stocksGain >= 0 ? '+' : '-'}₹{Math.abs(stocksGain).toLocaleString('en-IN')} Net {stocksGain >= 0 ? 'Profit' : 'Loss'}
              </span>
            </div>

            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#10B981' }} />
                Rental Dividend Yield
              </span>
              <div className="wm-allocation-value">4.2% APY</div>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Active residential cashflow</span>
            </div>

            <div className="wm-allocation-item">
              <span className="wm-allocation-label">
                <span className="wm-allocation-dot" style={{ background: '#6366F1' }} />
                Liquidity Reserve
              </span>
              <div className="wm-allocation-value">₹ 24,500</div>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Immediate cash settlement</span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: REAL ESTATE HOLDINGS (EDITORIAL CARDS)
            ------------------------------------------------------------------ */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <span className="wm-eyebrow">Tangible Assets & Land Parcels</span>
              <h2 className="wm-card-heading" style={{ margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={22} color="#8B00FF" /> Real Estate Holdings
              </h2>
            </div>
            <span className="wm-caption" style={{ fontWeight: '600' }}>
              {realEstate.length} Properties Tracked
            </span>
          </div>

          <div className="wm-asset-grid">
            {realEstate.map((prop) => (
              <div key={prop.id} className="wm-asset-card">
                <div>
                  <div className="wm-asset-header">
                    <div>
                      <span className="wm-tag" style={{ marginBottom: '8px' }}>
                        {prop.type}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111111', margin: '4px 0 0 0' }}>
                        {prop.property}
                      </h3>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '13px', marginTop: '6px' }}>
                        <MapPin size={14} color="#8B00FF" /> {prop.location}
                      </p>
                    </div>
                    <span 
                      style={{ 
                        background: '#F3E8FF', 
                        color: '#8B00FF', 
                        border: '1px solid #E9D5FF',
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '11px', 
                        fontWeight: '700',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {prop.status}
                    </span>
                  </div>

                  <div className="wm-asset-stats-grid">
                    <div className="wm-asset-stat-col">
                      <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280' }}>
                        Purchase Basis
                      </span>
                      <p style={{ fontWeight: '700', fontSize: '15px', color: '#111111', margin: 0 }}>
                        {prop.purchasePrice}
                      </p>
                    </div>

                    <div className="wm-asset-stat-col">
                      <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280' }}>
                        Current Valuation
                      </span>
                      <p style={{ fontWeight: '800', fontSize: '15px', color: '#059669', margin: 0 }}>
                        {prop.currentValuation}
                      </p>
                    </div>

                    <div className="wm-asset-stat-col">
                      <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280' }}>
                        Appreciation
                      </span>
                      <p style={{ fontWeight: '800', fontSize: '15px', color: '#059669', margin: 0, display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <ArrowUpRight size={14} /> {prop.growth}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>
                    Status: <strong style={{ color: '#111111' }}>{prop.occupancy}</strong>
                  </span>
                  <span style={{ fontSize: '12px', color: '#8B00FF', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Audited Deed <ShieldCheck size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 4: STOCKS & EQUITIES PORTFOLIO (EDITORIAL LEDGER)
            ------------------------------------------------------------------ */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <span className="wm-eyebrow">Public Securities & Market Instruments</span>
              <h2 className="wm-card-heading" style={{ margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={22} color="#059669" /> Stock Portfolio & Equities
              </h2>
            </div>
            <span className="wm-caption" style={{ fontWeight: '600' }}>
              {stocks.length} Positions Active
            </span>
          </div>

          <div className="wm-table-card">
            <table className="wm-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px' }}>Asset / Company</th>
                  <th>Sector</th>
                  <th>Invested Basis</th>
                  <th>Current Market Value</th>
                  <th style={{ textAlign: 'right', paddingRight: '24px' }}>Unrealized Return</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td style={{ padding: '18px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '4px', 
                            background: '#FAF5FF', 
                            border: '1px solid #E9D5FF',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontWeight: '800',
                            fontSize: '12px',
                            color: '#8B00FF'
                          }}
                        >
                          {stock.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#111111', fontSize: '14px' }}>{stock.name}</div>
                          <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>NSE: {stock.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="wm-tag">
                        {stock.category}
                      </span>
                    </td>
                    <td style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                      {stock.invested}
                    </td>
                    <td style={{ fontWeight: '700', color: '#111111', fontSize: '14px' }}>
                      {stock.current}
                    </td>
                    <td 
                      style={{ 
                        textAlign: 'right', 
                        fontWeight: '800', 
                        fontSize: '15px', 
                        paddingRight: '24px',
                        color: stock.type === 'profit' ? '#059669' : '#DC2626' 
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {stock.type === 'profit' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {stock.returns}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Navigation Deep Links */}
        <div style={{ marginTop: '40px', padding: '24px', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="wm-eyebrow" style={{ color: '#8B00FF' }}>Next Step: Strategic Wealth Projections</span>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111111', marginTop: '2px' }}>
              Want to see portfolio compounding over 5, 10, and 20 year horizons?
            </div>
          </div>
          <button 
            onClick={() => navigate('/forecast')}
            className="wm-btn wm-btn-primary"
            aria-label="Navigate to Financial Forecast"
          >
            Run Multi-Year Forecast Simulation <ArrowRight size={16} />
          </button>
        </div>

      </main>

      {/* ------------------------------------------------------------------
          MODAL: RECORD INVESTMENT ASSET DIALOG
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
            style={{ width: '100%', maxWidth: '460px', maxHeight: '90vh', overflowY: 'auto', padding: '36px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 className="wm-card-heading" style={{ margin: 0 }}>Record Investment Asset</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="wm-caption" style={{ marginBottom: '24px' }}>
              Add a new commercial property, residential flat, equity stake, or fund to your portfolio.
            </p>

            <form onSubmit={handleSaveAsset}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  Asset Class
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    onClick={() => setModalCategory('realestate')}
                    className={`wm-filter-btn ${modalCategory === 'realestate' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Real Estate
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setModalCategory('stocks')}
                    className={`wm-filter-btn ${modalCategory === 'stocks' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Public Stock
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  {modalCategory === 'realestate' ? 'Property Name / Project' : 'Company Name'}
                </label>
                <input 
                  type="text" 
                  className="wm-input" 
                  placeholder={modalCategory === 'realestate' ? 'e.g. Prestige Tech Park Villa' : 'e.g. Infosys Ltd'} 
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  required 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                  {modalCategory === 'realestate' ? 'Location (City, State)' : 'NSE / BSE Ticker Symbol'}
                </label>
                <input 
                  type="text" 
                  className="wm-input" 
                  placeholder={modalCategory === 'realestate' ? 'e.g. Bengaluru, KA' : 'e.g. INFY'} 
                  value={locationOrSymbol}
                  onChange={(e) => setLocationOrSymbol(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                    Invested Basis (₹)
                  </label>
                  <input 
                    type="number" 
                    className="wm-input" 
                    placeholder="e.g. 5000000" 
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                    Current Valuation (₹)
                  </label>
                  <input 
                    type="number" 
                    className="wm-input" 
                    placeholder="e.g. 6200000" 
                    value={currentValuation}
                    onChange={(e) => setCurrentValuation(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {modalCategory === 'realestate' && (
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                    Current Asset Status
                  </label>
                  <select 
                    className="wm-input" 
                    value={statusText} 
                    onChange={(e) => setStatusText(e.target.value)}
                    style={{ background: '#FFFFFF' }}
                  >
                    <option value="Appreciating">Appreciating (Capital Growth)</option>
                    <option value="Rented (Yield: 4.8%)">Rented (Active Yield)</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Commercial Lease">Commercial Lease</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: modalCategory === 'realestate' ? 0 : '16px' }}>
                <button type="submit" className="wm-btn wm-btn-primary" style={{ flex: 1 }}>
                  Save to Portfolio
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

export default Investments;
