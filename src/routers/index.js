import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "../pages/Users/UserDashboard";
import { paths } from "../constants/paths/common";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={paths.HOME} element={<UserDashboard />} />
            </Routes>
        </Router>
    )
}