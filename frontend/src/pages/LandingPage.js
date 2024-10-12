import React from 'react';
import { Container, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <Container maxWidth="lg">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
      </Toolbar>
    </AppBar>
    <Typography variant="h2" align="center" mt={5}>
      Welcome!
    </Typography>
    <Typography variant="h5" align="center" mt={3}>
      Track your job applications here!
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button variant="contained" color="primary" component={Link} to="/jobs">Get Started</Button>
    </div>
  </Container>
);

export default LandingPage;