import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { apiClient } from '../../api/client';

export default function AdminProtectedRoute() {
  const isAuth = apiClient.isAuthenticated();
  const isAdmin = apiClient.isAdmin();

  if (!isAuth || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

