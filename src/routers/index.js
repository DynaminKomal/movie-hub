import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "../pages/Users/UserDashboard";
import { paths } from "../constants/paths/common";
import LoginPage from "../pages/Auth/LoginPage";
import signUpPage from "../pages/Auth/signUpPage";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={paths.HOME} element={<UserDashboard />} />
                <Route path={paths.LOGIN} element={<LoginPage />} />
                <Route path={paths.SIGNUP} element={<signUpPage />} />
            </Routes>
        </Router>
    )
}