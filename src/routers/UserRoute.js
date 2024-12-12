import React from "react"
import { Navigate } from "react-router-dom";
import { userType } from "../constants/enums";
import UserLayout from "../layouts/UserLayout";
import { getUserRole } from "../utils/helper";

const UserRoute = ({ children }) => {
   const user = getUserRole();
   return (
      <>
         {user === userType.user ? <UserLayout children={children} /> :
            <Navigate to='/login' />
         }
      </>
   )
}

export default UserRoute