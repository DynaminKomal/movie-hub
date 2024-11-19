import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ element, ...rest }) {
    const token = useSelector((state) => state.auth.loginReducer?.data?.token)

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return element;
}

export default ProtectedRoute;
