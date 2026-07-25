import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Sparkles
} from 'lucide-react';

function WealthForecast() {
  // Input parameters state
  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(60);
  const [currentNetWorth, setCurrentNetWorth] = useState(37600000); // 3.76 Crore
  const [monthlySavings, setMonthlySavings] = useState(125400); // 1.25 L
  const [expectedReturn, setExpectedReturn] = useState(12); // 12% equity growth
  const [inflation, setInflation] = useState(6); // 6% inflation
  const [salaryGrowth, setSalaryGrowth] = useState(8); // 8% salary growth
  const [propertyAppreciation, setPropertyAppreciation] = useState(7); // 7% property appreciation
  
  const [scenario, setScenario] = useState('moderate'); // conservative, moderate, aggressive
  const [forecastData, setForecastData] = useState([]);
  const [summaryMetrics, setSummaryMetrics] = useState({});

  useEffect(() => {
    calculateForecast();
  }, [
    currentAge, 
    retireAge, 
    currentNetWorth, 
    monthlySavings, 
    expectedReturn, 
    inflation, 
    salaryGrowth, 
    propertyAppreciation, 
    scenario
  ]);

  const calculateForecast = () => {
    let adjustedReturn = expectedReturn / 100;
    let adjustedProperty = propertyAppreciation / 100;
    let adjustedSalary = salaryGrowth / 100;

    if (scenario === 'conservative') {
      adjustedReturn -= 0.03;
      adjustedProperty -= 0.02;
      adjustedSalary -= 0.02;
    } else if (scenario === 'aggressive') {
      adjustedReturn += 0.03;
      adjustedProperty += 0.02;
      adjustedSalary += 0.02;
    }

    const inflationRate = inflation / 100;
    const yearsToForecast = Math.max(5, retireAge - currentAge);

    let realEstate = 36700000;
    let liquidPortfolio = currentNetWorth - realEstate; 
    let savingsRate = monthlySavings * 12;

    const data = [];
    let netWorth = currentNetWorth;
    
    data.push({
      year: 0,
      age: currentAge,
      'Real Estate': Math.round(realEstate),
      'Liquid Assets': Math.round(liquidPortfolio),
      'Total Net Worth': Math.round(netWorth),
      'Inflation Adjusted': Math.round(netWorth),
    });

    for (let year = 1; year <= yearsToForecast; year++) {
      realEstate = realEstate * (1 + adjustedProperty);
      liquidPortfolio = (liquidPortfolio + savingsRate) * (1 + adjustedReturn);
      savingsRate = savingsRate * (1 + adjustedSalary);
      netWorth = realEstate + liquidPortfolio;

      const inflationAdjusted = netWorth / Math.pow(1 + inflationRate, year);

      data.push({
        year,
        age: currentAge + year,
        'Real Estate': Math.round(realEstate),
        'Liquid Assets': Math.round(liquidPortfolio),
        'Total Net Worth': Math.round(netWorth),
        'Inflation Adjusted': Math.round(inflationAdjusted),
      });
    }

    setForecastData(data);

    const getMetricsForYear = (y) => {
      const idx = Math.min(y, data.length - 1);
      return data[idx] || {};
    };

    const yr5 = getMetricsForYear(5);
    const yr10 = getMetricsForYear(10);
    const yr20 = getMetricsForYear(20);
    const retirement = getMetricsForYear(retireAge - currentAge);

    const targetDouble = currentNetWorth * 2;
    let doubleYear = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i]['Total Net Worth'] >= targetDouble) {
        doubleYear = data[i].year;
        break;
      }
    }

    setSummaryMetrics({
      netWorth5Yr: yr5['Total Net Worth'] || 0,
      netWorth10Yr: yr10['Total Net Worth'] || 0,
      netWorth20Yr: yr20['Total Net Worth'] || 0,
      netWorthRetire: retirement['Total Net Worth'] || 0,
      doubleYear: doubleYear !== -1 ? doubleYear : '15+ Years',
      futureAllocation: [
        { name: 'Real Estate', value: retirement['Real Estate'] || 0 },
        { name: 'Liquid Assets', value: retirement['Liquid Assets'] || 0 }
      ]
    });
  };

  const COLORS = ['#3b82f6', '#4f46e5'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.04) 0px, transparent 50%), radial-gradient(at 50% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.03) 0px, transparent 50%), #f8fafc', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow blobs */}
      <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'rgba(79, 70, 229, 0.03)', filter: 'blur(100px)', borderRadius: '50%', top: '20%', right: '15%', zIndex: 0 }}></div>

      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', zIndex: 1, position: 'relative' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
              <TrendingUp size={24} color="#4f46e5" /> Future Net Worth Forecast
            </h1>
            <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>Simulate compound interest scenarios to map your journey to financial freedom.</p>
          </div>

          {/* Scenario buttons */}
          <div style={{ display: 'flex', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            {['conservative', 'moderate', 'aggressive'].map((scen) => (
              <button
                key={scen}
                onClick={() => setScenario(scen)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: scenario === scen ? 'linear-gradient(135deg, #4f46e5, #6d28d9)' : 'transparent',
                  color: scenario === scen ? '#fff' : '#475569',
                  fontWeight: '600',
                  border: 'none',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: scenario === scen ? '0 2px 6px rgba(79, 70, 229, 0.2)' : 'none'
                }}
              >
                {scen}
              </button>
            ))}
          </div>
        </header>

        {/* Input Parameters & Metrics Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Sliders and Controls */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', color: '#0f172a' }}>Simulation Inputs</h3>
            
            {/* Age sliders */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#475569' }}>Current Age / Retirement Age</span>
                <span style={{ fontWeight: '600', color: '#4f46e5' }}>{currentAge} / {retireAge} Yrs</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="range" 
                  min="18" 
                  max="70" 
                  value={currentAge}
                  onChange={(e) => setCurrentAge(parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: '#4f46e5' }} 
                />
                <input 
                  type="range" 
                  min="45" 
                  max="90" 
                  value={retireAge}
                  onChange={(e) => setRetireAge(parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: '#3b82f6' }} 
                />
              </div>
            </div>

            {/* Current Net Worth */}
            <div>
              <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '6px' }}>Current Net Worth (₹)</label>
              <input 
                type="number" 
                className="glass-input" 
                style={{ width: '100%' }} 
                value={currentNetWorth}
                onChange={(e) => setCurrentNetWorth(parseFloat(e.target.value) || 0)}
              />
            </div>

            {/* Monthly Savings */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#475569' }}>Monthly Savings Target</span>
                <span style={{ fontWeight: '600', color: '#4f46e5' }}>₹{monthlySavings.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="500000" 
                step="5000"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#4f46e5' }} 
              />
            </div>

            {/* Expected Annual Returns */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#475569' }}>Expected Equities Return (%)</span>
                <span style={{ fontWeight: '600', color: '#4f46e5' }}>{expectedReturn}%</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="25" 
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#4f46e5' }} 
              />
            </div>

            {/* Property appreciation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#475569' }}>Property Appreciation (%)</span>
                <span style={{ fontWeight: '600', color: '#3b82f6' }}>{propertyAppreciation}%</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="15" 
                step="0.5"
                value={propertyAppreciation}
                onChange={(e) => setPropertyAppreciation(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#3b82f6' }} 
              />
            </div>

            {/* Inflation & Salary sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>Inflation (%)</label>
                <input 
                  type="number" 
                  className="glass-input" 
                  style={{ width: '100%' }}
                  value={inflation}
                  onChange={(e) => setInflation(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>Salary Growth (%)</label>
                <input 
                  type="number" 
                  className="glass-input" 
                  style={{ width: '100%' }}
                  value={salaryGrowth}
                  onChange={(e) => setSalaryGrowth(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

          </div>

          {/* Interactive Chart */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#0f172a' }}>Cumulative Assets Valuation Projections</h3>
            <div style={{ flex: 1, width: '100%', minHeight: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={forecastData}>
                  <XAxis dataKey="age" stroke="#475569" tickFormatter={(v) => `Age ${v}`} />
                  <YAxis stroke="#475569" tickFormatter={(v) => `₹${v/10000000}Cr`} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} contentStyle={{ background: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="Total Net Worth" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Inflation Adjusted" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="Real Estate" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="Liquid Assets" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(79, 70, 229, 0.05)', color: '#4f46e5', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginTop: '16px', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
              <Sparkles size={16} />
              <span>Due to property appreciation + consistent ₹1.25 L savings, nominal net worth reaches ₹{(summaryMetrics.netWorthRetire/10000000).toFixed(2)} Cr by age {retireAge}.</span>
            </div>
          </div>

        </div>

        {/* Milestone Cards & Future Asset Allocation */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* Milestone timeline cards */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>Future Net Worth Milestones</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              
              <div className="glass-card" style={{ padding: '20px', background: 'rgba(15, 23, 42, 0.015)' }}>
                <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>After 5 Years</span>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginTop: '8px', color: '#0f172a' }}>₹{(summaryMetrics.netWorth5Yr/10000000).toFixed(2)} Cr</h4>
                <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px' }}>Nominal valuation</div>
              </div>

              <div className="glass-card" style={{ padding: '20px', background: 'rgba(15, 23, 42, 0.015)' }}>
                <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>After 10 Years</span>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginTop: '8px', color: '#0f172a' }}>₹{(summaryMetrics.netWorth10Yr/10000000).toFixed(2)} Cr</h4>
                <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px' }}>Nominal valuation</div>
              </div>

              <div className="glass-card" style={{ padding: '20px', background: 'rgba(15, 23, 42, 0.015)' }}>
                <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>At Retirement ({retireAge})</span>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginTop: '8px', color: '#059669' }}>₹{(summaryMetrics.netWorthRetire/10000000).toFixed(2)} Cr</h4>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px' }}>Inflation Adjusted: ₹{((summaryMetrics.netWorthRetire / Math.pow(1 + inflation/100, retireAge - currentAge))/10000000).toFixed(2)} Cr</div>
              </div>

              <div className="glass-card" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(109, 40, 217, 0.04) 100%)', border: '1px solid rgba(79, 70, 229, 0.25)' }}>
                <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Double Your Wealth</span>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginTop: '8px', color: '#4f46e5' }}>{summaryMetrics.doubleYear} Years</h4>
                <div style={{ fontSize: '11px', color: '#4f46e5', marginTop: '6px' }}>To reach ₹7.52 Crore</div>
              </div>

            </div>
          </div>

          {/* Allocation Pie Chart */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#0f172a' }}>Retirement Allocation ({retireAge})</h3>
            <div style={{ flex: 1, width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={summaryMetrics.futureAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {summaryMetrics.futureAllocation?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${(v/10000000).toFixed(2)} Cr`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#475569', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                <span>Real Estate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
                <span>Liquid Portfolio</span>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default WealthForecast;
