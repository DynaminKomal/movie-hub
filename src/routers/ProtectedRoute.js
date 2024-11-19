import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from '../utils/helper';

function ProtectedRoute({ element, ...rest }) {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return element;
}

export default ProtectedRoute;
