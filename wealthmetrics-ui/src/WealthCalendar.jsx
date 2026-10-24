import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  Plus, 
  Trash2, 
  Edit, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  X,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function WealthCalendar() {
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed, so 7)
  const [selectedDay, setSelectedDay] = useState(6);
  
  // Modals state
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, inflow, outflow, investment

  // Event form state
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formType, setFormType] = useState('outflow');
  const [formDay, setFormDay] = useState(6);

  // Prefilled events for August 2026
  const [events, setEvents] = useState([
    { id: 1, title: 'Salary Credited', amount: 185000, type: 'inflow', day: 1, month: 7, year: 2026 },
    { id: 2, title: 'Mutual Fund SIP', amount: 20000, type: 'investment', day: 5, month: 7, year: 2026 },
    { id: 3, title: 'Apartment Maintenance', amount: 18000, type: 'outflow', day: 10, month: 7, year: 2026 },
    { id: 4, title: 'Freelance Design Bonus', amount: 15000, type: 'inflow', day: 15, month: 7, year: 2026 },
    { id: 5, title: 'Credit Card Bill Due', amount: 12400, type: 'outflow', day: 20, month: 7, year: 2026 },
    { id: 6, title: 'AWS Cloud Hosting Bill', amount: 3200, type: 'outflow', day: 25, month: 7, year: 2026 },
    { id: 7, title: 'Netflix Subscription', amount: 649, type: 'outflow', day: 22, month: 7, year: 2026 }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOffset = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOffset = getFirstDayOffset(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setFormDay(day);
  };

  const handleOpenAddModal = (day = 6) => {
    setEditingEvent(null);
    setFormTitle('');
    setFormAmount('');
    setFormType('outflow');
    setFormDay(day);
    setShowEventModal(true);
  };

  const handleOpenEditModal = (event) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormAmount(event.amount.toString());
    setFormType(event.type);
    setFormDay(event.day);
    setShowEventModal(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!formTitle || !formAmount) return;

    if (editingEvent) {
      setEvents(events.map(ev => 
        ev.id === editingEvent.id 
          ? { ...ev, title: formTitle, amount: parseFloat(formAmount), type: formType, day: formDay }
          : ev
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        title: formTitle,
        amount: parseFloat(formAmount),
        type: formType,
        day: formDay,
        month: currentMonth,
        year: currentYear
      };
      setEvents([...events, newEvent]);
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
    setShowEventModal(false);
  };

  const filteredEvents = events.filter(ev => {
    if (ev.month !== currentMonth || ev.year !== currentYear) return false;
    const matchesSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || ev.type === filterType;
    return matchesSearch && matchesType;
  });

  const getEventsForDay = (day) => {
    return filteredEvents.filter(ev => ev.day === day);
  };

  const getSummaryForMonth = () => {
    let inflows = 0;
    let outflows = 0;
    let investments = 0;

    filteredEvents.forEach(ev => {
      if (ev.type === 'inflow') inflows += ev.amount;
      else if (ev.type === 'outflow') outflows += ev.amount;
      else if (ev.type === 'investment') investments += ev.amount;
    });

    return { inflows, outflows, investments, net: inflows - outflows - investments };
  };

  const monthSummary = getSummaryForMonth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar />

      <main className="wm-page-main">
        
        {/* ------------------------------------------------------------------
            SECTION 1: EDITORIAL HERO & CONTROLS
            ------------------------------------------------------------------ */}
        <section className="wm-page-hero">
          <div className="wm-page-hero-content">
            <span className="wm-eyebrow">Financial Calendar & Planning</span>
            <h1 className="wm-hero-title">
              Plan What<br />
              Happens Next.
            </h1>
            <div className="wm-accent-bar" />
            <p className="wm-body-lead" style={{ margin: '16px 0 0 0', maxWidth: '640px' }}>
              Keep every financial deadline, salary credit, SIP mandate, and vendor obligation synchronized across an institutional ledger.
            </p>
          </div>

          <div className="wm-page-actions">
            {/* Filter Search Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search 
                size={16} 
                color="#9CA3AF" 
                style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }} 
              />
              <input 
                type="text" 
                className="wm-input" 
                placeholder="Search deadlines (e.g. SIP, AWS)..." 
                style={{ paddingLeft: '40px', width: '240px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Filter calendar events"
              />
            </div>

            <button 
              onClick={() => handleOpenAddModal(selectedDay || 6)} 
              className="wm-btn wm-btn-primary"
              aria-label="Schedule a new financial transaction"
            >
              <Plus size={16} /> Schedule Transaction
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2: FINANCIAL CALENDAR SUMMARY STRIP
            ------------------------------------------------------------------ */}
        <section className="wm-summary-strip">
          <div className="wm-summary-box">
            <span className="wm-summary-label">Expected Inflow</span>
            <div className="wm-summary-value" style={{ color: '#059669' }}>
              +₹ {monthSummary.inflows.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>
              Salary & receivables
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Scheduled Outflow</span>
            <div className="wm-summary-value" style={{ color: '#DC2626' }}>
              -₹ {monthSummary.outflows.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: '700' }}>
              Debits, bills & rent
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">SIPs & Capital Additions</span>
            <div className="wm-summary-value" style={{ color: '#8B00FF' }}>
              ₹ {monthSummary.investments.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#8B00FF', fontWeight: '600' }}>
              Automated wealth accumulation
            </span>
          </div>

          <div className="wm-summary-box">
            <span className="wm-summary-label">Net Projected Surplus</span>
            <div className="wm-summary-value" style={{ color: monthSummary.net >= 0 ? '#111111' : '#DC2626' }}>
              ₹ {monthSummary.net.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>
              Monthly net capital buffer
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3: CALENDAR WORKSPACE & AGENDA SPLIT
            ------------------------------------------------------------------ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(480px, 2.5fr) 1.2fr', gap: '32px', marginBottom: '40px' }}>
          
          {/* Main Calendar Card */}
          <div className="wm-card" style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Header & Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#111111', margin: 0 }}>
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={prevMonth} 
                    className="wm-btn wm-btn-outline"
                    style={{ padding: '6px 10px' }}
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={nextMonth} 
                    className="wm-btn wm-btn-outline"
                    style={{ padding: '6px 10px' }}
                    aria-label="Next month"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Classification Filter Pills */}
              <div className="wm-filter-group">
                {['all', 'inflow', 'outflow', 'investment'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`wm-filter-btn ${filterType === type ? 'active' : ''}`}
                  >
                    {type === 'all' ? 'All Types' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                  </button>
                ))}
              </div>
            </div>

            {/* DOW Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: '700', fontSize: '11px', letterSpacing: '0.08em', color: '#6B7280', marginBottom: '10px' }}>
              <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
            </div>

            {/* Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', flex: 1, minHeight: '400px' }}>
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`offset-${i}`} style={{ background: 'transparent' }} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;
                const isToday = day === 6 && currentMonth === 7 && currentYear === 2026; 
                const dayEvents = getEventsForDay(day);

                return (
                  <div
                    key={`day-${day}`}
                    onClick={() => handleDayClick(day)}
                    className={`wm-calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span 
                        style={{ 
                          fontSize: '12px', 
                          fontWeight: isToday || isSelected ? '800' : '600', 
                          color: isSelected ? '#8B00FF' : isToday ? '#8B00FF' : '#111111',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          background: isToday ? '#FAF5FF' : 'transparent',
                          border: isToday ? '1px solid #E9D5FF' : 'none'
                        }}
                      >
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B00FF' }} />
                      )}
                    </div>

                    {/* Day events stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px' }}>
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            padding: '2px 4px',
                            borderRadius: '2px',
                            background: ev.type === 'inflow' ? '#ECFDF5' : ev.type === 'investment' ? '#FAF5FF' : '#FEF2F2',
                            color: ev.type === 'inflow' ? '#059669' : ev.type === 'investment' ? '#8B00FF' : '#DC2626',
                            border: `1px solid ${ev.type === 'inflow' ? '#A7F3D0' : ev.type === 'investment' ? '#E9D5FF' : '#FECACA'}`,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          ₹{ev.amount >= 1000 ? `${(ev.amount/1000).toFixed(0)}k` : ev.amount} {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div style={{ fontSize: '9px', color: '#6B7280', textAlign: 'right', fontWeight: '700' }}>
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Agenda & Event Details Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Detail Panel */}
            <div className="wm-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--wm-border-subtle)', paddingBottom: '12px' }}>
                <div>
                  <span className="wm-eyebrow">Selected Ledger Date</span>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111111', margin: '2px 0 0 0' }}>
                    {selectedDay ? `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}` : 'Select a date'}
                  </h3>
                </div>
                {selectedDay && (
                  <button 
                    onClick={() => handleOpenAddModal(selectedDay)}
                    className="wm-btn wm-btn-ghost"
                    style={{ padding: '6px 10px', fontSize: '11px' }}
                    aria-label="Add event to selected day"
                  >
                    <Plus size={14} /> Add
                  </button>
                )}
              </div>
              
              {selectedDay ? (
                <div>
                  {getEventsForDay(selectedDay).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {getEventsForDay(selectedDay).map(ev => (
                        <div 
                          key={ev.id} 
                          style={{ 
                            padding: '14px', 
                            background: 'var(--wm-bg-secondary)', 
                            border: '1px solid var(--wm-border)', 
                            borderRadius: '4px',
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>{ev.title}</div>
                            <span 
                              style={{ 
                                fontSize: '11px', 
                                textTransform: 'uppercase', 
                                fontWeight: '700', 
                                color: ev.type === 'inflow' ? '#059669' : ev.type === 'investment' ? '#8B00FF' : '#DC2626' 
                              }}
                            >
                              {ev.type}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: '800', fontSize: '14px', color: ev.type === 'inflow' ? '#059669' : '#111111' }}>
                              ₹{ev.amount.toLocaleString()}
                            </span>
                            <button 
                              onClick={() => handleOpenEditModal(ev)} 
                              style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', padding: '4px' }}
                              aria-label="Edit event"
                            >
                              <Edit size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '28px 0', color: '#6B7280' }}>
                      <p style={{ fontSize: '13px', margin: '0 0 12px 0' }}>No cashflow events scheduled on this day.</p>
                      <button 
                        onClick={() => handleOpenAddModal(selectedDay)} 
                        className="wm-btn wm-btn-secondary"
                        style={{ fontSize: '11px', padding: '8px 14px' }}
                      >
                        <Plus size={14} /> Schedule on Aug {selectedDay}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '28px 0', color: '#6B7280', fontSize: '13px' }}>
                  Click any calendar day to inspect scheduled cashflows.
                </div>
              )}
            </div>

            {/* Upcoming Agenda List */}
            <div className="wm-card" style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="wm-eyebrow">Chronological Horizon</span>
                <span className="wm-tag">Upcoming</span>
              </div>
              <h3 className="wm-card-heading" style={{ margin: '0 0 16px 0' }}>
                Upcoming Obligations
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {events.filter(ev => ev.day >= 6).slice(0, 4).map((ev) => (
                  <div 
                    key={ev.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      borderBottom: '1px solid var(--wm-border-subtle)', 
                      paddingBottom: '12px' 
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '4px', 
                          background: ev.type === 'inflow' ? '#ECFDF5' : '#FEF2F2', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          border: `1px solid ${ev.type === 'inflow' ? '#A7F3D0' : '#FECACA'}` 
                        }}
                      >
                        {ev.type === 'inflow' ? <ArrowUpRight size={16} color="#059669" /> : <ArrowDownRight size={16} color="#DC2626" />}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#111111' }}>{ev.title}</div>
                        <span style={{ fontSize: '11px', color: '#6B7280' }}>Scheduled: Aug {ev.day}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: ev.type === 'inflow' ? '#059669' : '#111111' }}>
                      ₹{ev.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Deep Link to Budget Planner */}
        <div style={{ marginTop: '20px', padding: '24px 32px', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="wm-eyebrow" style={{ color: '#8B00FF' }}>Next Step: Allocate Monthly Spending Caps</span>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111111', marginTop: '2px' }}>
              Audit category limits, track overspending alerts, and configure cashflow buffers in Budget Planner.
            </div>
          </div>
          <button 
            onClick={() => navigate('/budget')}
            className="wm-btn wm-btn-primary"
            aria-label="Open Budget Planner"
          >
            Open Budget & Capital Control <ArrowRight size={16} />
          </button>
        </div>

      </main>

      {/* ------------------------------------------------------------------
          MODAL: SCHEDULE FINANCIAL TRANSACTION
          ------------------------------------------------------------------ */}
      {showEventModal && (
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
          onClick={() => setShowEventModal(false)}
        >
          <form 
            onSubmit={handleSaveEvent} 
            className="wm-card" 
            style={{ padding: '36px', width: '100%', maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h3 className="wm-card-heading" style={{ margin: 0 }}>
                {editingEvent ? 'Edit Scheduled Event' : `Schedule Cashflow on Aug ${formDay}`}
              </h3>
              <button 
                type="button"
                onClick={() => setShowEventModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="wm-caption" style={{ marginBottom: '16px' }}>
              Add an automated debt debit, recurring SIP purchase, or incoming dividend deposit.
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                Event / Mandate Title
              </label>
              <input 
                type="text" 
                className="wm-input" 
                placeholder="e.g. HDFC Home Loan EMI, Freelance Payout" 
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                Amount (₹)
              </label>
              <input 
                type="number" 
                className="wm-input" 
                placeholder="e.g. 15000" 
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#374151', marginBottom: '6px' }}>
                Classification
              </label>
              <select 
                className="wm-input" 
                style={{ background: '#FFFFFF' }}
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
              >
                <option value="inflow">Inflow (Salary, Rent Received, Dividends)</option>
                <option value="outflow">Outflow (EMIs, Rent Paid, Utility Debits)</option>
                <option value="investment">Investment (SIP Purchases, Stock Allocations)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button type="submit" className="wm-btn wm-btn-primary" style={{ flex: 1 }}>
                Save Schedule
              </button>
              {editingEvent && (
                <button 
                  type="button" 
                  onClick={() => handleDeleteEvent(editingEvent.id)}
                  className="wm-btn wm-btn-outline"
                  style={{ color: '#DC2626', borderColor: '#FECACA' }}
                  aria-label="Delete scheduled event"
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
              <button 
                type="button" 
                onClick={() => setShowEventModal(false)}
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

export default WealthCalendar;
