import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/recommend');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="login-glass">
        <h2 className="login-title">NanoInk Formulation Assistant</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label>Email address</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Login</button>
          <p className="login-footer">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
