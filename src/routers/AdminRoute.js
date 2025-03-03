import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout"
import { userType } from "../constants/enums";
import { getUserRole } from "../utils/helper";

const AdminRoute = () => {
    const user = getUserRole()
    return (
        <>
            {user === userType.admin ? <AdminLayout>
                <Outlet />
            </AdminLayout> :
                <Navigate to='/login' />
            }
        </>
    )
}

export default AdminRoute