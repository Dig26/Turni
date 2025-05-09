import React, { useState } from 'react';
import { login } from '../services/authService';
import '../styles/Auth.css';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      onNavigate('dashboard');
    } catch (err) {
      setError('Email o password non validi. Riprova.');
      console.error('Errore di login:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Accedi</h2>
        <p className="subtitle">Gestione Turni Lavorativi</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="La tua email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="La tua password"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Non hai un account?{' '}
            <button 
              className="link-button" 
              onClick={() => onNavigate('register')}
            >
              Registrati
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;