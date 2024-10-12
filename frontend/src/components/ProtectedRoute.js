import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" />;
  }

  // If logged in, render the children (protected content)
  return children;
};

export default ProtectedRoute;