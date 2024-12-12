import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "../pages/Users/UserDashboard";
import { paths } from "../constants/paths/common";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/signUpPage";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../pages/Auth/UnauthorizedPage";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path={paths.LOGIN} element={<LoginPage />} />
                <Route path={paths.SIGNUP} element={<SignUpPage />} />
                <Route path={paths.UNAUTHORIZED} element={<UnauthorizedPage />} />

                {/* Protected Routes */}
                <Route
                    path={paths.HOME}
                    element={<ProtectedRoute requiredRole="user" element={<UserDashboard />} />}
                />
                <Route
                    path={paths.ADMIN}
                    element={<ProtectedRoute requiredRole="admin" element={<AdminDashBoard />} />}
                />
            </Routes>
        </Router>
    )
}