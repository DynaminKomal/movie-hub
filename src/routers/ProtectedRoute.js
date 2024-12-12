import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/helper';

function ProtectedRoute({ element, requiredRole, ...rest }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const userRole = getUserRole();
    if (requiredRole && requiredRole !== userRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return element;
}

export default ProtectedRoute;
