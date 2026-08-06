import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import dashboardImg from './assets/fintech_dashboard.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 968);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://wealthmetrics-n.onrender.com';
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, { email, password });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      localStorage.setItem('userEmail', email);
      setMessage('Login Successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
    } catch (error) {
      setMessage('Invalid credentials or Backend offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    setSocialLoading(platform);
    setMessage(`Connecting to ${platform} Auth...`);
    setTimeout(() => {
      localStorage.setItem('userEmail', `${platform.toLowerCase()}_user@wealthmetrics.io`);
      setMessage(`Logged in successfully via ${platform}! Redirecting...`);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
    }, 1200);
  };

  const formContent = (
    <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '440px', position: 'relative', zIndex: 10, backgroundColor: '#ffffff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.03)' }}>
      
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #4f46e5, #3b82f6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 20px rgba(79, 70, 229, 0.2)' }}>
          <TrendingUp size={28} color="#fff" />
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.5px', color: '#0f172a' }}>WealthMetrics</h1>
        <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Smart Financial Analytics Platform</p>
      </div>

      {/* Email & Password login Form */}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '8px' }}>Work Email</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }} />
            <input 
              type="email" 
              className="glass-input" 
              style={{ width: '100%', paddingLeft: '44px' }}
              placeholder="name@company.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '8px' }}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }} />
            <input 
              type="password" 
              className="glass-input" 
              style={{ width: '100%', paddingLeft: '44px' }}
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }} disabled={loading || !!socialLoading}>
          {loading ? 'Authenticating...' : <>Sign In <ArrowRight size={18} /></>}
        </button>
      </form>

      {/* Divider "or continue with" */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', color: '#94a3b8', fontSize: '12px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
        <span style={{ padding: '0 12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>or continue with</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
      </div>

      {/* Social SSO login options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {/* Google */}
        <button 
          type="button" 
          onClick={() => handleSocialLogin('Google')}
          disabled={loading || !!socialLoading}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px', 
            background: '#ffffff', 
            border: '1px solid #cbd5e1', 
            borderRadius: '10px', 
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
        </button>

        {/* GitHub */}
        <button 
          type="button" 
          onClick={() => handleSocialLogin('GitHub')}
          disabled={loading || !!socialLoading}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px', 
            background: '#ffffff', 
            border: '1px solid #cbd5e1', 
            borderRadius: '10px', 
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            color: '#0f172a'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </button>

        {/* Apple */}
        <button 
          type="button" 
          onClick={() => handleSocialLogin('Apple')}
          disabled={loading || !!socialLoading}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px', 
            background: '#ffffff', 
            border: '1px solid #cbd5e1', 
            borderRadius: '10px', 
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            color: '#0f172a'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
          </svg>
        </button>
      </div>

      {message && (
        <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', fontSize: '13px', textAlign: 'center', background: message.includes('Successful') || message.includes('successfully') ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${message.includes('Successful') || message.includes('successfully') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}`, color: message.includes('Successful') || message.includes('successfully') ? '#047857' : '#b91c1c' }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px' }}>
        <ShieldCheck size={16} color="#4f46e5" /> 256-bit Encrypted Security
      </div>

    </div>
  );

  if (isMobile) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 10%, #f1f5f9 0%, #e2e8f0 70%)', position: 'relative', padding: '20px' }}>
        {/* Background glow effects */}
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(16, 185, 129, 0.04)', filter: 'blur(80px)', borderRadius: '50%', top: '10%', left: '10%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(79, 70, 229, 0.04)', filter: 'blur(80px)', borderRadius: '50%', bottom: '10%', right: '10%', zIndex: 0 }}></div>
        {formContent}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
      
      {/* Left side: Login Form */}
      <div style={{ width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'radial-gradient(circle at 50% 10%, #f8fafc 0%, #f1f5f9 100%)', padding: '40px' }}>
        {/* Background glow effects */}
        <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'rgba(16, 185, 129, 0.03)', filter: 'blur(120px)', borderRadius: '50%', top: '20%', left: '10%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'rgba(79, 70, 229, 0.03)', filter: 'blur(120px)', borderRadius: '50%', bottom: '20%', right: '10%', zIndex: 0 }}></div>
        {formContent}
      </div>

      {/* Right side: Fintech App Image */}
      <div style={{ width: '55%', position: 'relative', overflow: 'hidden' }}>
        {/* Dark elegant overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(225deg, rgba(79, 70, 229, 0.2) 0%, rgba(15, 23, 42, 0.85) 100%)', zIndex: 1 }}></div>
        <img 
          src={dashboardImg} 
          alt="WealthMetrics Dashboard Preview" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Pitch Typography Overlay */}
        <div style={{ position: 'absolute', bottom: '80px', left: '80px', right: '80px', zIndex: 2, color: '#ffffff' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <TrendingUp size={16} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.25', letterSpacing: '-1px', maxWidth: '520px' }}>
            Track wealth, analyze expenses, and forecast your financial freedom.
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '15px', marginTop: '16px', lineHeight: '1.6', maxWidth: '480px' }}>
            Join thousands of smart professionals rebalancing assets, tracking recurring mandates, and auditing cashflow using Google Gemini AI models.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
