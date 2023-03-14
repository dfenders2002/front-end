import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';

export default function AddUser({ onAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workTime, setWorktime] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [workTimeError, setWorkTimeError] = useState(false);


  const handleSubmit = async () => {

    if (!email || !password || !name || !workTime) {
      setEmailError(!email);
      setPasswordError(!password);
      setNameError(!name);
      setWorkTimeError(!workTime);
      return;
    }

    const userData = {
      'name': name,
      'email': email,
      'password': password,
      'workTime': workTime,
      'userType': 'User'
    };
    await onAddUser(userData);
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('worktime').value = '';
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '70px',
          marginTop: '30px',
          marginBottom: '20px',
          height: '60px',
        }}
      >
        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>
          addUser
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          marginLeft: '70px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginBottom: 1,
          }}
        >
          <TextField
            error={nameError}
            helperText={nameError && 'Name is required'}
            id="name"
            label="Name"
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value);
              setNameError(false);
            }}
            sx={{ flexGrow: 1 }}
          />

          <TextField
            error={emailError}
            helperText={emailError && 'Email is required'}
            id="email"
            label="Email"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
            sx={{ flexGrow: 1 }}
          />

          <TextField
            error={passwordError}
            helperText={passwordError && 'Password is required'}
            id="password"
            label="Password"
            variant="outlined"
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError(false);
            }}
            sx={{ flexGrow: 1 }}
          />

          <TextField
            error={workTimeError}
            helperText={workTimeError && 'Worktime is required'}
            id="worktime"
            label="WorkTime"
            variant="outlined"
            inputProps={{ inputMode: 'numeric', pattern: '[0-40]*' }}
            onChange={(event) => {
              setWorktime(event.target.value);
              setWorkTimeError(false);
            }}
            sx={{ flexGrow: 1 }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
