import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from "../pages/Users/UserDashboard";
import { paths } from "../constants/paths/common";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/signUpPage";
import UnauthorizedPage from "../pages/Auth/UnauthorizedPage";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import CommanDashBoardPage from "../pages/CommanDashBoardPage";
import { userPaths } from "../constants/paths/userPaths";
import { adminPaths } from "../constants/paths/adminPaths";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import ForgetPasswordPage from "../pages/Auth/ForgetPasswordPage";
import ResetTokenPage from "../pages/Auth/ResetTokenPage";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path={paths.LOGIN} element={<LoginPage />} />
                <Route path={paths.SIGNUP} element={<SignUpPage />} />
                <Route path={paths.UNAUTHORIZED} element={<UnauthorizedPage />} />
                <Route path={paths.GOTODASHBOARD} element={<CommanDashBoardPage />} />
                <Route path={paths.FORGETPASSWORD} element={<ForgetPasswordPage />} />
                <Route path={paths.RESETTOKEN} element={<ResetTokenPage />} />

                <Route path={adminPaths.ADMINDASHBOARD} element={<AdminRoute><AdminDashBoard /></AdminRoute>} />
                <Route path={userPaths.USERDASHBOARD} element={<UserRoute><UserDashboard /></UserRoute>} />

            </Routes>
        </Router>
    )
}