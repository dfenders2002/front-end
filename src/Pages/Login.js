import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { fetchByMail } from '../api';
import { useStateContext } from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import Center from '../components/Center';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { setContext } = useStateContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }
    try {
      const account = await fetchByMail('Users', email);
      setContext({ userType: account.userType, userId: account.id });
      if (account.userType === 'Admin') {
        navigate("/admin")
        //scuffed oplossing
        window.location.reload(false);
      } else if (account.userType === 'User') {
        navigate("/user")
        //scuffed oplossing
        window.location.reload(false);
      }
    } catch (error) {
      console.error(error);
      // handle error
    }
  };


  return (
    <Center>
      <Container sx={{ width: '300', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ my: 3 }}>
          Jump
        </Typography>
        <Box
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '90%',
            },
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              error={emailError}
              helperText={emailError && 'Email is required'}
              label="Email Address *"
              name="email"
              variant="outlined"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError(false);
              }}
            />
            <TextField
              error={passwordError}
              helperText={passwordError && 'Password is required'}
              label="Password *"
              name="password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
              }}
            />
            <Button type="submit" variant="contained" size="large" sx={{ width: '90%' }}>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Center>
  );
}