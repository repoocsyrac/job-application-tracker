import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (typeof email !== 'string' || typeof password !== 'string') {
      setErrorMessage('Invalid email or password format');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/jobs');
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" margin="normal">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default LoginPage;