// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuthentication } from '../Api/User';

// Create Context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    // Make an API call to check session or token validity
    const response = await checkAuthentication();
    setIsAuthenticated(response.ok); // Set authentication based on response
  };

  useEffect(() => {
    checkAuth(); // Check auth on mount
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
