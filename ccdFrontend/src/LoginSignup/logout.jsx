// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    alert('Logged out successfully.');
    navigate('/'); // Redirect to the login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
