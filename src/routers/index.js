import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "../pages/Users/UserDashboard";
import { paths } from "../constants/paths/common";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/signUpPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path={paths.LOGIN} element={<LoginPage />} />
                <Route path={paths.SIGNUP} element={<SignUpPage />} />

                {/* Protected Routes */}
                <Route path={paths.HOME} element={<ProtectedRoute element={<UserDashboard />} />} />
            </Routes>
        </Router>
    )
}