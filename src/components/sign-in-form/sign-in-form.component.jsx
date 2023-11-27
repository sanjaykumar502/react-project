// SignInFormWithAxios.js

import React, { useState, useEffect } from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../Home/home';
import './login.css';

// Assuming your Toast component is imported from the correct path
import Toast from '../additional-components/toast/toast.component';

const SignInFormWithAxios = ({ onLogin }) => {
  const url = 'http://localhost:3002/employee';
  const [formData, setFormData] = useState({
    usrname: '',
    pass: '',
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const { usrname, pass } = formData;
    const userExists = items.some((item) => item.username === usrname && item.password === pass);

    if (userExists) {
      onLogin();
      navigate('/home');
    } else {
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h5">Login</Typography>
        <form>
          <TextField
            label="Username"
            name="usrname"
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            name="pass"
            onChange={handleInputChange}
            fullWidth
            required
          />
          {error && <Typography color="error">Invalid username or password</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInFormWithAxios;
