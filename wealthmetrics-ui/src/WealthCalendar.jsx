import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  Edit, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';

function WealthCalendar() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed, so 7)
  const [selectedDay, setSelectedDay] = useState(null);
  
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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.04) 0px, transparent 50%), radial-gradient(at 50% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.03) 0px, transparent 50%), #f8fafc', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow blobs */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(79, 70, 229, 0.03)', filter: 'blur(120px)', borderRadius: '50%', top: '10%', right: '5%', zIndex: 0 }}></div>

      <Sidebar />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', zIndex: 1, position: 'relative' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
              <CalendarIcon size={24} color="#4f46e5" /> Wealth Calendar
            </h1>
            <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>Log EMI debts, SIP schedules, salary credits, and audit daily cashflow balances.</p>
          </div>
          <button 
            onClick={() => handleOpenAddModal(selectedDay || 6)} 
            className="btn-primary" 
            style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
          >
            <Plus size={18} /> Schedule Transaction
          </button>
        </header>

        {/* Month Summary Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: '4px solid #10b981', background: '#ffffff' }}>
            <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Expected Inflow</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px', color: '#047857' }}>₹{monthSummary.inflows.toLocaleString()}</h3>
          </div>
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: '4px solid #f43f5e', background: '#ffffff' }}>
            <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Scheduled Outflow</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px', color: '#be123c' }}>₹{monthSummary.outflows.toLocaleString()}</h3>
          </div>
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: '4px solid #4f46e5', background: '#ffffff' }}>
            <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>SIPs & Investments</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px', color: '#4f46e5' }}>₹{monthSummary.investments.toLocaleString()}</h3>
          </div>
          <div className="glass-card" style={{ padding: '16px 20px', borderLeft: '4px solid #f59e0b', background: '#ffffff' }}>
            <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Net Cashflow Surplus</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '6px', color: monthSummary.net >= 0 ? '#047857' : '#be123c' }}>
              ₹{monthSummary.net.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Calendar and Sidebar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.2fr', gap: '24px', flex: 1 }}>
          
          {/* Main Calendar Card */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
            
            {/* Calendar Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{monthNames[currentMonth]} {currentYear}</h2>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={prevMonth} style={{ padding: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', borderRadius: '6px', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                  <button onClick={nextMonth} style={{ padding: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', borderRadius: '6px', cursor: 'pointer' }}><ChevronRight size={16} /></button>
                </div>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'inflow', 'outflow', 'investment'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: filterType === type ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                      border: `1px solid ${filterType === type ? 'rgba(79, 70, 229, 0.3)' : '#cbd5e1'}`,
                      color: filterType === type ? '#4f46e5' : '#475569',
                      fontSize: '11px',
                      textTransform: 'capitalize',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {type}s
                  </button>
                ))}
              </div>
            </div>

            {/* Grid headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: '600', fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
              <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
            </div>

            {/* Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', flex: 1, minHeight: '380px' }}>
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`offset-${i}`} style={{ background: 'transparent', borderRadius: '8px' }}></div>
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
                    style={{
                      background: isSelected ? 'rgba(79, 70, 229, 0.03)' : '#ffffff',
                      border: `1px solid ${isSelected ? '#4f46e5' : isToday ? 'rgba(79, 70, 229, 0.4)' : '#e2e8f0'}`,
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 10px rgba(79, 70, 229, 0.1)' : '0 1px 2px rgba(0,0,0,0.01)'
                    }}
                  >
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: isToday ? '#4f46e5' : '#0f172a',
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      textAlign: 'center',
                      lineHeight: '20px',
                      borderRadius: '50%',
                      background: isToday ? 'rgba(79, 70, 229, 0.1)' : 'transparent'
                    }}>
                      {day}
                    </span>

                    {/* Day events stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px' }}>
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          style={{
                            fontSize: '9px',
                            fontWeight: '600',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            background: ev.type === 'inflow' ? '#ecfdf5' : ev.type === 'investment' ? '#e0e7ff' : '#fff1f2',
                            color: ev.type === 'inflow' ? '#047857' : ev.type === 'investment' ? '#4f46e5' : '#be123c',
                            border: `1px solid ${ev.type === 'inflow' ? '#a7f3d0' : ev.type === 'investment' ? '#c7d2fe' : '#fecdd3'}`,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          ₹{ev.amount >= 1000 ? `${(ev.amount/1000).toFixed(0)}k` : ev.amount} {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div style={{ fontSize: '8px', color: '#475569', textAlign: 'right', fontWeight: '600' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Detail Panel */}
            <div className="glass-card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a' }}>
                Schedule Details: {selectedDay ? `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}` : 'Select a day'}
              </h3>
              
              {selectedDay ? (
                <div>
                  {getEventsForDay(selectedDay).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {getEventsForDay(selectedDay).map(ev => (
                        <div key={ev.id} className="glass-card" style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{ev.title}</div>
                            <span style={{ fontSize: '11px', textTransform: 'capitalize', fontWeight: '600', color: ev.type === 'inflow' ? '#047857' : ev.type === 'investment' ? '#4f46e5' : '#be123c' }}>
                              {ev.type}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: '700', fontSize: '14px', color: ev.type === 'inflow' ? '#047857' : '#be123c' }}>
                              ₹{ev.amount.toLocaleString()}
                            </span>
                            <button onClick={() => handleOpenEditModal(ev)} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer' }}><Edit size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: '#475569' }}>
                      <p style={{ fontSize: '13px' }}>No cashflow events scheduled.</p>
                      <button onClick={() => handleOpenAddModal(selectedDay)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#4f46e5', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', marginTop: '12px', fontWeight: '600' }}>
                        <Plus size={14} /> Add Event
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', color: '#475569', fontSize: '13px' }}>
                  Click a grid day to view and schedule events.
                </div>
              )}
            </div>

            {/* Upcoming Agenda List */}
            <div className="glass-card" style={{ padding: '24px', flex: 1, backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>Upcoming Obligations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {events.filter(ev => ev.day >= 6).slice(0, 4).map((ev) => (
                  <div key={ev.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ev.type === 'inflow' ? '#ecfdf5' : '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${ev.type === 'inflow' ? '#a7f3d0' : '#fecdd3'}` }}>
                        {ev.type === 'inflow' ? <ArrowUpRight size={16} color="#047857" /> : <ArrowDownRight size={16} color="#be123c" />}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{ev.title}</div>
                        <span style={{ fontSize: '11px', color: '#475569' }}>Scheduled: Aug {ev.day}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: ev.type === 'inflow' ? '#047857' : '#be123c' }}>
                      ₹{ev.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* CRUD MODAL */}
        {showEventModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <form onSubmit={handleSaveEvent} className="glass-card" style={{ padding: '32px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
                {editingEvent ? 'Edit Scheduled Event' : `Schedule Cashflow on Aug ${formDay}`}
              </h3>
              
              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>Event Name / Title</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  style={{ width: '100%' }}
                  placeholder="e.g. HDFC Home Loan EMI" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>Amount (₹)</label>
                <input 
                  type="number" 
                  className="glass-input" 
                  style={{ width: '100%' }}
                  placeholder="Amount in Rupees" 
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>Classification</label>
                <select 
                  className="glass-input" 
                  style={{ width: '100%', background: '#ffffff' }}
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                >
                  <option value="inflow">Inflow (Salary, Rent, Dividends)</option>
                  <option value="outflow">Outflow (EMIs, Rent Paid, Utility)</option>
                  <option value="investment">Investment (SIPs, Stock Buying)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Save</button>
                {editingEvent && (
                  <button 
                    type="button" 
                    onClick={() => handleDeleteEvent(editingEvent.id)}
                    style={{ flex: 1, padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    <Trash2 size={16} style={{ display: 'inline', marginRight: '4px' }} /> Delete
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowEventModal(false)}
                  style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default WealthCalendar;
