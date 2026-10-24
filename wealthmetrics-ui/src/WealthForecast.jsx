import React, { useState, useEffect, useCallback } from 'react';
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
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function WealthForecast() {
  const navigate = useNavigate();
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

  const calculateForecast = useCallback(() => {
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

  useEffect(() => {
    calculateForecast();
  }, [calculateForecast]);

  const PIE_COLORS = ['#8B00FF', '#06B6D4'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar />

      <main className="wm-page-main">
        
        {/* ------------------------------------------------------------------
            SECTION 1: EDITORIAL HERO & SCENARIO SELECTOR
            ------------------------------------------------------------------ */}
        <section className="wm-page-hero">
          <div className="wm-page-hero-content">
            <span className="wm-eyebrow">Wealth Projection & Capital Modeling</span>
            <h1 className="wm-hero-title">
              Model<br />
              What Comes<br />
              Next.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '640px' }}>
              Actuarial compound interest simulator modeling nominal wealth trajectory, inflation-adjusted purchasing power, and capital doubling timelines.
            </p>
          </div>

          <div className="wm-page-actions">
            {/* Scenario Segmented Switch */}
            <div className="wm-scenario-group" role="group" aria-label="Forecast scenarios">
              {['conservative', 'moderate', 'aggressive'].map((scen) => (
                <button
                  key={scen}
                  onClick={() => setScenario(scen)}
                  className={`wm-scenario-btn ${scenario === scen ? 'active' : ''}`}
                >
                  {scen}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: DOMINANT PROJECTED WEALTH FEATURE CARD
            ------------------------------------------------------------------ */}
        <section className="wm-dash-feature-card">
          <div className="wm-dash-feature-header">
            <div>
              <span className="wm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color="#8B00FF" /> Projected Retirement Wealth (Age {retireAge})
              </span>
              <div className="wm-dash-networth-val" style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
                <span>₹ {((summaryMetrics.netWorthRetire || 0) / 10000000).toFixed(2)} Crore</span>
                <span className="wm-badge-positive" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  <TrendingUp size={14} /> {(scenario).toUpperCase()} MODEL
                </span>
              </div>
              <p className="wm-caption" style={{ margin: '8px 0 0 0' }}>
                Real Purchasing Power (Inflation-Adjusted): <strong style={{ color: '#111111' }}>₹ {(((summaryMetrics.netWorthRetire || 0) / Math.pow(1 + inflation/100, Math.max(1, retireAge - currentAge))) / 10000000).toFixed(2)} Crore</strong> at {inflation}% annual inflation.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'left', minWidth: '140px' }}>
                <span className="wm-eyebrow">Doubling Horizon</span>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#8B00FF', marginTop: '4px' }}>
                  {summaryMetrics.doubleYear} Years
                </div>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>To surpass ₹7.52 Crore</span>
              </div>
              <div style={{ textAlign: 'left', minWidth: '140px' }}>
                <span className="wm-eyebrow">Monthly Capital Add</span>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginTop: '4px' }}>
                  ₹ {monthlySavings.toLocaleString()}
                </div>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>Indexed at {salaryGrowth}% growth</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: TWO-COLUMN MODELING CONSOLE (SLIDERS + CHART)
            ------------------------------------------------------------------ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 2fr', gap: '32px', marginBottom: '48px' }}>
          
          {/* Sliders and Controls Console */}
          <div className="wm-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span className="wm-eyebrow">Actuarial Parameters</span>
              <h3 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>Simulation Inputs</h3>
            </div>
            
            {/* Age Range Sliders */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151' }}>
                  Current Age / Target Retirement
                </label>
                <span style={{ fontWeight: '800', color: '#8B00FF', fontSize: '13px' }}>
                  {currentAge} yrs / {retireAge} yrs
                </span>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="range" 
                    min="18" 
                    max="65" 
                    value={currentAge}
                    onChange={(e) => setCurrentAge(parseInt(e.target.value))}
                    className="wm-slider"
                    aria-label="Current age slider"
                  />
                  <span style={{ fontSize: '10px', color: '#6B7280', display: 'block', marginTop: '2px' }}>Current: {currentAge}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="range" 
                    min="40" 
                    max="85" 
                    value={retireAge}
                    onChange={(e) => setRetireAge(parseInt(e.target.value))}
                    className="wm-slider"
                    aria-label="Target retirement age slider"
                  />
                  <span style={{ fontSize: '10px', color: '#6B7280', display: 'block', marginTop: '2px' }}>Retire: {retireAge}</span>
                </div>
              </div>
            </div>

            {/* Current Net Worth Input */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Current Starting Net Worth (₹)
              </label>
              <input 
                type="number" 
                className="wm-input" 
                value={currentNetWorth}
                onChange={(e) => setCurrentNetWorth(parseFloat(e.target.value) || 0)}
                aria-label="Starting net worth"
              />
            </div>

            {/* Monthly Savings Target */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151' }}>
                  Monthly Savings Target
                </label>
                <span style={{ fontWeight: '800', color: '#8B00FF', fontSize: '13px' }}>
                  ₹ {monthlySavings.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="500000" 
                step="5000"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(parseInt(e.target.value))}
                className="wm-slider"
                aria-label="Monthly savings slider"
              />
            </div>

            {/* Expected Annual Returns */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151' }}>
                  Expected Equities Return (%)
                </label>
                <span style={{ fontWeight: '800', color: '#059669', fontSize: '13px' }}>
                  {expectedReturn}%
                </span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="25" 
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                className="wm-slider"
                aria-label="Expected return slider"
              />
            </div>

            {/* Property appreciation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151' }}>
                  Property Appreciation (%)
                </label>
                <span style={{ fontWeight: '800', color: '#8B00FF', fontSize: '13px' }}>
                  {propertyAppreciation}%
                </span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="15" 
                step="0.5"
                value={propertyAppreciation}
                onChange={(e) => setPropertyAppreciation(parseFloat(e.target.value))}
                className="wm-slider"
                aria-label="Property appreciation slider"
              />
            </div>

            {/* Inflation & Salary sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', display: 'block', marginBottom: '4px' }}>
                  Inflation (%)
                </label>
                <input 
                  type="number" 
                  className="wm-input" 
                  value={inflation}
                  onChange={(e) => setInflation(parseFloat(e.target.value) || 0)}
                  aria-label="Inflation percentage"
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', display: 'block', marginBottom: '4px' }}>
                  Salary Growth (%)
                </label>
                <input 
                  type="number" 
                  className="wm-input" 
                  value={salaryGrowth}
                  onChange={(e) => setSalaryGrowth(parseFloat(e.target.value) || 0)}
                  aria-label="Salary growth percentage"
                />
              </div>
            </div>

          </div>

          {/* Interactive Chart */}
          <div className="wm-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="wm-eyebrow">Multi-Asset Trajectory</span>
                <h3 className="wm-card-heading" style={{ margin: '4px 0 0 0' }}>
                  Cumulative Assets Valuation Projections
                </h3>
              </div>
              <span className="wm-tag">
                {retireAge - currentAge} Years Horizon
              </span>
            </div>

            <div style={{ flex: 1, width: '100%', minHeight: '340px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={forecastData}>
                  <XAxis dataKey="age" stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `Age ${v}`} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `₹${v/10000000}Cr`} />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, '']} 
                    contentStyle={{ 
                      background: '#FFFFFF', 
                      borderColor: '#E5E7EB', 
                      borderRadius: '4px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                      fontFamily: 'Inter, sans-serif'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Total Net Worth" name="Nominal Net Worth" stroke="#8B00FF" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Inflation Adjusted" name="Real Purchasing Power" stroke="#F59E0B" strokeWidth={2.2} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="Real Estate" name="Real Estate Equity" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="Liquid Assets" name="Liquid Securities" stroke="#06B6D4" strokeWidth={1.5} dot={false} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>

            {/* Simulation Insight Callout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--wm-bg-lavender)', color: '#8B00FF', padding: '14px 18px', borderRadius: '4px', fontSize: '13px', marginTop: '20px', border: '1px solid #E9D5FF' }}>
              <Sparkles size={18} style={{ flexShrink: 0 }} />
              <span style={{ color: '#111111', fontWeight: '500' }}>
                With property compounding at {propertyAppreciation}% plus recurring monthly investments of ₹{monthlySavings.toLocaleString()}, nominal net worth scales to <strong style={{ color: '#8B00FF' }}>₹{((summaryMetrics.netWorthRetire || 0)/10000000).toFixed(2)} Cr</strong> by age {retireAge}.
              </span>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------
            SECTION 4: MILESTONES & RETIREMENT ALLOCATION
            ------------------------------------------------------------------ */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '40px' }}>
          
          {/* Milestone timeline cards */}
          <div className="wm-card">
            <span className="wm-eyebrow">Chronological Capital Thresholds</span>
            <h3 className="wm-card-heading" style={{ margin: '4px 0 20px 0' }}>
              Future Net Worth Milestones
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              
              <div style={{ padding: '20px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px' }}>
                <span className="wm-eyebrow" style={{ color: '#6B7280' }}>After 5 Years</span>
                <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#111111' }}>
                  ₹{((summaryMetrics.netWorth5Yr || 0)/10000000).toFixed(2)} Cr
                </div>
                <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', fontWeight: '600' }}>Age {currentAge + 5} Projection</div>
              </div>

              <div style={{ padding: '20px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px' }}>
                <span className="wm-eyebrow" style={{ color: '#6B7280' }}>After 10 Years</span>
                <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#111111' }}>
                  ₹{((summaryMetrics.netWorth10Yr || 0)/10000000).toFixed(2)} Cr
                </div>
                <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', fontWeight: '600' }}>Age {currentAge + 10} Projection</div>
              </div>

              <div style={{ padding: '20px', background: 'var(--wm-bg-secondary)', border: '1px solid var(--wm-border)', borderRadius: '4px' }}>
                <span className="wm-eyebrow" style={{ color: '#6B7280' }}>At Retirement ({retireAge})</span>
                <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#059669' }}>
                  ₹{((summaryMetrics.netWorthRetire || 0)/10000000).toFixed(2)} Cr
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                  Inflation-Adj: ₹{(((summaryMetrics.netWorthRetire || 0) / Math.pow(1 + inflation/100, Math.max(1, retireAge - currentAge)))/10000000).toFixed(2)} Cr
                </div>
              </div>

              <div style={{ padding: '20px', background: 'var(--wm-bg-lavender)', border: '1px solid #E9D5FF', borderRadius: '4px' }}>
                <span className="wm-eyebrow" style={{ color: '#8B00FF' }}>Wealth Doubling</span>
                <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#8B00FF' }}>
                  {summaryMetrics.doubleYear} Years
                </div>
                <div style={{ fontSize: '11px', color: '#8B00FF', marginTop: '4px', fontWeight: '600' }}>
                  To reach ₹7.52 Crore
                </div>
              </div>

            </div>
          </div>

          {/* Allocation Pie Chart */}
          <div className="wm-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="wm-eyebrow">Asset Composition</span>
            <h3 className="wm-card-heading" style={{ margin: '4px 0 12px 0' }}>
              Retirement Allocation ({retireAge})
            </h3>
            
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
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${(v/10000000).toFixed(2)} Cr`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#8B00FF', borderRadius: '2px' }}></div>
                <span style={{ fontWeight: '600', color: '#111111' }}>Real Estate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#06B6D4', borderRadius: '2px' }}></div>
                <span style={{ fontWeight: '600', color: '#111111' }}>Liquid Portfolio</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA to Calendar / Planning */}
        <div style={{ marginTop: '20px', padding: '24px 32px', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="wm-eyebrow" style={{ color: '#8B00FF' }}>Next Step: Reconcile Upcoming Cash Inflows</span>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111111', marginTop: '2px' }}>
              Schedule dividend distributions, SIP deductions, and rental receipts on the Wealth Calendar.
            </div>
          </div>
          <button 
            onClick={() => navigate('/calendar')}
            className="wm-btn wm-btn-primary"
            aria-label="Open Wealth Calendar"
          >
            Open Wealth Calendar <ArrowRight size={16} />
          </button>
        </div>

      </main>
    </div>
  );
}

export default WealthForecast;
