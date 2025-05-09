import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
  CssBaseline,
  Container,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { postSignupLogin } from '../../slice/slice';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    updates: false,
  });

  const [errors, setErrors] = useState({});
  const dispatch=useDispatch()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Full name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Form Data:', formData);
    dispatch(postSignupLogin(formData))
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={{ mt: 8, p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="updates"
                  checked={formData.updates}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="I want to receive updates via email."
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Sign Up
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
