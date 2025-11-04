import React, { useState } from 'react';
import './WelcomeScreen.css'; // Optional: create this for custom styles

const WelcomeScreen = ({ onVerified }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password === 'my mentor is best') {
      onVerified();
    } else {
      setError('Incorrect password. Try again!');
    }
  };

  return (
    <div className="floating-container">
      <img src="/college_logo.png" alt="College Logo" className="college-logo" />
      <h2>Enter Passphrase</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="my mentor is best"
        className="password-input"
      />
      <button onClick={handleSubmit} className="next-button">Enter</button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default WelcomeScreen;
