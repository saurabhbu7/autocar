import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/login', { email, password });

    if (response.data.success) {
      history.push('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
