import React, { useState } from 'react';
import './LoginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE = 'http://localhost:8083/auth';
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const payload = {
  username: email, // Assuming you want to use the email as the username
  password: password,
  name: name, // Add the name field here
  // You may also want to send an email field, depending on your User model
};


    if (isSignup) {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

       if (response.ok) {
  toast.success('Signup successful! Please login.');
  setIsSignup(false);
  setEmail('');
  setPassword('');
  setConfirmPassword('');
  setName('');
} else {
  const text = await response.text();
  toast.error(`Signup failed: ${text}`); 
}

      } catch (error) {
        console.error('Signup Error:', error);
        toast.error('Signup request failed.');
      }
    } else {
      try {
        const response = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

       if (response.ok) {
  const data = await response.json();
  localStorage.setItem('token', data.token);
  toast.success('Login successful!');

  setTimeout(() => {
    navigate('/productlist');
  }, 1000);
} else {
  const text = await response.text();

  if (text.includes('User not found')) {
    toast.warn('Account not found. Please create an account.');
    setIsSignup(true); 
  } else {
    toast.error(`Login failed: ${text}`);
  }
}

      } catch (error) {
        console.error('Login Error:', error);
        toast.error('Login request failed.');
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={2000} />
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
              {isSignup
                ? 'Already have an account? Sign In'
                : "Don't have an account? Create Account"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

