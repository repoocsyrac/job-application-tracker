
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import JobsPage from './pages/JobsPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Protected routes */}
        <Route path="/jobs" element={
                                      <ProtectedRoute>
                                        <JobsPage />
                                      </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;