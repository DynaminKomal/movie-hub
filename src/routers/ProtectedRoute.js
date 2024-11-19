import React from "react";
import { Navigate, Route } from "react-router-dom";


function ProtectedRoute({ element, ...rest }) {
    const isAuthenticated = false; 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return element; 
}

export default ProtectedRoute;
