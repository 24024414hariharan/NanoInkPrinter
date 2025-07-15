import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/auth/register`, {
        name: form.name,
        username: form.username,
        password: form.password,
      });

      setSuccess("Registration successful. You can now log in.");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
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
        <h2 className="login-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

          {error && <p className="login-error">{error}</p>}
          {success && <p style={{ color: '#90ee90', textAlign: 'center' }}>{success}</p>}

          <button type="submit">Register</button>

          <p className="login-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
