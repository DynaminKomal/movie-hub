import React from "react"
import { Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout"
import { userType } from "../constants/enums";
import { getUserRole } from "../utils/helper";

const AdminRoute = ({ children }) => {
    const user = getUserRole()
    return (
        <>
            {user === userType.admin ? <AdminLayout children={children} /> :
                <Navigate to='/login' />
            }
        </>
    )
}

export default AdminRoute