import React from 'react'
import { userType } from '../../constants/enums'
import { paths } from '../../constants/paths/common';
import { adminPaths } from '../../constants/paths/adminPaths';
import { userPaths } from '../../constants/paths/userPaths';
import { getUserRole } from '../../utils/helper';
import { Navigate } from 'react-router-dom';

const Anonymous = () => {
  const userRole = getUserRole();

  const selectAuthRoute = () => {
    if (userRole === userType.admin) {
      return adminPaths.ADMINDASHBOARD;
    }
    else if (userRole === userType.user) {
      return userPaths.USERDASHBOARD;
    }
    else {
      return paths.UNAUTHORIZED
    }
  };
  return <Navigate to={selectAuthRoute()}></Navigate>
};

export default Anonymous