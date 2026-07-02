import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Analytics from './Analytics';
import BudgetPlanner from './BudgetPlanner';
import Settings from './Settings';
import Investments from './Investments';
import AiAdvisor from './AiAdvisor';
import WealthForecast from './WealthForecast';
import WealthCalendar from './WealthCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-advisor" element={<AiAdvisor />} />
        <Route path="/forecast" element={<WealthForecast />} />
        <Route path="/calendar" element={<WealthCalendar />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
