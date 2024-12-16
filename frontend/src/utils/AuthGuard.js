import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthGuard = ({ Component }) => {

  const { isAuthenticated } = useAuth();

  const auth = (isAuthenticated != null) ? isAuthenticated : null;

  // If has token, return outlet in other case return navigate to login page
  return auth ? <Component /> : <Navigate to="/login" />;
}

export default AuthGuard