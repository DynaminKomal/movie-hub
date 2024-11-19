import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { saveAuthToken } from '../utils/localstorage';
import { isAuthenticated } from '../utils/helper';

function ProtectedRoute({ element, ...rest }) {
    const token = useSelector((state) => state.auth.loginReducer?.data?.token)

    
    useEffect(() => {
        if (token) {
            saveAuthToken(token)
            const decodedToken = jwtDecode(token)
            console.log("decodedToken", decodedToken)
        }
    })


    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return element;
}

export default ProtectedRoute;
