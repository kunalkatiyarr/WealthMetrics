import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Building2, TrendingUp, PieChart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stockHoldings = [
  { id: 1, name: 'Reliance Industries', symbol: 'RELIANCE', category: 'Stocks', invested: '₹1,20,000', current: '₹1,45,000', returns: '+20.8%', type: 'profit' },
  { id: 2, name: 'Tata Consultancy Services', symbol: 'TCS', category: 'Stocks', invested: '₹85,000', current: '₹98,200', returns: '+15.5%', type: 'profit' },
  { id: 3, name: 'HDFC Bank', symbol: 'HDFCBANK', category: 'Stocks', invested: '₹60,000', current: '₹57,400', returns: '-4.3%', type: 'loss' },
];

const realEstateHoldings = [
  { id: 1, property: 'Commercial Plot (Mahindra SEZ)', location: 'Jaipur, RJ', purchasePrice: '₹2,50,000,000', currentValuation: '₹3,15,000,000', growth: '+26.0%', status: 'Appreciating' },
  { id: 2, property: '2BHK Luxury Apartment', location: 'Jagatpura, Jaipur', purchasePrice: '₹45,00,000', currentValuation: '₹52,00,000', growth: '+15.5%', status: 'Rented (Yield: 4.2%)' },
];

function Investments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          {/* Header Skeleton */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <div className="skeleton" style={{ width: '220px', height: '32px', marginBottom: '8px' }}></div>
              <div className="skeleton" style={{ width: '320px', height: '16px' }}></div>
            </div>
            <div className="skeleton" style={{ width: '130px', height: '40px' }}></div>
          </div>

          {/* Cards Skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
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

          {/* Table Block Skeleton */}
          <div className="glass-card" style={{ padding: '24px', height: '300px' }}>
            <div className="skeleton" style={{ width: '180px', height: '20px', marginBottom: '24px' }}></div>
            <div className="skeleton" style={{ width: '100%', height: '200px' }}></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>Investment Portfolio</h1>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Track Real Estate assets, Stock equities, and wealth growth.</p>
          </div>
          <button className="btn-primary" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Plus size={18} /> Add New Asset
          </button>
        </div>

        {/* Portfolio Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span style={{ fontSize: '14px' }}>Total Portfolio Value</span>
              <PieChart size={20} color="#4f46e5" />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginTop: '10px', color: '#0f172a' }}>₹ 3,68,70,600</h2>
            <span style={{ color: '#059669', fontSize: '13px', fontWeight: '600' }}>+22.4% overall ROI</span>
          </div>

          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span style={{ fontSize: '14px' }}>Real Estate Allocation</span>
              <Building2 size={20} color="#3b82f6" />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginTop: '10px', color: '#0f172a' }}>₹ 3,67,00,000</h2>
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600' }}>2 Properties Owned</span>
          </div>

          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span style={{ fontSize: '14px' }}>Stock Equities</span>
              <TrendingUp size={20} color="#f59e0b" />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginTop: '10px', color: '#0f172a' }}>₹ 3,00,600</h2>
            <span style={{ color: '#059669', fontSize: '13px', fontWeight: '600' }}>+₹35,600 Unrealized Profit</span>
          </div>

        </div>

        {/* Real Estate Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
            <Building2 color="#3b82f6" size={22} /> Real Estate Holdings
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {realEstateHoldings.map((prop) => (
              <div key={prop.id} className="glass-card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{prop.property}</h3>
                    <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>📍 {prop.location}</p>
                  </div>
                  <span style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                    {prop.status}
                  </span>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#475569' }}>Purchase Price</span>
                    <p style={{ fontWeight: '600', fontSize: '15px', color: '#0f172a' }}>{prop.purchasePrice}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#475569' }}>Current Value</span>
                    <p style={{ fontWeight: '700', fontSize: '15px', color: '#059669' }}>{prop.currentValuation}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#475569' }}>Appreciation</span>
                    <p style={{ fontWeight: '600', fontSize: '15px', color: '#059669' }}>{prop.growth}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stocks & Equities Table */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
            <TrendingUp color="#10b981" size={22} /> Stock Portfolio
          </h2>

          <div className="glass-card" style={{ padding: '24px', overflowX: 'auto', backgroundColor: '#ffffff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ paddingBottom: '12px' }}>Asset</th>
                  <th style={{ paddingBottom: '12px' }}>Invested</th>
                  <th style={{ paddingBottom: '12px' }}>Current Value</th>
                  <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Total Returns</th>
                </tr>
              </thead>
              <tbody>
                {stockHoldings.map((stock) => (
                  <tr key={stock.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 0' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{stock.name}</div>
                      <span style={{ fontSize: '12px', color: '#475569' }}>{stock.symbol}</span>
                    </td>
                    <td style={{ color: '#0f172a' }}>{stock.invested}</td>
                    <td style={{ fontWeight: '600', color: '#0f172a' }}>{stock.current}</td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: stock.type === 'profit' ? '#059669' : '#b91c1c' }}>
                      {stock.returns}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Investments;
