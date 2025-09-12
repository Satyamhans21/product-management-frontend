import React, { useState } from 'react';
import './LoginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (e) => {
  e.preventDefault();

  setErrorMessage('');

  if (isSignup) {
    if (password !== confirmPassword) {
      setErrorMessage(" Passwords do not match");
      return;
    }
    toast.success('Signup successful!');
  } else {
    toast.success('Login successful!');
  }
};


  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={1000} />

      <nav className="navbar">
        <div className="logo">
          <h1>𝙨𝙝𝙤𝙥𝙞𝙛𝙮</h1>
        </div>
      </nav>

      <div className="login-form">
        <h2>{isSignup ? 'Create Account' : 'Sign In'}</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignup && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="login-btn">
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          <div className="footer-links">
            <a href="#" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Create Account"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
