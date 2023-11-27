import React, { useState } from 'react';
import Myimage from '../components/Myimage';
import ThemeBtn from '../components/ThemeBtn';
import '../assets/styles/index.css';
import { login } from '../services/adminApi';

function Login() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    // Update the password state
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    // Call the login function with the password
    event.preventDefault();
    login(password);
  };

  return (
    <div className="login-content">
      <ThemeBtn />
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <Myimage />
        <h1>Welcome Adham!</h1>
        <input
          type="password"
          className="password"
          placeholder="Password"
          id="password"
          required
          onChange={handlePasswordChange}
        />
        <input type="submit" className="loginBtn" value="LOGIN" />
      </form>
    </div>
  );
}

export default Login;
