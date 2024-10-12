import React from 'react';
import JobsList from './components/JobsList';
import AddJob from './components/AddJob';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { currentUser, login, logout } = useAuth();

  return (
    <div>
      {!currentUser ? (
        <button onClick={() => login('test@example.com', 'password')}>
          Login
        </button>
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          <AddJob />
          <JobsList />
        </div>
      )}
    </div>
  );
};

export default App;